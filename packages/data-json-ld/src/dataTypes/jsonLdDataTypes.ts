// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataTypeHandlerFactory } from "@twin.org/data-core";
import type { JSONSchema7 } from "json-schema";
import { JsonLdContexts } from "../models/jsonLdContexts";
import { JsonLdTypes } from "../models/jsonLdTypes";
import JsonLdContainerTypeSchema from "../schemas/JsonLdContainerType.json";
import JsonLdContainerTypeArraySchema from "../schemas/JsonLdContainerTypeArray.json";
import JsonLdContextDefinitionSchema from "../schemas/JsonLdContextDefinition.json";
import JsonLdDocumentSchema from "../schemas/JsonLdDocument.json";
import JsonLdExpandedTermDefinitionSchema from "../schemas/JsonLdExpandedTermDefinition.json";
import JsonLdGraphObjectSchema from "../schemas/JsonLdGraphObject.json";
import JsonLdIdMapSchema from "../schemas/JsonLdIdMap.json";
import JsonLdIncludedBlockSchema from "../schemas/JsonLdIncludedBlock.json";
import JsonLdIndexMapSchema from "../schemas/JsonLdIndexMap.json";
import JsonLdIndexMapItemSchema from "../schemas/JsonLdIndexMapItem.json";
import JsonLdJsonArraySchema from "../schemas/JsonLdJsonArray.json";
import JsonLdJsonObjectSchema from "../schemas/JsonLdJsonObject.json";
import JsonLdJsonPrimitiveSchema from "../schemas/JsonLdJsonPrimitive.json";
import JsonLdJsonValueSchema from "../schemas/JsonLdJsonValue.json";
import JsonLdKeywordSchema from "../schemas/JsonLdKeyword.json";
import JsonLdLanguageMapSchema from "../schemas/JsonLdLanguageMap.json";
import JsonLdListObjectSchema from "../schemas/JsonLdListObject.json";
import JsonLdListOrSetItemSchema from "../schemas/JsonLdListOrSetItem.json";
import JsonLdNodeObjectSchema from "../schemas/JsonLdNodeObject.json";
import JsonLdNodePrimitiveSchema from "../schemas/JsonLdNodePrimitive.json";
import JsonLdObjectSchema from "../schemas/JsonLdObject.json";
import JsonLdSetObjectSchema from "../schemas/JsonLdSetObject.json";
import JsonLdTypeMapSchema from "../schemas/JsonLdTypeMap.json";
import JsonLdValueObjectSchema from "../schemas/JsonLdValueObject.json";

/**
 * Handle all the data types for JSON-LD.
 */
export class JsonLdDataTypes {
	/**
	 * Register all the data types.
	 */
	public static registerTypes(): void {
		DataTypeHandlerFactory.register(`${JsonLdContexts.ContextRoot}${JsonLdTypes.Document}`, () => ({
			type: JsonLdTypes.Document,
			jsonSchema: async () => JsonLdDocumentSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(`${JsonLdContexts.ContextRoot}${JsonLdTypes.Object}`, () => ({
			type: JsonLdTypes.Object,
			jsonSchema: async () => JsonLdObjectSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.NodeObject}`,
			() => ({
				type: JsonLdTypes.NodeObject,
				jsonSchema: async () => JsonLdNodeObjectSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.NodePrimitive}`,
			() => ({
				type: JsonLdTypes.NodePrimitive,
				jsonSchema: async () => JsonLdNodePrimitiveSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.GraphObject}`,
			() => ({
				type: JsonLdTypes.GraphObject,
				jsonSchema: async () => JsonLdGraphObjectSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ValueObject}`,
			() => ({
				type: JsonLdTypes.ValueObject,
				jsonSchema: async () => JsonLdValueObjectSchema as unknown as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ListObject}`,
			() => ({
				type: JsonLdTypes.ListObject,
				jsonSchema: async () => JsonLdListObjectSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ListObject}`,
			() => ({
				type: JsonLdTypes.ListObject,
				jsonSchema: async () => JsonLdListObjectSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.SetObject}`,
			() => ({
				type: JsonLdTypes.SetObject,
				jsonSchema: async () => JsonLdSetObjectSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.LanguageMap}`,
			() => ({
				type: JsonLdTypes.LanguageMap,
				jsonSchema: async () => JsonLdLanguageMapSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(`${JsonLdContexts.ContextRoot}${JsonLdTypes.IndexMap}`, () => ({
			type: JsonLdTypes.IndexMap,
			jsonSchema: async () => JsonLdIndexMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.IndexMapItem}`,
			() => ({
				type: JsonLdTypes.IndexMapItem,
				jsonSchema: async () => JsonLdIndexMapItemSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(`${JsonLdContexts.ContextRoot}${JsonLdTypes.IdMap}`, () => ({
			type: JsonLdTypes.IdMap,
			jsonSchema: async () => JsonLdIdMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(`${JsonLdContexts.ContextRoot}${JsonLdTypes.TypeMap}`, () => ({
			type: JsonLdTypes.TypeMap,
			jsonSchema: async () => JsonLdTypeMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.IncludedBlock}`,
			() => ({
				type: JsonLdTypes.IncludedBlock,
				jsonSchema: async () => JsonLdIncludedBlockSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ContextDefinition}`,
			() => ({
				type: JsonLdTypes.ContextDefinition,
				jsonSchema: async () => JsonLdContextDefinitionSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ExpandedTermDefinition}`,
			() => ({
				type: JsonLdTypes.ExpandedTermDefinition,
				jsonSchema: async () => JsonLdExpandedTermDefinitionSchema as unknown as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(`${JsonLdContexts.ContextRoot}${JsonLdTypes.Keyword}`, () => ({
			type: JsonLdTypes.Keyword,
			jsonSchema: async () => JsonLdKeywordSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ListOrSetItem}`,
			() => ({
				type: JsonLdTypes.ListOrSetItem,
				jsonSchema: async () => JsonLdListOrSetItemSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ContainerType}`,
			() => ({
				type: JsonLdTypes.ContainerType,
				jsonSchema: async () => JsonLdContainerTypeSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.ContainerTypeArray}`,
			() => ({
				type: JsonLdTypes.ContainerTypeArray,
				jsonSchema: async () => JsonLdContainerTypeArraySchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.JsonPrimitive}`,
			() => ({
				type: JsonLdTypes.JsonPrimitive,
				jsonSchema: async () => JsonLdJsonPrimitiveSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.JsonArray}`,
			() => ({
				type: JsonLdTypes.JsonArray,
				jsonSchema: async () => JsonLdJsonArraySchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.JsonObject}`,
			() => ({
				type: JsonLdTypes.JsonObject,
				jsonSchema: async () => JsonLdJsonObjectSchema as JSONSchema7
			})
		);
		DataTypeHandlerFactory.register(
			`${JsonLdContexts.ContextRoot}${JsonLdTypes.JsonValue}`,
			() => ({
				type: JsonLdTypes.JsonValue,
				jsonSchema: async () => JsonLdJsonValueSchema as JSONSchema7
			})
		);
	}
}
