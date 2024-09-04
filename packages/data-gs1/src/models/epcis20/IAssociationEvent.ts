// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseAggregationEvent } from "./IBaseAggregationEvent";

/**
 * Association Event.
 */
export interface IAssociationEvent extends IBaseAggregationEvent {
	/**
	 * Type.
	 */
	type: "AssociationEvent";
}
