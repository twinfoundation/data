// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Is, ObjectHelper } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { FetchHelper, HttpMethod, MimeTypes } from "@twin.org/web";
import jsonLd from "jsonld";
import type { JsonLd, RemoteDocument, Url } from "jsonld/jsonld-spec";
import type {
	IJsonLdContextDefinition,
	IJsonLdContextDefinitionRoot,
	IJsonLdDocument,
	IJsonLdNodeObject
} from "../models/IJsonLdDocument";

/**
 * JSON-LD Processor.
 */
export class JsonLdProcessor {
	/**
	 * The class name.
	 * @internal
	 */
	private static readonly _CLASS_NAME = nameof<JsonLdProcessor>();

	/**
	 * Redirects to use during document resolution.
	 */
	private static readonly _redirects: {
		from: RegExp;
		to: string;
	}[] = [];

	/**
	 * The document loader to use.
	 */
	public static DOCUMENT_LOADER = async (url: Url): Promise<RemoteDocument> =>
		JsonLdProcessor.documentLoader(url);

	/**
	 * Compact a document according to a particular context.
	 * @param document The JSON-LD document to compact.
	 * @param context The context to compact the document to, if not provided will try and gather from the object.
	 * @returns The compacted JSON-LD document.
	 */
	public static async compact(
		document: IJsonLdDocument,
		context?: IJsonLdContextDefinitionRoot
	): Promise<IJsonLdDocument> {
		try {
			// There is a cast here because the jsonld types are not correct.
			// A context definition can be an array or an object, but the types only allow an object.
			if (Is.empty(context)) {
				context = {};
				if (Is.array<IJsonLdNodeObject>(document)) {
					for (const node of document) {
						context = JsonLdProcessor.gatherContexts(node, context);
					}
				} else if (Is.array<IJsonLdNodeObject>(document["@graph"])) {
					for (const node of document["@graph"]) {
						context = JsonLdProcessor.gatherContexts(node, context);
					}
				} else if (Is.object<IJsonLdNodeObject>(document)) {
					context = JsonLdProcessor.gatherContexts(document, context);
				}
			}

			const compacted = await jsonLd.compact(document, context as IJsonLdContextDefinition, {
				documentLoader: JsonLdProcessor.DOCUMENT_LOADER
			});
			return compacted;
		} catch (err) {
			if (
				Is.object<{ name: string; details?: { url?: string } }>(err) &&
				err.name === "jsonld.InvalidUrl"
			) {
				throw new GeneralError(
					JsonLdProcessor._CLASS_NAME,
					"invalidUrl",
					{ url: err.details?.url },
					err
				);
			}
			throw new GeneralError(JsonLdProcessor._CLASS_NAME, "compact", undefined, err);
		}
	}

	/**
	 * Expand a document, removing its context.
	 * @param compacted The compacted JSON-LD document to expand.
	 * @returns The expanded JSON-LD document.
	 */
	public static async expand(compacted: IJsonLdDocument): Promise<IJsonLdDocument> {
		try {
			const expanded = await jsonLd.expand(compacted, {
				documentLoader: JsonLdProcessor.DOCUMENT_LOADER
			});
			return expanded;
		} catch (err) {
			if (
				Is.object<{ name: string; details?: { url?: string } }>(err) &&
				err.name === "jsonld.InvalidUrl"
			) {
				throw new GeneralError(
					JsonLdProcessor._CLASS_NAME,
					"invalidUrl",
					{ url: err.details?.url },
					err
				);
			}

			throw new GeneralError(JsonLdProcessor._CLASS_NAME, "expand", undefined, err);
		}
	}

	/**
	 * Add a redirect to use during document resolution.
	 * @param from The URL to redirect from.
	 * @param to The URL to redirect to.
	 */
	public static addRedirect(from: RegExp, to: string): void {
		if (!this._redirects.some(r => r.from === from)) {
			this._redirects.push({ from, to });
		}
	}

