// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { IdentifierHandlerFactory } from "@twin.org/data-core";
import { Gs1IdentifierTypes } from "../models/gs1/gs1IdentifierTypes";
import { Gs1IdentifiersValidation } from "../utils/gs1IdentifiersValidation";

/**
 * Handle all identifier types for GS1.
 */
export class Gs1Identifiers {
	/**
	 * Register all the identifiers.
	 */
	public static registerIdentifiers(): void {
		IdentifierHandlerFactory.register(Gs1IdentifierTypes.EpcId, () => ({
			namespace: Gs1IdentifierTypes.EpcId,
			validate: (propertyName, value, failures): boolean =>
				Gs1IdentifiersValidation.epcId(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(Gs1IdentifierTypes.EpcIdGtin, () => ({
			namespace: Gs1IdentifierTypes.EpcIdGtin,
			validate: (propertyName, value, failures): boolean =>
				Gs1IdentifiersValidation.epcIdGtin(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(Gs1IdentifierTypes.EpcIdGln, () => ({
			namespace: Gs1IdentifierTypes.EpcIdGln,
			validate: (propertyName, value, failures): boolean =>
				Gs1IdentifiersValidation.epcIdGln(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(Gs1IdentifierTypes.EpcClass, () => ({
			namespace: Gs1IdentifierTypes.EpcClass,
			validate: (propertyName, value, failures): boolean =>
				Gs1IdentifiersValidation.epcClass(propertyName, value, failures)
		}));
	}
}
