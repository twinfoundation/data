// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Is, Url, Validation, type IValidationFailure } from "@gtsc/core";
import { DataTypeHandlerFactory } from "@gtsc/data-core";
import { JsonLdHelper } from "@gtsc/data-json-ld";
import { nameof } from "@gtsc/nameof";
import type { GeoCoordinates } from "schema-dts";
import { SchemaOrgVocabulary } from "../schemaOrgVocabulary";

/**
 * Handle all the data types for schema.org.
 */
export class SchemaOrgDataTypes {
	/**
	 * Represents text storage.
	 */
	public static TYPE_TEXT = "https://schema.org/Text";

	/**
	 * Represents integer number values.
	 */
	public static TYPE_INTEGER = "https://schema.org/Integer";

	/**
	 * Represents floating point numbers.
	 */
	public static TYPE_FLOAT = "https://schema.org/Float";

	/**
	 * Represents a boolean.
	 */
	public static TYPE_BOOLEAN = "https://schema.org/Boolean";

	/**
	 * Represents a url.
	 */
	public static TYPE_URL = "https://schema.org/URL";

	/**
	 * Represents a date as an ISO format string.
	 */
	public static TYPE_DATE = "https://schema.org/Date";

	/**
	 * Represents a date time as an ISO format string.
	 */
	public static TYPE_DATE_TIME = "https://schema.org/DateTime";

	/**
	 * Represents a time as an ISO format string.
	 */
	public static TYPE_TIME = "https://schema.org/Time";

	/**
	 * Represents a url which points to an image.
	 */
	public static TYPE_IMAGE = "https://schema.org/image";

	/**
	 * Represents a location.
	 */
	public static TYPE_GEO_COORDINATES = "https://schema.org/GeoCoordinates";

	/**
	 * Represents a structured value.
	 */
	public static TYPE_STRUCTURED_VALUE = "https://schema.org/StructuredValue";

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		JsonLdHelper.registerStem(SchemaOrgVocabulary.SCHEMA_ORG_VOCAB_URI_STEM);

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_TEXT, () => ({
			type: SchemaOrgDataTypes.TYPE_TEXT,
			defaultValue: "",
			jsonSchema: async () => ({
				type: "string"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.string(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_INTEGER, () => ({
			type: SchemaOrgDataTypes.TYPE_INTEGER,
			defaultValue: 0,
			jsonSchema: async () => ({
				type: "integer"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.integer(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_FLOAT, () => ({
			type: SchemaOrgDataTypes.TYPE_FLOAT,
			defaultValue: 0,
			jsonSchema: async () => ({
				type: "number"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.number(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_BOOLEAN, () => ({
			type: SchemaOrgDataTypes.TYPE_BOOLEAN,
			defaultValue: true,
			jsonSchema: async () => ({
				type: "boolean"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.boolean(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_URL, () => ({
			type: SchemaOrgDataTypes.TYPE_URL,
			defaultValue: "",
			jsonSchema: async () => ({
				type: "string",
				format: "uri"
			}),
			validate: async (propertyName, value, failures, container) =>
				Url.validate(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_DATE, () => ({
			type: SchemaOrgDataTypes.TYPE_DATE,
			defaultValue: new Date(),
			jsonSchema: async () => ({
				type: "string",
				format: "date"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.dateString(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_DATE_TIME, () => ({
			type: SchemaOrgDataTypes.TYPE_DATE_TIME,
			defaultValue: new Date(),
			jsonSchema: async () => ({
				type: "string",
				format: "date-time"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.dateTimeString(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_TIME, () => ({
			type: SchemaOrgDataTypes.TYPE_TIME,
			defaultValue: new Date(),
			jsonSchema: async () => ({
				type: "string",
				format: "time"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.timeString(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_IMAGE, () => ({
			type: SchemaOrgDataTypes.TYPE_IMAGE,
			defaultValue: "",
			jsonSchema: async () => ({
				type: "string",
				format: "uri"
			}),
			validate: async (propertyName, value, failures, container) =>
				Url.validate(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(SchemaOrgDataTypes.TYPE_GEO_COORDINATES, () => ({
			type: SchemaOrgDataTypes.TYPE_GEO_COORDINATES,
			defaultValue: { longitude: 0, latitude: 0 },
			jsonSchema: async () => ({
				type: "object",
				required: ["latitude", "longitude"],
				properties: {
					latitude: {
						type: ["number", "string"],
						minimum: -90,
						maximum: 90
					},
					longitude: {
						type: ["number", "string"],
						minimum: -180,
						maximum: 180
					}
				}
			}),
			validate: async (propertyName, value, failures, container) =>
				SchemaOrgDataTypes.validateGeoCoordinates(propertyName, value, failures)
		}));
	}

	/**
	 * Validate if the property is valid geo-coordinates.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is geo-coordinates.
	 */
	public static validateGeoCoordinates(
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
