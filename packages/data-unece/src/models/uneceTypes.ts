// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of UNECE data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const UneceTypes = {
	/**
	 * Context Root.
	 */
	ContextRoot: "https://vocabulary.uncefact.org/",

	/**
	 * Represents a UN/CEFACT document.
	 */
	Document: "Document",

	/**
	 * Represents a UN/CEFACT consignment.
	 */
	Consignment: "Consignment"
} as const;

/**
 * The types of framework data.
 */
export type UneceTypes = (typeof UneceTypes)[keyof typeof UneceTypes];
