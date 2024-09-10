// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataTypeHandlerFactory } from "@gtsc/data-core";
import { JsonLdProcessor } from "@gtsc/data-json-ld";
import { UneceTypes } from "../models/uneceTypes";

/**
 * Handle all the data types for UN/CEFACT.
 */
export class UneceDataTypes {
	/**
	 * Register the JSON-LD Redirects.
	 */
	public static registerJsonLdRedirects(): void {
		JsonLdProcessor.addRedirect(
			/https?:\/\/vocabulary.uncefact.org\/?/,
			"https://vocabulary.uncefact.org/unece-context.jsonld"
		);
	}

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(UneceTypes.Document, () => ({
			type: UneceTypes.Document,
			defaultValue: {}
		}));

		DataTypeHandlerFactory.register(UneceTypes.Consignment, () => ({
			type: UneceTypes.Consignment,
			defaultValue: {}
		}));
	}
}
