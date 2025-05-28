// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@twin.org/core";
import type { JSONSchema7 } from "json-schema";

/**
 * Interface describing a type which can handle a specific data type.
 */
export interface IDataTypeHandler {
	/**
	 * The context for the type.
	 */
	context: string;

	/**
	 * The type for the item.
	 */
	type: string;

	/**
	 * The default value for the item to use when constructing a new object.
	 */
	defaultValue?: unknown;

	/**
	 * Get the JSON schema for the data type.
	 * @returns The JSON schema for the data type.
	 */
	jsonSchema?(): Promise<JSONSchema7 | undefined>;

	/**
	 * A method for validating the data type.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to validate.
	 * @param failures List of failures to add to.
	 * @param container The object which contains this one.
	 * @returns True if the item is valid.
	 */
	validate?(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[],
		container?: unknown
	): Promise<boolean>;
}
