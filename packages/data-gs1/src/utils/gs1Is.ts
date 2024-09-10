// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Is checks for GS1 data.
 */
export class Gs1Is {
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
