// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of GS1 data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Gs1Types = {
	/**
	 * Represents Location Master Data.
	 */
	LocationMasterData: "gs1_location_masterdata"
} as const;

/**
 * The types of GS1 data.
 */
export type Gs1Types = (typeof Gs1Types)[keyof typeof Gs1Types];
