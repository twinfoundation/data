// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { acceptableMediaTypes, addUriSchemePlugin, type UriSchemePlugin } from "@hyperjump/browser";
import type { Json } from "@hyperjump/json-pointer";
import {
	type OutputUnit,
	registerSchema,
	unregisterSchema,
	validate
} from "@hyperjump/json-schema/draft-2020-12";
import { Is, StringHelper } from "@twin.org/core";
import type { IEntitySchema } from "@twin.org/entity";
import { nameof } from "@twin.org/nameof";
import { FetchHelper, HttpMethod } from "@twin.org/web";
import type { Response as UndiciResponse } from "undici";
import { DataTypeHandlerFactory } from "../factories/dataTypeHandlerFactory";
import type { IJsonSchema } from "../models/IJsonSchema";
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
	 * The private prefix for the type.
	 * @internal
	 */
	private static readonly _PRIVATE_PREFIX = "https://twindev.org/private/";

	/**
	 * The private type.
	 * @internal
	 */
	private static readonly _PRIVATE_TYPE = "https://twindev.org/private/ValidationType";

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
		schema: IJsonSchema,
		data: T,
		additionalTypes?: { [id: string]: IJsonSchema }
	): Promise<ISchemaValidationResult> {
		const httpSchemePlugin: UriSchemePlugin = {
			retrieve: async uri => {
				let loadedSchema: IJsonSchema | undefined;

				const subTypeHandler = DataTypeHandlerFactory.getIfExists(uri);
				if (Is.function(subTypeHandler?.jsonSchema)) {
					const subSchema = await subTypeHandler.jsonSchema();
					if (Is.object<IJsonSchema>(subSchema)) {
						loadedSchema = subSchema;
					}
				}

				if (!Is.object<IJsonSchema>(loadedSchema)) {
					try {
						// We don't have the type in our local data types, so we try to fetch it from the web
						schema = await FetchHelper.fetchJson<never, IJsonSchema>(
							JsonSchemaHelper._CLASS_NAME,
							uri,
							HttpMethod.GET,
							undefined,
							{
								headers: {
									Accept: acceptableMediaTypes()
								},
								// Cache for an hour
								cacheTtlMs: 3600000
							}
						);
					} catch {}
				}

				// Failed to load remotely so return an empty object
				// so the schema validation doesn't completely fail
				loadedSchema ??= {};

				return {
					status: 200,
					statusText: "OK",
					ok: true,
					url: uri,
					headers: new Headers({
						"Content-Type": "application/schema+json"
					}),
					json: Promise.resolve(loadedSchema)
				} as unknown as UndiciResponse;
			}
		};

		addUriSchemePlugin("https", httpSchemePlugin);
		addUriSchemePlugin("http", httpSchemePlugin);

		// Add the additional types provided by the user
		if (Is.objectValue(additionalTypes)) {
			for (const key in additionalTypes) {
				additionalTypes[key].$schema =
					additionalTypes[key].$schema ?? JsonSchemaHelper.SCHEMA_VERSION;

				const additionalType = key.startsWith("http")
					? key
					: `${JsonSchemaHelper._PRIVATE_PREFIX}${key}`;
				registerSchema(additionalTypes[key], additionalType);
			}
		}

		schema.$schema = schema.$schema ?? JsonSchemaHelper.SCHEMA_VERSION;

		registerSchema(schema, JsonSchemaHelper._PRIVATE_TYPE);

		const output = await validate(JsonSchemaHelper._PRIVATE_TYPE, data as Json, "DETAILED");

		await this.cleanupOutput(output);
		await this.formatErrors(output, data);

		unregisterSchema(JsonSchemaHelper._PRIVATE_TYPE);

		// Remove the additional types provided by the user
		if (Is.objectValue(additionalTypes)) {
			for (const key in additionalTypes) {
				const additionalType = key.startsWith("http")
					? key
					: `${JsonSchemaHelper._PRIVATE_PREFIX}${key}`;
				unregisterSchema(additionalType);
			}
		}

		return {
			result: output.valid,
			errors: output.errors
		};
	}

	/**
	 * Get the property type from a schema.
	 * @param schema The schema to extract the types from.
	 * @param propertyName The name of the property to get the type for.
	 * @returns The types of the property.
	 */
	public static getPropertyType(schema: IJsonSchema, propertyName: string): string | undefined {
		if (Is.boolean(schema)) {
			return undefined;
		}
		if (schema.type === "object" && Is.objectValue(schema.properties)) {
			const propertySchema = schema.properties[propertyName];
			if (!Is.boolean(propertySchema) && !Is.empty(propertySchema)) {
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
	): IJsonSchema {
		let domain = StringHelper.trimTrailingSlashes(baseDomain ?? "");
		if (domain.length > 0) {
			domain += "/";
		}

		const properties: {
			[key: string]: IJsonSchema;
		} = {};

		const required: string[] = [];

		if (Is.arrayValue(entitySchema?.properties)) {
			for (const propertySchema of entitySchema.properties) {
				const jsonPropertySchema: IJsonSchema = {
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

	/**
	 * Cleanup the errors from the schema validation.
	 * @param outputUnit The errors to format.
	 * @param data The data that was validated.
	 * @returns The formatted errors.
	 */
	public static async formatErrors<T>(
		outputUnit: OutputUnit & { message?: string },
		data: T
	): Promise<void> {
		if (outputUnit.keyword === "https://json-schema.org/keyword/required") {
			outputUnit.message = `The property '${outputUnit.instanceLocation}' is required but was not found.`;
		} else {
			outputUnit.message = `"${outputUnit.instanceLocation}" fails schema constraint ${outputUnit.absoluteKeywordLocation}`;
		}

		if (Is.arrayValue(outputUnit.errors)) {
			for (const subError of outputUnit.errors) {
				await this.formatErrors(subError, data);
			}
		}
	}

	/**
	 * Cleanup the errors from the schema validation.
	 * @param outputUnit The errors to format.
	 * @returns The formatted errors.
	 * @internal
	 */
	private static async cleanupOutput(outputUnit: OutputUnit & { message?: string }): Promise<void> {
		if (outputUnit.absoluteKeywordLocation?.startsWith(JsonSchemaHelper._PRIVATE_TYPE)) {
			outputUnit.absoluteKeywordLocation = outputUnit.absoluteKeywordLocation.replace(
				JsonSchemaHelper._PRIVATE_TYPE,
				""
			);
		}

		if (Is.arrayValue(outputUnit.errors)) {
			for (const subError of outputUnit.errors) {
				await this.cleanupOutput(subError);
			}
		}
	}
}
