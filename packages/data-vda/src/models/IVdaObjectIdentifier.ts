// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IVdaCommon } from "./IVdaCommon";

/**
 * Interface for VDA object identifier.
 */
export interface IVdaObjectIdentifier extends IVdaCommon {
	/**
	 * The company identification number.
	 */
	companyIdNumber: string;

	/**
	 * The part number.
	 */
	partNumber: string;

	/**
	 * The part serial number.
	 */
	partSerialNumber: string;
}
