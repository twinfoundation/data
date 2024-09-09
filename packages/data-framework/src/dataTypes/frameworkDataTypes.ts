// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Urn, Validation } from "@gtsc/core";
import { DataTypeHandlerFactory } from "@gtsc/data-core";
import { FrameworkVocabulary } from "../frameworkVocabulary";

/**
 * Handle all the framework data types.
 */
export class FrameworkDataTypes {
	/**
	 * Represents a urn.
	 */
	public static TYPE_URN = `${FrameworkVocabulary.SCHEMA_URI}URN`;

	/**
	 * Represents a timestamp as an integer, milliseconds since 1 Jan 1970.
	 */
	public static TYPE_TIMESTAMP_MILLISECONDS = `${FrameworkVocabulary.SCHEMA_URI}TimestampMilliseconds`;

	/**
	 * Represents a timestamp as an integer, seconds since 1 Jan 1970.
	 */
	public static TYPE_TIMESTAMP_SECONDS = `${FrameworkVocabulary.SCHEMA_URI}TimestampSeconds`;

	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(FrameworkDataTypes.TYPE_URN, () => ({
			type: FrameworkDataTypes.TYPE_URN,
			defaultValue: "",
			jsonSchema: async () => ({
				type: "string",
				format: "uri"
			}),
			validate: async (propertyName, value, failures, container) =>
				Urn.validate(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(FrameworkDataTypes.TYPE_TIMESTAMP_MILLISECONDS, () => ({
			type: FrameworkDataTypes.TYPE_TIMESTAMP_MILLISECONDS,
			defaultValue: Date.now(),
			jsonSchema: async () => ({
				type: "integer"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.timestampMilliseconds(propertyName, value, failures)
		}));

		DataTypeHandlerFactory.register(FrameworkDataTypes.TYPE_TIMESTAMP_SECONDS, () => ({
			type: FrameworkDataTypes.TYPE_TIMESTAMP_SECONDS,
			defaultValue: Math.floor(Date.now() / 1000),
			jsonSchema: async () => ({
				type: "integer"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.timestampSeconds(propertyName, value, failures)
		}));
	}
}
