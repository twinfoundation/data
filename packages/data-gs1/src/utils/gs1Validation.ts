// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Is, type IValidationFailure, Validation } from "@twin.org/core";
import { IdentifierHandlerFactory } from "@twin.org/data-core";
import { nameof } from "@twin.org/nameof";
import type { Gs1Location } from "../entities/gs1Location";
import { Gs1IdentifierTypes } from "../models/gs1/gs1IdentifierTypes";
import { SubSiteAttributes } from "../models/gs1/subSiteAttributes";
import { SubSiteTypes } from "../models/gs1/subSiteTypes";

/**
 * Validation for GS1 types.
 */
export class Gs1Validation {
	/**
	 * Validate if the property is a valid location.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param container The object which contains this one.
	 * @returns True if the value is a location.
	 */
	public static locationMasterData(
		propertyName: string,
		value: Gs1Location,
		failures: IValidationFailure[],
		container?: unknown
	): value is Gs1Location {
		const is = Is.object<Gs1Location>(value);

		if (is) {
			if (Is.stringValue(value.id)) {
				const identifierHandler = IdentifierHandlerFactory.get(Gs1IdentifierTypes.EpcIdGln);
				if (identifierHandler) {
					identifierHandler.validate(nameof(value.id, propertyName), value.id, failures);
				}
			}

			if (Is.notEmpty(value.latitude) && !Is.number(value.latitude)) {
				failures.push({
					property: nameof(value.latitude, propertyName),
					reason: "validation.geoCoordinatesLatitude"
				});
			}

			if (Is.notEmpty(value.longitude) && !Is.number(value.longitude)) {
				failures.push({
					property: nameof(value.longitude, propertyName),
					reason: "validation.geoCoordinatesLongitude"
				});
			}

			if (Is.notEmpty(value.sst)) {
				Validation.arrayOneOf(nameof(value.sst), value.sst, Object.values(SubSiteTypes), failures);
			}

			if (Is.notEmpty(value.ssa)) {
				Validation.arrayOneOf(
					nameof(value.ssa),
					value.ssa,
					Object.values(SubSiteAttributes),
					failures
				);
			}
		}

		return is;
	}
}