	/**
	 * Extract a property from the JSON-LD.
	 * @param nodeObject The JSON-LD node object to extract from.
	 * @param propertyNames The possible names for the property.
	 * @param deleteProperty Delete the property from the object, defaults to true.
	 * @returns The properties if available.
	 */
	public static extractProperty<T>(
		nodeObject: IJsonLdNodeObject,
		propertyNames: string[],
		deleteProperty: boolean = true
	): T | undefined {
		let retVal: T | undefined;

		for (const prop of propertyNames) {
			retVal ??= nodeObject[prop] as T;
			if (deleteProperty) {
				delete nodeObject[prop];
			}
		}

		return retVal;
	}

	/**
	 * Combine contexts.
	 * @param context1 The first JSON-LD context to combine.
	 * @param context2 The second JSON-LD context to combine.
	 * @returns The combined context.
	 */
	public static combineContexts(
		context1: IJsonLdContextDefinitionRoot | undefined,
		context2: IJsonLdContextDefinitionRoot | undefined
	): IJsonLdContextDefinitionRoot | undefined {
		const combinedContext: IJsonLdContextDefinitionRoot = [];

		if (Is.string(context1)) {
			if (!combinedContext.includes(context1)) {
				combinedContext.push(context1);
			}
		} else if (Is.array(context1)) {
			for (const context of context1) {
				const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context));
				if (!hasMatch) {
					combinedContext.push(context);
				}
			}
		} else if (Is.object(context1)) {
			const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context1));
			if (!hasMatch) {
				combinedContext.push(context1);
			}
		}

		if (Is.string(context2)) {
			if (!combinedContext.includes(context2)) {
				combinedContext.push(context2);
			}
		} else if (Is.array(context2)) {
			for (const context of context2) {
				const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context));
				if (!hasMatch) {
					combinedContext.push(context);
				}
			}
		} else if (Is.object(context2)) {
			const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context2));
			if (!hasMatch) {
				combinedContext.push(context2);
			}
		}

		if (combinedContext.length === 0) {
			return null;
		}

		if (combinedContext.length === 1) {
			return combinedContext[0];
		}

		return combinedContext;
	}

	/**
	 * Gather all the contexts from the element and it's children.
	 * @param element The element to gather the contexts from.
	 * @param initial The initial context.
	 * @returns The combined contexts.
	 */
	public static gatherContexts(
		element: { [id: string]: unknown },
		initial?: IJsonLdContextDefinitionRoot
	): IJsonLdContextDefinitionRoot | undefined {
		let combinedContexts: IJsonLdContextDefinitionRoot | undefined = initial;

		if (!Is.empty(element["@context"])) {
			combinedContexts = JsonLdProcessor.combineContexts(
				initial,
				element["@context"] as IJsonLdContextDefinitionRoot
			);
		}

		for (const prop of Object.keys(element)) {
			const value = element[prop];
			if (Is.object(value)) {
				combinedContexts = this.gatherContexts(value, combinedContexts);
			} else if (Is.array(value)) {
				for (const item of value) {
					if (Is.object(item)) {
						combinedContexts = this.gatherContexts(item, combinedContexts);
					}
				}
			}
		}

		return combinedContexts;
	}

	/**
	 * Document loader which uses a caching mechanism.
	 * @param url The document url to load.
	 * @returns The document.
	 * @internal
	 */
	private static async documentLoader(url: Url): Promise<RemoteDocument> {
		for (const redirect of JsonLdProcessor._redirects) {
			if (redirect.from.test(url)) {
				url = redirect.to;
				break;
			}
		}

		// Cache the results for an hour
		const response = await FetchHelper.fetchJson<never, JsonLd>(
			JsonLdProcessor._CLASS_NAME,
			url,
			HttpMethod.GET,
			undefined,
			{
				cacheTtlMs: 3600000,
				headers: {
					Accept: `${MimeTypes.JsonLd},${MimeTypes.Json}`
				}
			}
		);

		return {
			documentUrl: url,
			document: response
		};
	}
}
