// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Is, type IValidationFailure, Validation } from "@gtsc/core";
import { DataTypeHandlerFactory, IdentifierHandlerFactory } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
import type { Gs1Location } from "../entities/gs1Location";
import { Gs1Identifiers } from "../identifiers/gs1Identifiers";
import { SubSiteAttributes } from "../models/gs1/subSiteAttributes";
import { SubSiteTypes } from "../models/gs1/subSiteTypes";

/**
 * Handle all the data types for GS1.
 * Vocabulary https://www.gs1.org/voc .
 */
export class Gs1DataTypes {
	/**
	 * Represents a master data location.
	 */
	public static TYPE_MASTER_DATA_LOCATION = "gs1_location_masterdata";

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(Gs1DataTypes.TYPE_MASTER_DATA_LOCATION, () => ({
			isInternal: true,
			type: Gs1DataTypes.TYPE_MASTER_DATA_LOCATION,
			defaultValue: {},
			validate: async (propertyName, value, failures, container) =>
				Gs1DataTypes.validateMasterDataLocation(
					propertyName,
					value as Gs1Location,
					failures,
					container
				)
		}));
	}

	/**
	 * Validate if the property is a valid location.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param container The object which contains this one.
	 * @returns True if the value is a location.
	 */
	public static validateMasterDataLocation(
		propertyName: string,
		value: Gs1Location,
		failures: IValidationFailure[],
		container?: unknown
	): value is Gs1Location {
		const is = Is.object<Gs1Location>(value);

		if (is) {
			if (Is.stringValue(value.id)) {
				const identifierHandler = IdentifierHandlerFactory.get(Gs1Identifiers.NAMESPACE_EPC_ID_GLN);
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

	/**
	 * Is the value an EPC identifier.
	 * @param value The value to test.
	 * @returns True if the value is an epc.
	 */
	public static isEpcHex(value: string): boolean {
		return /^[\dA-Fa-f]{24}$/.test(value);
	}

	/**
	 * Is the value a valid geo uri https://en.wikipedia.org/wiki/Geo_URI_scheme.
	 * @param value The value to check.
	 * @returns True if the value matches a geo uri.
	 */
	public static isGeoUri(value: string): boolean {
		return /^geo:[+-]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[+-]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)($|,)(\d{0,5})?/.test(
			value
		);
	}
}
