// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface for EPC class URI.
 */
export interface IEPCClassUri {
	/**
	 * The company prefix.
	 */
	companyPrefix: string;

	/**
	 * The item reference number.
	 */
	itemRefAndIndicator: string;

	/**
	 * The batch/lot.
	 */
	lot: string;
}
