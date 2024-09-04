// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS SensorReport.
 */
export interface ISensorReport {
	/**
	 * Type.
	 */
	type: string;

	/**
	 * Value.
	 */
	value: number;

	/**
	 * Unit of measurement.
	 */
	uom: string;
}
