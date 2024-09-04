// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS Destination.
 */
export interface IDestination {
	/**
	 * Type.
	 */
	type: string;

	/**
	 * The destination.
	 */
	destination: string;
}
