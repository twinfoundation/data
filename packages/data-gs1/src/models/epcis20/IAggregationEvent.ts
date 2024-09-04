// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseAggregationEvent } from "./IBaseAggregationEvent";

/**
 * Describes an AggregationEvent.
 */
export interface IAggregationEvent extends IBaseAggregationEvent {
	/**
	 * The type.
	 */
	type: "AggregationEvent";
}
