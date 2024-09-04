// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* cSpell:disable */

/**
 * EPCIS 2.0 disposition types.
 *
 * See EPCIS CVB for more details.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DispositionTypes = {
	ACTIVE: "active",

	CONTAINER_CLOSED: "container_closed",

	DAMAGED: "damaged",

	DESTROYED: "destroyed",

	DISPENSED: "dispensed",

	DISPOSED: "disposed",

	ENCODED: "encoded",

	EXPIRED: "expired",

	IN_PROGRESS: "in_progress",

	IN_TRANSIT: "in_transit",

	INACTIVE: "inactive",

	NO_PEDIGREE_MATCH: "no_pedigree_match",

	NON_SELLABLE_OTHER: "non_sellable_other",

	PARTIALLY_DISPENSED: "partially_dispensed",

	RECALLED: "recalled",

	RESERVED: "reserved",

	RETAIL_SOLD: "retail_sold",

	RETURNED: "returned",

	SELLABLE_ACCESSIBLE: "sellable_accessible",

	SELLABLE_NOT_ACCESSIBLE: "sellable_not_accessible",

	STOLEN: "stolen",

	UNKNOWN: "unknown",

	AVAILABLE: "available",

	COMPLETENESS_VERIFIED: "completeness_verified",

	COMPLETENESS_INFERRED: "completeness_inferred",

	CONFORMANT: "conformant",

	CONTAINER_OPEN: "container_open",

	MISMATCH_INSTANCE: "mismatch_instance",

	MISMATCH_CLASS: "mismatch_class",

	MISMATCH_QUANTITY: "mismatch_quantity",

	NEEDS_REPLACEMENT: "needs_replacement",

	NON_CONFORMANT: "non_conformant",

	UNAVAILABLE: "unavailable"
} as const;

/**
 * EPCIS 2.0 disposition types.
 */
export type DispositionTypes = (typeof DispositionTypes)[keyof typeof DispositionTypes];
