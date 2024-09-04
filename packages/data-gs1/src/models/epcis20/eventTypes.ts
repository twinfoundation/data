// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS 2.0 event types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EventTypes = {
	/**
	 * ObjectEvent.
	 */
	OBJECT_EVENT: "ObjectEvent",

	/**
	 * Aggregation Event.
	 */
	AGGREGATION_EVENT: "AggregationEvent",

	/**
	 * Association Event.
	 */
	ASSOCIATION_EVENT: "AssociationEvent",

	/**
	 * Transformation Event.
	 */
	TRANSFORMATION_EVENT: "TransformationEvent",

	/**
	 * Transaction Event.
	 */
	TRANSACTION_EVENT: "TransactionEvent"
} as const;

/**
 * EPCIS 2.0 event types.
 */
export type EventTypes = (typeof EventTypes)[keyof typeof EventTypes];
