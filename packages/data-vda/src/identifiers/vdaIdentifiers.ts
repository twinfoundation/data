// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { IdentifierHandlerFactory } from "@twin.org/data-core";
import { VdaIdentifierTypes } from "../models/vdaIdentifierTypes";
import { VdaIdentifiersValidation } from "../utils/vdaIdentifiersValidation";

/**
 * Handle all identifier types for VDA.
 */
export class VdaIdentifiers {
	/**
	 * Register all the identifiers.
	 */
	public static registerIdentifiers(): void {
		IdentifierHandlerFactory.register(VdaIdentifierTypes.JaifId, () => ({
			namespace: VdaIdentifierTypes.JaifId,
			validate: (propertyName, value, failures): boolean =>
				VdaIdentifiersValidation.jaifId(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(VdaIdentifierTypes.JaifLocation, () => ({
			namespace: VdaIdentifierTypes.JaifLocation,
			validate: (propertyName, value, failures): boolean =>
				VdaIdentifiersValidation.jaifIdLocation(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(VdaIdentifierTypes.JaifItem, () => ({
			namespace: VdaIdentifierTypes.JaifItem,
			validate: (propertyName, value, failures): boolean =>
				VdaIdentifiersValidation.jaifIdItem(propertyName, value, failures)
		}));
	}
}
