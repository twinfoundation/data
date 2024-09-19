// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataTypeHandlerFactory } from "@twin.org/data-core";
import type { Gs1Location } from "../entities/gs1Location";
import { Gs1Types } from "../models/gs1/gs1Types";
import { Gs1Validation } from "../utils/gs1Validation";

/**
 * Handle all the data types for GS1.
 * Vocabulary https://www.gs1.org/voc .
 */
export class Gs1DataTypes {
	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(Gs1Types.LocationMasterData, () => ({
			type: Gs1Types.LocationMasterData,
			defaultValue: {},
			validate: async (propertyName, value, failures, container) =>
				Gs1Validation.locationMasterData(propertyName, value as Gs1Location, failures, container)
		}));
	}
}
