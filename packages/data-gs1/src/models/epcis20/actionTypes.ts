// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS 2.0 action types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActionTypes = {
	/**
	 * ADD action.
	 */
	Add: "ADD",

	/**
	 * OBSERVE action.
	 */
	Observe: "OBSERVE",

	/**
	 * DELETE action.
	 */
	Delete: "DELETE"
} as const;

/**
 * EPCIS 2.0 action types.
 */
export type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes];
