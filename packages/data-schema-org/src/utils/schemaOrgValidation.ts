// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Is, Validation, type IValidationFailure } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import type { GeoCoordinates } from "schema-dts";

/**
 * Handle validation for schema.org.
 */
export class SchemaOrgValidation {
	/**
	 * Validate if the property is valid geo-coordinates.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is geo-coordinates.
	 */
	public static geoCoordinates(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is GeoCoordinates {
		const is = Validation.object<GeoCoordinates>(propertyName, value, failures);

		if (is) {
			// This is only a partial validation at the moment we should also support
			// address, addressCountry, elevation, postalCode as alternative
			// to gps coords
			let lat: number | undefined;
			if (Is.number(value.latitude)) {
				lat = value.latitude;
			} else if (Is.stringValue(value.latitude)) {
				lat = Coerce.number(value.latitude);
			}

			if (Is.number(lat)) {
				if (lat < -90 || lat > 90) {
					failures.push({
						property: nameof(value.latitude, propertyName),
						reason: "validation.geo.coordinatesLatitudeRange"
					});
				}
			} else {
				failures.push({
					property: nameof(value.latitude, propertyName),
					reason: "validation.geo.coordinatesLatitudeNumber"
				});
			}

			let lng: number | undefined;
			if (Is.number(value.longitude)) {
				lng = value.longitude;
			} else if (Is.stringValue(value.longitude)) {
				lng = Coerce.number(value.longitude);
			}

			if (Is.number(lng)) {
				if (lng < -180 || lng > 180) {
					failures.push({
						property: nameof(value.longitude, propertyName),
						reason: "validation.geo.coordinatesLongitudeRange"
					});
				}
			} else {
				failures.push({
					property: nameof(value.longitude, propertyName),
					reason: "validation.geo.coordinatesLongitudeNumber"
				});
			}
		}

		return is;
	}
}
