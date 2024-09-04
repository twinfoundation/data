// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEpcisEventDetails } from "./IEpcisEventDetails";
import type { IQuantity } from "./IQuantity";

/**
 * Describes an AggregationEvent.
 */
export interface IBaseAggregationEvent extends IEpcisEventDetails {
	/**
	 * Parent is only optional when action is OBSERVE.
	 */
	parentID?: string;

	/**
	 * The children EPC which can be empty when action is DELETE.
	 */
	childEPCs?: string[];

	/**
	 * Quantity in case of class-level event visibility data.
	 */
	childQuantityList?: IQuantity[];
}
