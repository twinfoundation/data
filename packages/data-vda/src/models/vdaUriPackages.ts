// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * VDA URI Packages License Plates identifiers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VdaUriPackages = {
	/**
	 * Unique package ID of inner packaging (Single Label).
	 */
	Package1J: "1J",

	/**
	 * Unique package ID of JIS loading unit with compartments.
	 */
	Package3J: "3J",

	/**
	 * Unique package ID of JIS loading unit with 1...n JIS packages.
	 */
	Package4J: "4J",

	/**
	 * Unique package ID of mixed loading unit with intermediate packaging level (mixed master).
	 */
	Package5J: "5J",

	/**
	 * Unique package ID of loading unit or intermediate packaging containing identical parts.
	 */
	Package67: "6J"
} as const;

/**
 * VDA URI Packages License Plates identifiers.
 */
export type VdaUriPackages = (typeof VdaUriPackages)[keyof typeof VdaUriPackages];
