// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of UNECE data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const UneceTypes = {
	/**
	 * Represents a UN/CEFACT document.
	 */
	Document: "https://vocabulary.uncefact.org/Document",

	/**
	 * Represents a UN/CEFACT consignment.
	 */
	Consignment: "https://vocabulary.uncefact.org/Consignment"
} as const;

/**
 * The types of framework data.
 */
export type UneceTypes = (typeof UneceTypes)[keyof typeof UneceTypes];
