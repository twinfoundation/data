// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { FetchHelper, HttpMethod, MimeTypes } from "@gtsc/web";
import jsonLd from "jsonld";
import type { JsonLd, RemoteDocument, Url } from "jsonld/jsonld-spec";
import type { IJsonLdContextDefinition, IJsonLdDocument } from "../models/IJsonLdDocument";

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
	 * @param context The context to compact the document to.
	 * @returns The compacted JSON-LD document.
	 */
	public static async compact(
		document: IJsonLdDocument,
		context?: IJsonLdContextDefinition
	): Promise<IJsonLdDocument> {
		try {
			return jsonLd.compact(document, context ?? {}, {
				documentLoader: JsonLdProcessor.DOCUMENT_LOADER
			});
		} catch (err) {
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
			return jsonLd.expand(compacted, {
				documentLoader: JsonLdProcessor.DOCUMENT_LOADER
			});
		} catch (err) {
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
