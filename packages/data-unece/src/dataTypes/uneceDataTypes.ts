// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { DataTypeHandlerFactory } from "@gtsc/data-core";
import { JsonLdHelper } from "@gtsc/data-json-ld";
import { UneceVocabulary } from "../uneceVocabulary";

/**
 * Handle all the data types for UN/CEFACT.
 */
export class UneceDataTypes {
	/**
	 * Represents a UN/CEFACT document.
	 */
	public static TYPE_DOCUMENT = "https://vocabulary.uncefact.org/Document";

	/**
	 * Represents a UN/CEFACT consignment.
	 */
	public static TYPE_CONSIGNMENT = "https://vocabulary.uncefact.org/Consignment";

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		JsonLdHelper.registerStem(UneceVocabulary.UN_CEFACT_VOCAB_URI_STEM);

		DataTypeHandlerFactory.register(UneceDataTypes.TYPE_DOCUMENT, () => ({
			type: UneceDataTypes.TYPE_DOCUMENT,
			defaultValue: {}
		}));

		DataTypeHandlerFactory.register(UneceDataTypes.TYPE_CONSIGNMENT, () => ({
			type: UneceDataTypes.TYPE_CONSIGNMENT,
			defaultValue: {}
		}));
	}
}
