// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataTypeHandlerFactory } from "@twin.org/data-core";
import { UneceTypes } from "../models/uneceTypes";

/**
 * Handle all the data types for UN/CEFACT.
 */
export class UneceDataTypes {
	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(`${UneceTypes.ContextRoot}${UneceTypes.Document}`, () => ({
			type: UneceTypes.Document,
			defaultValue: {}
		}));

		DataTypeHandlerFactory.register(`${UneceTypes.ContextRoot}${UneceTypes.Consignment}`, () => ({
			type: UneceTypes.Consignment,
			defaultValue: {}
		}));
	}
}
