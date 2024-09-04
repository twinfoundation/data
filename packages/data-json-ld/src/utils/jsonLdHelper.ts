// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { GeneralError, Is } from "@gtsc/core";
import { PropertyHelper, type IProperty } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
import { JsonLdVocabulary } from "../jsonLdVocabulary";

/**
 * JSON-LD Helper.
 */
export class JsonLdHelper {
	/**
	 * The class name.
	 * @internal
	 */
	private static readonly _CLASS_NAME = nameof<JsonLdHelper>();

	/**
	 * The stems for the known vocabularies.
	 * @internal
	 */
	private static readonly _stems: string[] = [JsonLdVocabulary.ACTIVITY_STREAMS_VOCAB_URI_STEM];

	/**
	 * Builds the JSON-LD @type.
	 * @param properties The current properties.
	 * @returns The LD Type encountered.
	 * @throws General Error if the input type cannot be converted to JSON-LD.
	 */
	public static buildJsonLdType(properties: IProperty[] | undefined): string[] {
		const localType = PropertyHelper.getValue(properties, JsonLdVocabulary.LD_TYPE);
		const types: string[] = [];

		if (Is.string(localType)) {
			try {
				// We allow adding several types as a stringified JSON
				const typeAsObj = JSON.parse(localType);
				if (Is.array(typeAsObj)) {
					for (const type of typeAsObj) {
						types.push(this.compactTerm(type as string));
					}
				} else {
					throw new GeneralError(this._CLASS_NAME, "json-ld.invalidType");
				}
			} catch {
				// It is a not parse-able string
				types.push(this.compactTerm(localType));
			}
		} else if (Is.array(localType)) {
			for (const type of localType) {
				if (!Is.string(type)) {
					throw new GeneralError(this._CLASS_NAME, "json-ld.invalidType");
				}
				types.push(this.compactTerm(type));
			}
		}

		return types;
	}

	/**
	 * Register a stem for use during term compaction.
	 * @param stem The stem to register.
	 */
	public static registerStem(stem: string): void {
		if (!this._stems.includes(stem)) {
			this._stems.push(stem);
		}
	}

	/**
	 * Compacts a term. If URI prefix not known then it is kept as it is.
	 * @param term The term to be compacted.
	 * @returns The compacted version of the term.
	 */
	public static compactTerm(term: string): string {
		for (const stem of this._stems) {
			const index = term.indexOf(stem);
			if (index === 0) {
				return term.slice(term.length);
			}
		}

		return term;
	}
}
