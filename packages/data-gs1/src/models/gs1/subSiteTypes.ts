// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Sub Site Identifier Types.
 * Spec https://www.gs1.org/sites/default/files/docs/epc/CBV-Standard-1-2-1-r-2017-05-05.pdf .
 * Section 10.3.1 .
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SubSiteTypes = {
	/**
	 * The Backroom.
	 */
	Backroom: "201",

	/**
	 * The Storage Area.
	 */
	StorageArea: "202",

	/**
	 * The Sales Floor.
	 */
	SalesFloor: "203",

	/**
	 * The Returns Area.
	 */
	ReturnsArea: "207",

	/**
	 * The Production Area.
	 */
	ProductionArea: "208",

	/**
	 * The Receiving Area.
	 */
	ReceivingArea: "209",

	/**
	 * The Shipping Area.
	 */
	ShippingArea: "210",

	/**
	 * The Sales Floor Transition Area.
	 */
	SalesFloorTransitionArea: "211",

	/**
	 * The Customer Pick-Up Area.
	 */
	CustomerPickupArea: "212",

	/**
	 * The Yard.
	 */
	Yard: "213",

	/**
	 * The Container Deck.
	 */
	ContainerDeck: "214",

	/**
	 * The Cargo Terminal.
	 */
	CargoTerminal: "215",

	/**
	 * The Packaging Area.
	 */
	PackagingArea: "251",

	/**
	 * The Picking Area.
	 */
	PickingArea: "252",

	/**
	 * The Pharmacy Area.
	 */
	PharmacyArea: "253",

	/**
	 * Undefined.
	 */
	Undefined: "299"
} as const;

/**
 * Sub Site Identifier Types.
 * Spec https://www.gs1.org/sites/default/files/docs/epc/CBV-Standard-1-2-1-r-2017-05-05.pdf .
 * Section 10.3.1 .
 */
export type SubSiteTypes = (typeof SubSiteTypes)[keyof typeof SubSiteTypes];
