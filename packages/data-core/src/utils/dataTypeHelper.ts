// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure } from "@twin.org/core";
import type { JSONSchema7 } from "json-schema";
import { JsonSchemaHelper } from "./jsonSchemaHelper";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";
import { ValidationMode } from "../models/validationMode";

/**
 * Class to help with data types.
 */
export class DataTypeHelper {
	/**
	 * Validate a data type.
	 * @param propertyName The name of the property being validated to use in error messages.
	 * @param dataType The data type to validate.
	 * @param data The data to validate.
	 * @param validationFailures The list of validation failures to add to.
	 * @param validationMode The validation mode to use, defaults to either.
	 * @returns True if the data was valid.
	 */
	public static async validate(
		propertyName: string,
		dataType: string | undefined,
		data: unknown,
		validationFailures: IValidationFailure[],
		validationMode?: ValidationMode
	): Promise<boolean> {
		if (Is.stringValue(dataType)) {
			const handler = DataTypeHandlerFactory.getIfExists(dataType);

			if (handler) {
				validationMode = validationMode ?? ValidationMode.Either;

				// If we have a validate function use that as it is more specific
				// and will produce better error messages
				if (
					(validationMode === ValidationMode.Validate ||
						validationMode === ValidationMode.Either) &&
					Is.function(handler.validate)
				) {
					return handler.validate(propertyName, data, validationFailures);
				} else if (
					(validationMode === ValidationMode.JsonSchema ||
						validationMode === ValidationMode.Either) &&
					Is.function(handler.jsonSchema)
				) {
					// Otherwise use the JSON schema if there is one
					const schema = await handler.jsonSchema();

					if (Is.object<JSONSchema7>(schema)) {
						const validationResult = await JsonSchemaHelper.validate(schema, data);
						if (Is.arrayValue(validationResult.error)) {
							validationFailures.push({
								property: propertyName,
								reason: "validation.schema.failedValidation",
								properties: {
									value: data,
									schemaErrors: validationResult.error,
									message: validationResult.error.map(e => e.message).join(", ")
								}
							});
						}
						return validationResult.result;
					}
				}
			}
		}

		// Return true by default if no other mechanism for validation is available
		return true;
	}
}
