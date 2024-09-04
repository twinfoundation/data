// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * VDA identifiers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VdaIdTypes = {
	/**
	 * Object.
	 */
	Obj: "obj",

	/**
	 * Location.
	 */
	Loc: "loc"
} as const;

/**
 * VDA identifiers.
 */
export type VdaIdTypes = (typeof VdaIdTypes)[keyof typeof VdaIdTypes];
