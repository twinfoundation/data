// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* cSpell:disable */
/**
 * GS1 EPC Identifiers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Gs1IdTypes = {
	/**
	 * GTIN - Trade Item.
	 */
	Gtin: "sgtin",

	/**
	 * SSCC - Logistics Unit.
	 */
	Sscc: "sscc",

	/**
	 * GLN - Location.
	 */
	Gln: "sgln",

	/**
	 * GRAI - Returnable Asset.
	 */
	Grai: "grai",

	/**
	 * GIAI - Fixed Asset.
	 */
	Giai: "giai",

	/**
	 * GSRN - Recipient - Hospital Admission or Club Membership.
	 */
	GsrnRecipient: "gsrn",

	/**
	 * GSRN - Provider - Medical Caregiver or Loyalty Club.
	 */
	GsrnProvider: "gsrnp",

	/**
	 * GDTI - Document.
	 */
	Gtdi: "gtdi",

	/**
	 * Technical Industries for unique identification of parts and components.
	 */
	None: "cpi",

	/**
	 * GCN - Coupon.
	 */
	Gcn: "sgcn",

	/**
	 * Logical grouping of goods intended for transport as a whole assigned by a freight forwarder.
	 */
	Ginc: "ginc",

	/**
	 * Logical grouping of logistic units travelling under one dispatch advice and/or bill of lading.
	 */
	Gsin: "gsin",

	/**
	 * One of multiple pieces comprising, and subordinate to, a whole.
	 */
	Ai: "itip",

	/**
	 * Pack identification to combat illicit trade.
	 */
	GtinTpx: "upui",

	/**
	 * Identification of Economic Operator, Owning party or processing party in CoC/CoO.
	 */
	GlnAi: "pgln",

	/**
	 * Unspecified.
	 */
	Unspecified: "gid",

	/**
	 * US Dept of Defense supply chain.
	 */
	UsDod: "usdod",

	/**
	 * Aerospace and Defense sector for unique identification of aircraft and other parts and items.
	 */
	AerospaceDefence: "adi",

	/**
	 * Intermodal shipping containers.
	 */
	Intermodal: "bic",

	/**
	 * Vessel Identification.
	 */
	Vessel: "imovn"
} as const;

/**
 * GS1 EPC Identifiers
 */
export type Gs1IdTypes = (typeof Gs1IdTypes)[keyof typeof Gs1IdTypes];
