// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * EPCIS Error types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EpcisErrorTypes = {
	VALIDATION_FAILED: "epcisException:ValidationException",

	NO_SUCH_RESOURCE: "epcisException:NoSuchResourceException"
} as const;

/**
 * EPCIS Error types.
 */
export type EpcisErrorTypes = (typeof EpcisErrorTypes)[keyof typeof EpcisErrorTypes];
