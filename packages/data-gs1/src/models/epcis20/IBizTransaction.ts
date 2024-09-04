// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS Biz Transaction.
 */
export interface IBizTransaction {
	/**
	 * Type.
	 */
	type: string;

	/**
	 * The transaction.
	 */
	bizTransaction: string;
}
