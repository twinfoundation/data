// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Urn, Validation } from "@gtsc/core";
import { DataTypeHandlerFactory } from "@gtsc/data-core";
import { JsonLdProcessor } from "@gtsc/data-json-ld";
import type { JSONSchema7 } from "json-schema";
import { FrameworkTypes } from "../models/frameworkTypes";
import TimestampMillisecondsSchema from "../schemas/TimestampMilliseconds.json";
import TimestampSecondsSchema from "../schemas/TimestampSeconds.json";
import URNSchema from "../schemas/URN.json";

/**
 * Handle all the framework data types.
 */
export class FrameworkDataTypes {
	/**
	 * Register the JSON-LD Redirects.
	 */
	public static registerJsonLdRedirects(): void {
		JsonLdProcessor.addRedirect(
			/https?:\/\/schema.gtsc.io\/v2\/?/,
			"https://schema.gtsc.io/v2/types.jsonld"
		);
	}

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(FrameworkTypes.Urn, () => ({
			type: FrameworkTypes.Urn,
			defaultValue: "",
			jsonSchema: async () => URNSchema as JSONSchema7,
			validate: async (propertyName, value, failures, container) =>
				Urn.validate(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(FrameworkTypes.TimestampMilliseconds, () => ({
			type: FrameworkTypes.TimestampMilliseconds,
			defaultValue: Date.now(),
			jsonSchema: async () => TimestampMillisecondsSchema as JSONSchema7,
			validate: async (propertyName, value, failures, container) =>
				Validation.timestampMilliseconds(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(FrameworkTypes.TimestampSeconds, () => ({
			type: FrameworkTypes.TimestampSeconds,
			defaultValue: Math.floor(Date.now() / 1000),
			jsonSchema: async () => TimestampSecondsSchema as JSONSchema7,
			validate: async (propertyName, value, failures, container) =>
				Validation.timestampSeconds(propertyName, value, failures)
		}));
	}
}
