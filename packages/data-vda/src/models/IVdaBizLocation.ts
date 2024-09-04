// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IVdaCommon } from "./IVdaCommon";

/**
 * Interface for a VDA Biz Location.
 */
export interface IVdaBizLocation extends IVdaCommon {
	/**
	 * DUNS Number.
	 */
	dunsNumber: string;

	/**
	 * Plant Building Floor and Room.
	 */
	plantBuildingFloorRoom: string;
}
