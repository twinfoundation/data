// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of VDA Identifier data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VdaIdentifierTypes = {
	/**
	 * Identifier Joint Automotive Industry Format namespace.
	 */
	JaifId: "jaif:id",

	/**
	 * Specific extended namespace for location validation.
	 */
	JaifLocation: "jaif:id@location",

	/**
	 * Specific extended namespace for item validation.
	 */
	JaifItem: "jaif:id@item"
} as const;

/**
 * The types of VDA Identifier data.
 */
export type VdaIdentifierTypes = (typeof VdaIdentifierTypes)[keyof typeof VdaIdentifierTypes];
