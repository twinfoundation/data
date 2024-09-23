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
	Active: "active",

	ContainerClosed: "container_closed",

	Damaged: "damaged",

	Destroyed: "destroyed",

	Dispensed: "dispensed",

	Disposed: "disposed",

	Encoded: "encoded",

	Expired: "expired",

	InProgress: "in_progress",

	InTransit: "in_transit",

	Inactive: "inactive",

	NoPedigreeMatch: "no_pedigree_match",

	NonSellableOther: "non_sellable_other",

	PartiallyDispensed: "partially_dispensed",

	Recalled: "recalled",

	Reserved: "reserved",

	RetailSold: "retail_sold",

	Returned: "returned",

	SellableAccessible: "sellable_accessible",

	SellableNotAccessible: "sellable_not_accessible",

	Stolen: "stolen",

	Unknown: "unknown",

	Available: "available",

	CompletenessVerified: "completeness_verified",

	CompletenessInferred: "completeness_inferred",

	Conformant: "conformant",

	ContainerOpen: "container_open",

	MismatchInstance: "mismatch_instance",

	MismatchClass: "mismatch_class",

	MismatchQuantity: "mismatch_quantity",

	NeedsReplacement: "needs_replacement",

	NonConformant: "non_conformant",

	Unavailable: "unavailable"
} as const;

/**
 * EPCIS 2.0 disposition types.
 */
export type DispositionTypes = (typeof DispositionTypes)[keyof typeof DispositionTypes];
