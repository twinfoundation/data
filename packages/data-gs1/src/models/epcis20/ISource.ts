// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS Biz Transaction.
 */
export interface ISource {
	/**
	 * Type.
	 */
	type: string;

	/**
	 * The source.
	 */
	source: string;
}
