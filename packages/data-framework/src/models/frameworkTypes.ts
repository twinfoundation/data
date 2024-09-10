// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of framework data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const FrameworkTypes = {
	/**
	 * Represents a urn.
	 */
	Urn: "https://schema.gtsc.io/v2/URN",

	/**
	 * Represents a timestamp as an integer, milliseconds since 1 Jan 1970.
	 */
	TimestampMilliseconds: "https://schema.gtsc.io/v2/TimestampMilliseconds",

	/**
	 * Represents a timestamp as an integer, seconds since 1 Jan 1970.
	 */
	TimestampSeconds: "https://schema.gtsc.io/v2/TimestampSeconds"
} as const;

/**
 * The types of framework data.
 */
export type FrameworkTypes = (typeof FrameworkTypes)[keyof typeof FrameworkTypes];
