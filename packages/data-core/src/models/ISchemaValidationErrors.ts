// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { OutputUnit } from "@hyperjump/json-schema";

/**
 * Schema validation error.
 */
export type ISchemaValidationErrors = (OutputUnit & { message?: string })[];
