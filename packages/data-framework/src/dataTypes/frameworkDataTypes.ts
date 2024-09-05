// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, Url, Urn, Validation, type IValidationFailure } from "@gtsc/core";
import { DataTypeHandlerFactory, type IProperty } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
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
	 * Represents a property.
	 */
	public static TYPE_PROPERTY = `${FrameworkVocabulary.SCHEMA_URI}Property`;

	/**
	 * Represents a property list.
	 */
	public static TYPE_PROPERTY_LIST = `${FrameworkVocabulary.SCHEMA_URI}PropertyList`;

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

		DataTypeHandlerFactory.register(FrameworkDataTypes.TYPE_PROPERTY_LIST, () => ({
			type: FrameworkDataTypes.TYPE_PROPERTY_LIST,
			defaultValue: [],
			jsonSchema: async () => ({
				type: "array",
				items: {
					$ref: FrameworkDataTypes.TYPE_PROPERTY
				}
			}),
			validate: async (propertyName, value, failures, container) =>
				FrameworkDataTypes.validateIPropertyList(
					propertyName,
					value as IProperty[],
					failures,
					container
				)
		}));

		DataTypeHandlerFactory.register(FrameworkDataTypes.TYPE_PROPERTY, () => ({
			type: FrameworkDataTypes.TYPE_PROPERTY,
			defaultValue: {},
			jsonSchema: async () => ({
				type: "object",
				properties: {
					key: {
						type: "string"
					},
					type: {
						type: "string"
					},
					value: {}
				},
				required: ["key", "type", "value"]
			}),
			validate: async (propertyName, value, failures, container) =>
				FrameworkDataTypes.validateIProperty(propertyName, value as IProperty, failures, container)
		}));
	}

	/**
	 * Validator for an IProperty list.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param container The object which contains this one.
	 * @returns True if the value is a valid property list.
	 */
	public static validateIPropertyList(
		propertyName: string,
		value: IProperty[],
		failures: IValidationFailure[],
		container?: unknown
	): boolean {
		if (Is.empty(value)) {
			return true;
		}

		const is = Is.array<IProperty>(value);

		if (is) {
			const keys: string[] = [];
			for (let i = 0; i < value.length; i++) {
				if (keys.includes(value[i].key)) {
					failures.push({
						property: `${propertyName}[${i}].key`,
						reason: "validation.properties.keyAlreadyExists"
					});
				}
				keys.push(value[i].key);

				FrameworkDataTypes.validateIProperty(
					`${propertyName}[${i}]`,
					value[i],
					failures,
					container
				);
			}
		}

		return is;
	}

	/**
	 * Validator for an IProperty.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @param container The object which contains this one.
	 * @returns True if the value is a valid property.
	 */
	public static validateIProperty(
		propertyName: string,
		value: IProperty,
		failures: IValidationFailure[],
		container?: unknown
	): boolean {
		const is = Validation.object<IProperty>(propertyName, value, failures);

		if (is) {
			Validation.stringValue(nameof(value.key, propertyName), value.key, failures);
			const isValidTypeUrl = Url.validate(nameof(value.type, propertyName), value.type, failures);
			Validation.notEmpty(nameof(value.value, propertyName), value.value, failures);

			if (isValidTypeUrl) {
				const dataTypeHandler = DataTypeHandlerFactory.get(value.type);
				if (dataTypeHandler?.validate) {
					dataTypeHandler.validate(propertyName, value.value, failures, container);
				}
			}
		}
		return is;
	}
}
