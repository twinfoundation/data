// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, StringHelper } from "@twin.org/core";
import type { IEntitySchema } from "@twin.org/entity";
import { nameof } from "@twin.org/nameof";
import { FetchHelper, HttpMethod } from "@twin.org/web";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import type { JSONSchema7 } from "json-schema";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";
import type { ISchemaValidationError } from "../models/ISchemaValidationError";
import type { ISchemaValidationResult } from "../models/ISchemaValidationResult";

/**
 * A helper for JSON schemas.
 */
export class JsonSchemaHelper {
	/**
	 * The schema version.
	 */
	public static readonly SCHEMA_VERSION = "https://json-schema.org/draft/2020-12/schema";

	/**
	 * The class name.
	 * @internal
	 */
	private static readonly _CLASS_NAME = nameof<JsonSchemaHelper>();

	/**
	 * Validates data against the schema.
	 * @param schema The schema to validate the data with.
	 * @param data The data to be validated.
	 * @param additionalTypes Additional types to add for reference, not already in DataTypeHandlerFactory.
	 * @returns Result containing errors if there are any.
	 */
	public static async validate<T = unknown>(
		schema: JSONSchema7,
		data: T,
		additionalTypes?: { [id: string]: JSONSchema7 }
	): Promise<ISchemaValidationResult> {
		const ajv = new Ajv({
			allowUnionTypes: true,
			// Disable strict tuples as it causes issues with the schema validation when
			// you have an array with fixed elements e.g. myType: [string, ...string[]]
			// https://github.com/ajv-validator/ajv/issues/1417
			strictTuples: false,
			loadSchema: async uri => {
				const subTypeHandler = DataTypeHandlerFactory.getIfExists(uri);
				if (Is.function(subTypeHandler?.jsonSchema)) {
					const subSchema = await subTypeHandler.jsonSchema();
					if (Is.object<JSONSchema7>(subSchema)) {
						return subSchema;
					}
				}

				try {
					// We don't have the type in our local data types, so we try to fetch it from the web
					return FetchHelper.fetchJson<never, JSONSchema7>(
						JsonSchemaHelper._CLASS_NAME,
						uri,
						HttpMethod.GET,
						undefined,
						{
							// Cache for an hour
							cacheTtlMs: 3600000
						}
					);
				} catch {
					// Failed to load remotely so return an empty object
					// so the schema validation doesn't completely fail
					return {};
				}
			}
		});

		addFormats(ajv);

		// Add the additional types provided by the user
		if (Is.objectValue(additionalTypes)) {
			for (const key in additionalTypes) {
				ajv.addSchema(additionalTypes[key], key);
			}
		}

		const compiled = await ajv.compileAsync(schema);
		const result = await compiled(data);

		const output: ISchemaValidationResult = {
			result
		};

		if (!output.result) {
			output.error = compiled.errors as ISchemaValidationError;
		}

		return output;
	}

	/**
	 * Get the property type from a schema.
	 * @param schema The schema to extract the types from.
	 * @param propertyName The name of the property to get the type for.
	 * @returns The types of the property.
	 */
	public static getPropertyType(schema: JSONSchema7, propertyName: string): string | undefined {
		if (schema.type === "object" && Is.objectValue(schema.properties)) {
			const propertySchema = schema.properties[propertyName];
			if (Is.object<JSONSchema7>(propertySchema)) {
				if (Is.stringValue(propertySchema.$ref)) {
					return propertySchema.$ref;
				}
				return propertySchema.type as string;
			}
		}
	}

	/**
	 * Convert an entity schema to JSON schema e.g https://example.com/schemas/.
	 * @param entitySchema The entity schema to convert.
	 * @param baseDomain The base domain for local schemas e.g. https://example.com/
	 * @returns The JSON schema for the entity.
	 */
	public static entitySchemaToJsonSchema(
		entitySchema: IEntitySchema | undefined,
		baseDomain?: string
	): JSONSchema7 {
		let domain = StringHelper.trimTrailingSlashes(baseDomain ?? "");
		if (domain.length > 0) {
			domain += "/";
		}

		const properties: {
			[key: string]: JSONSchema7;
		} = {};

		const required: string[] = [];

		if (Is.arrayValue(entitySchema?.properties)) {
			for (const propertySchema of entitySchema.properties) {
				const jsonPropertySchema: JSONSchema7 = {
					type: propertySchema.type,
					description: propertySchema.description,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					examples: propertySchema.examples as unknown as any
				};

				if (Is.stringValue(propertySchema.itemType) && propertySchema.type === "array") {
					if (propertySchema.itemType === "object") {
						jsonPropertySchema.items = {
							$ref: propertySchema.itemTypeRef?.startsWith("http")
								? propertySchema.itemTypeRef
								: `${domain}${propertySchema.itemTypeRef}`
						};
					} else {
						jsonPropertySchema.items = {
							type: propertySchema.itemType
						};
					}
				} else if (propertySchema.type === "object") {
					delete jsonPropertySchema.type;
					jsonPropertySchema.$ref = propertySchema.itemTypeRef?.startsWith("http")
						? propertySchema.itemTypeRef
						: `${domain}${propertySchema.itemTypeRef}`;
				}

				properties[propertySchema.property] = jsonPropertySchema;

				if (!propertySchema.optional) {
					required.push(propertySchema.property);
				}
			}
		}

		return {
			$schema: JsonSchemaHelper.SCHEMA_VERSION,
			$id: `${domain}${entitySchema?.type}`,
			title: entitySchema?.type,
			type: entitySchema ? "object" : "null",
			description: entitySchema?.options?.description,
			required,
			properties,
			additionalProperties: false
		};
	}
}
