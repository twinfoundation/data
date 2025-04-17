// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Is, ObjectHelper, SharedStore } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { FetchHelper, HeaderTypes, HttpMethod, MimeTypes } from "@twin.org/web";
import jsonLd from "jsonld";
import type { JsonLd, RemoteDocument, Url } from "jsonld/jsonld-spec";
import type { IJsonLdContextDefinition } from "../models/IJsonLdContextDefinition";
import type { IJsonLdContextDefinitionElement } from "../models/IJsonLdContextDefinitionElement";
import type { IJsonLdContextDefinitionRoot } from "../models/IJsonLdContextDefinitionRoot";
import type { IJsonLdNodeObject } from "../models/IJsonLdNodeObject";

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
	 * The document loader to use.
	 * @param documentLoader The document loader to use.
	 */
	public static setDocumentLoader(documentLoader: (url: Url) => Promise<RemoteDocument>): void {
		SharedStore.set("jsonLdDocumentLoader", documentLoader);
	}

	/**
	 * The document loader to use for retrieving JSON-LD documents.
	 * @returns The document loader.
	 */
	public static getDocumentLoader(): (url: Url) => Promise<RemoteDocument> {
		let documentLoader =
			SharedStore.get<(url: Url) => Promise<RemoteDocument>>("jsonLdDocumentLoader");
		if (Is.empty(documentLoader)) {
			documentLoader = async (url: string) => JsonLdProcessor.documentLoader(url);
		}
		return documentLoader;
	}

	/**
	 * Set the cache time limit for documents.
	 * @param cacheLimitMs The cache limit in milliseconds.
	 */
	public static setCacheLimit(cacheLimitMs: number): void {
		SharedStore.set("jsonLdDocumentCacheLimit", cacheLimitMs);
	}

	/**
	 * Get the cache limit for documents.
	 * @returns The document loader.
	 */
	public static getCacheLimit(): number {
		let cacheLimitMs = SharedStore.get<number>("jsonLdDocumentCacheLimit");
		if (Is.empty(cacheLimitMs)) {
			cacheLimitMs = 3600000;
			SharedStore.set("jsonLdDocumentCacheLimit", cacheLimitMs);
		}
		return cacheLimitMs;
	}

	/**
	 * Set the global redirects for JSON-LD, use addRedirect for default handling.
	 * @param redirects The redirects to use.
	 */
	public static setRedirects(
		redirects: {
			from: RegExp;
			to: string;
		}[]
	): void {
		SharedStore.set("jsonLdRedirects", redirects);
	}

	/**
	 * Get the global redirects for JSON-LD.
	 * @returns The registered redirects.
	 */
	public static getRedirects(): {
		from: RegExp;
		to: string;
	}[] {
		let redirects = SharedStore.get<
			{
				from: RegExp;
				to: string;
			}[]
		>("jsonLdRedirects");
		if (Is.empty(redirects)) {
			redirects = [];
			SharedStore.set("jsonLdRedirects", redirects);
		}
		return redirects;
	}

	/**
	 * Compact a document according to a particular context.
	 * @param document The JSON-LD document to compact.
	 * @param context The context to compact the document to, if not provided will try and gather from the object.
	 * @returns The compacted JSON-LD document.
	 */
	public static async compact<T>(document: T, context?: IJsonLdContextDefinitionRoot): Promise<T> {
		try {
			if (Is.object<IJsonLdNodeObject>(document)) {
				if (Is.empty(context)) {
					context = {};
					if (Is.array(document)) {
						for (const node of document) {
							context = JsonLdProcessor.gatherContexts(node as IJsonLdNodeObject, context);
						}
					} else if (Is.array(document["@graph"])) {
						for (const node of document["@graph"]) {
							context = JsonLdProcessor.gatherContexts(node, context);
						}
					} else if (Is.object(document)) {
						context = JsonLdProcessor.gatherContexts(document, context);
					}
				}

				const compacted = await jsonLd.compact(
					ObjectHelper.removeEmptyProperties(document),
					context as IJsonLdContextDefinition,
					{
						documentLoader: JsonLdProcessor.getDocumentLoader()
					}
				);
				return compacted as T;
			}
			return document;
		} catch (err) {
			JsonLdProcessor.handleCommonErrors(err);

			throw new GeneralError(JsonLdProcessor._CLASS_NAME, "compact", undefined, err);
		}
	}

	/**
	 * Expand a document, removing its context.
	 * @param compacted The compacted JSON-LD document to expand.
	 * @returns The expanded JSON-LD document.
	 */
	public static async expand<T>(compacted: T): Promise<IJsonLdNodeObject[]> {
		try {
			if (Is.object<IJsonLdNodeObject>(compacted)) {
				const expanded = await jsonLd.expand(ObjectHelper.removeEmptyProperties(compacted), {
					documentLoader: JsonLdProcessor.getDocumentLoader()
				});
				return expanded;
			}
			return [];
		} catch (err) {
			JsonLdProcessor.handleCommonErrors(err);

			throw new GeneralError(JsonLdProcessor._CLASS_NAME, "expand", undefined, err);
		}
	}

	/**
	 * Canonize a document.
	 * @param document The document to canonize.
	 * @param options The options for canonization.
	 * @param options.algorithm The algorithm to use for canonization, defaults to URDNA2015.
	 * @returns The canonized document.
	 */
	public static async canonize<T extends IJsonLdNodeObject>(
		document: T,
		options?: {
			algorithm?: "URDNA2015" | "URGNA2012" | undefined;
		}
	): Promise<string> {
		try {
			const normalized = await jsonLd.canonize(ObjectHelper.removeEmptyProperties(document), {
				algorithm: options?.algorithm ?? "URDNA2015",
				format: "application/n-quads",
				documentLoader: JsonLdProcessor.getDocumentLoader()
			});
			return normalized;
		} catch (err) {
			JsonLdProcessor.handleCommonErrors(err);

			throw new GeneralError(JsonLdProcessor._CLASS_NAME, "canonize", undefined, err);
		}
	}

	/**
	 * Add a redirect to use during document resolution.
	 * @param from The URL to redirect from.
	 * @param to The URL to redirect to.
	 */
	public static addRedirect(from: RegExp, to: string): void {
		const redirects = JsonLdProcessor.getRedirects();
		if (!redirects.some(r => r.from === from)) {
			redirects.push({ from, to });
		}
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
	public static gatherContexts<T>(
		element: T,
		initial?: IJsonLdContextDefinitionRoot
	): IJsonLdContextDefinitionRoot | undefined {
		let combinedContexts: IJsonLdContextDefinitionRoot | undefined = initial;

		if (Is.object<IJsonLdNodeObject>(element)) {
			if (!Is.empty(element["@context"])) {
				combinedContexts = JsonLdProcessor.combineContexts(
					initial,
					element["@context"] as IJsonLdContextDefinitionRoot
				);
			}

			for (const prop of Object.keys(element)) {
				const value = element[prop];
				if (Is.object(value)) {
					combinedContexts = this.gatherContexts(value as IJsonLdNodeObject, combinedContexts);
				} else if (Is.array(value)) {
					for (const item of value) {
						if (Is.object(item)) {
							combinedContexts = this.gatherContexts(item as IJsonLdNodeObject, combinedContexts);
						}
					}
				}
			}
		}

		return combinedContexts;
	}

	/**
	 * Remove all the contexts that match the pattern.
	 * @param context The context to remove the entries from.
	 * @param match The element to try and match.
	 * @returns The updated contexts.
	 */
	public static removeContexts(
		context: IJsonLdContextDefinitionRoot | undefined,
		match?: IJsonLdContextDefinitionElement[]
	): IJsonLdContextDefinitionRoot | undefined {
		if (!Is.arrayValue(match)) {
			return context;
		}

		let finalContext: IJsonLdContextDefinitionRoot | undefined;
		if (Is.string(context)) {
			for (const m of match) {
				if (context === m) {
					break;
				}
			}
		} else if (Is.array(context)) {
			for (const item of context) {
				const hasMatch = match.some(m => ObjectHelper.equal(m, item));
				if (!hasMatch) {
					finalContext ??= [];
					if (Is.array(finalContext)) {
						finalContext.push(item);
					}
				}
			}
		} else if (Is.object(context)) {
			const hasMatch = match.some(m => ObjectHelper.equal(m, context));
			if (!hasMatch) {
				finalContext = context;
			}
		}

		return Is.arrayValue(finalContext) && finalContext.length === 1
			? finalContext[0]
			: finalContext;
	}

	/**
	 * Add a context directly to the document loader cache.
	 * @param url The url the ld context is for.
	 * @param ldContext The context to add.
	 * @returns Nothing.
	 */
	public static async documentCacheAdd(url: string, ldContext: unknown): Promise<void> {
		await FetchHelper.setCacheEntry(url, ldContext);
	}

	/**
	 * Remove a context from the document loader cache.
	 * @param url The url the ld context is for.
	 * @returns Nothing.
	 */
	public static async documentCacheRemove(url: string): Promise<void> {
		await FetchHelper.removeCacheEntry(url);
	}

	/**
	 * Document loader which uses a caching mechanism.
	 * @param url The document url to load.
	 * @returns The document.
	 * @internal
	 */
	private static async documentLoader(url: Url): Promise<RemoteDocument> {
		const redirects = JsonLdProcessor.getRedirects();
		for (const redirect of redirects) {
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
				cacheTtlMs: JsonLdProcessor.getCacheLimit(),
				headers: {
					[HeaderTypes.Accept]: `${MimeTypes.JsonLd},${MimeTypes.Json}`
				}
			}
		);

		return {
			documentUrl: url,
			document: response
		};
	}

	/**
	 * Handle common errors.
	 * @param err The error to handle.
	 * @internal
	 */
	private static handleCommonErrors(err: unknown): void {
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
		} else if (
			Is.object<{ name: string; details?: { [id: string]: unknown } }>(err) &&
			err.name.startsWith("jsonld.")
		) {
			throw new GeneralError(JsonLdProcessor._CLASS_NAME, "jsonLdError", err.details, err);
		}
	}
}
