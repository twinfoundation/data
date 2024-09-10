// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of schema.org data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SchemaOrgTypes = {
	/**
	 * Represents text storage.
	 */
	Text: "https://schema.org/Text",

	/**
	 * Represents integer number values.
	 */
	Integer: "https://schema.org/Integer",

	/**
	 * Represents floating point numbers.
	 */
	Float: "https://schema.org/Float",

	/**
	 * Represents a boolean.
	 */
	Boolean: "https://schema.org/Boolean",

	/**
	 * Represents a url.
	 */
	URL: "https://schema.org/URL",

	/**
	 * Represents a date as an ISO format string.
	 */
	Date: "https://schema.org/Date",

	/**
	 * Represents a date time as an ISO format string.
	 */
	DateTime: "https://schema.org/DateTime",

	/**
	 * Represents a time as an ISO format string.
	 */
	Time: "https://schema.org/Time",

	/**
	 * Represents a url which points to an image.
	 */
	Image: "https://schema.org/image",

	/**
	 * Represents a location.
	 */
	GeoCoordinates: "https://schema.org/GeoCoordinates",

	/**
	 * Represents a structured value.
	 */
	StructuredValue: "https://schema.org/StructuredValue"
} as const;

/**
 * The types of schema.org data.
 */
export type SchemaOrgTypes = (typeof SchemaOrgTypes)[keyof typeof SchemaOrgTypes];
