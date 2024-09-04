// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS Sensor metadata.
 */
export interface ISensorMetadata {
	/**
	 * Time.
	 */
	time: string;

	/**
	 * Device ID.
	 */
	deviceID: string;

	/**
	 * Device Metadata.
	 */
	deviceMetadata: string;

	/**
	 * Raw data.
	 */
	rawData: string;
}
