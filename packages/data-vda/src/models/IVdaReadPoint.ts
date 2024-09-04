// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IVdaCommon } from "./IVdaCommon";

/**
 * Interface for VDA read point.
 */
export interface IVdaReadPoint extends IVdaCommon {
	/**
	 * DUNS Number.
	 */
	dunsNumber: string;

	/**
	 * Plant.
	 */
	plant: string;

	/**
	 * Cost Center.
	 */
	costCenter: string;

	/**
	 * Device Name/Serial Number.
	 */
	serialNumber: string;
}
