// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS Error types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EpcisErrorTypes = {
	ValidationFailed: "epcisException:ValidationException",

	NoSuchResource: "epcisException:NoSuchResourceException"
} as const;

/**
 * EPCIS Error types.
 */
export type EpcisErrorTypes = (typeof EpcisErrorTypes)[keyof typeof EpcisErrorTypes];
