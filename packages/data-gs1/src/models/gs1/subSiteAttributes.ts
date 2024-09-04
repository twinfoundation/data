// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Sub Site Attributes.
 * Spec https://www.gs1.org/sites/default/files/docs/epc/CBV-Standard-1-2-1-r-2017-05-05.pdf .
 * Section 10.3.2 .
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubSiteAttributes = {
	/**
	 * Electronics.
	 */
	Electronics: "401",

	/**
	 * Cold Storage.
	 */
	ColdStorage: "402",

	/**
	 * Shelf.
	 */
	Shelf: "403",

	/**
	 * Frozen.
	 */
	Frozen: "404",

	/**
	 * Fresh.
	 */
	Fresh: "405",

	/**
	 * Promotion.
	 */
	Promotion: "406",

	/**
	 * End Cap.
	 */
	EndCap: "407",

	/**
	 * Point of Sale.
	 */
	PointOfSale: "408",

	/**
	 * Security.
	 */
	Security: "409",

	/**
	 * General Mdse.
	 */
	GeneralMdse: "411",

	/**
	 * Grocery.
	 */
	Grocery: "412",

	/**
	 * Box crusher.
	 */
	BoxCrusher: "413",

	/**
	 * Dock/Door.
	 */
	DockDoor: "414",

	/**
	 * Conveyor Belt.
	 */
	ConveyorBelt: "415",

	/**
	 * Pallet Wrapper.
	 */
	PalletWrapper: "416",

	/**
	 * Fixed Reader.
	 */
	FixedReader: "417",

	/**
	 * Mobile Reader.
	 */
	MobileReader: "418",

	/**
	 * Shelf Storage.
	 */
	ShelfStorage: "419",

	/**
	 * Returns.
	 */
	Returns: "420",

	/**
	 * Staging.
	 */
	Staging: "421",

	/**
	 * Assembly.
	 */
	Assembly: "422",

	/**
	 * Lay-Away.
	 */
	LayAway: "423",

	/**
	 * Dispenser.
	 */
	Dispenser: "424",

	/**
	 * Quarantine.
	 */
	Quarantine: "425",

	/**
	 * Controlled Substance.
	 */
	ControlledSubstance: "426",

	/**
	 * Recalled Product.
	 */
	RecalledProduct: "427",

	/**
	 * Quality Control.
	 */
	QualityControl: "428",

	/**
	 * Printing Room.
	 */
	PrintingRoom: "429",

	/**
	 * Loading Dock.
	 */
	LoadingDock: "420",

	/**
	 * Entrance Gate.
	 */
	EntranceGate: "431",

	/**
	 * Exit Gate.
	 */
	ExitGate: "432",

	/**
	 * Gate.
	 */
	Gate: "433",

	/**
	 * Read Point Verification Spot.
	 */
	ReadPointVerificationSpot: "434"
} as const;

/**
 * Sub Site Attributes.
 * Spec https://www.gs1.org/sites/default/files/docs/epc/CBV-Standard-1-2-1-r-2017-05-05.pdf .
 * Section 10.3.2 .
 */
export type SubSiteAttributes = (typeof SubSiteAttributes)[keyof typeof SubSiteAttributes];
