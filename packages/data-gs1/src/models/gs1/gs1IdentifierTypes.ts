// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Gs1IdTypes } from "./gs1IdTypes";

/**
 * The types of GS1 Identifier data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Gs1IdentifierTypes = {
	/**
	 * Identifier epc id namespace.
	 */
	EpcId: "epc:id",

	/**
	 * Identifier epc:id:gtin namespace.
	 */
	EpcIdGtin: `epc:id:${Gs1IdTypes.Gtin}`,

	/**
	 * Identifier epc:id:sgln namespace.
	 */
	EpcIdGln: `epc:id:${Gs1IdTypes.Gln}`,

	/**
	 * Identifier epc id namespace.
	 */
	EpcClass: "epc:class"
} as const;

/**
 * The types of GS1 Identifier data.
 */
export type Gs1IdentifierTypes = (typeof Gs1IdentifierTypes)[keyof typeof Gs1IdentifierTypes];
