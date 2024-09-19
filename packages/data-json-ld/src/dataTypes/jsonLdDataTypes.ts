// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { DataTypeHandlerFactory } from "@twin.org/data-core";
import type { JSONSchema7 } from "json-schema";
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
		DataTypeHandlerFactory.register(JsonLdTypes.Document, () => ({
			type: JsonLdTypes.Document,
			jsonSchema: async () => JsonLdDocumentSchema as JSONSchema7
		}));

		DataTypeHandlerFactory.register(JsonLdTypes.NodeObject, () => ({
			type: JsonLdTypes.NodeObject,
			jsonSchema: async () => JsonLdNodeObjectSchema as JSONSchema7
		}));

		DataTypeHandlerFactory.register(JsonLdTypes.NodePrimitive, () => ({
			type: JsonLdTypes.NodePrimitive,
			jsonSchema: async () => JsonLdNodePrimitiveSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.GraphObject, () => ({
			type: JsonLdTypes.GraphObject,
			jsonSchema: async () => JsonLdGraphObjectSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ValueObject, () => ({
			type: JsonLdTypes.ValueObject,
			jsonSchema: async () => JsonLdValueObjectSchema as unknown as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ListObject, () => ({
			type: JsonLdTypes.ListObject,
			jsonSchema: async () => JsonLdListObjectSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ListObject, () => ({
			type: JsonLdTypes.ListObject,
			jsonSchema: async () => JsonLdListObjectSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.SetObject, () => ({
			type: JsonLdTypes.SetObject,
			jsonSchema: async () => JsonLdSetObjectSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.LanguageMap, () => ({
			type: JsonLdTypes.LanguageMap,
			jsonSchema: async () => JsonLdLanguageMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.IndexMap, () => ({
			type: JsonLdTypes.IndexMap,
			jsonSchema: async () => JsonLdIndexMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.IndexMapItem, () => ({
			type: JsonLdTypes.IndexMapItem,
			jsonSchema: async () => JsonLdIndexMapItemSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.IdMap, () => ({
			type: JsonLdTypes.IdMap,
			jsonSchema: async () => JsonLdIdMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.TypeMap, () => ({
			type: JsonLdTypes.TypeMap,
			jsonSchema: async () => JsonLdTypeMapSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.IncludedBlock, () => ({
			type: JsonLdTypes.IncludedBlock,
			jsonSchema: async () => JsonLdIncludedBlockSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ContextDefinition, () => ({
			type: JsonLdTypes.ContextDefinition,
			jsonSchema: async () => JsonLdContextDefinitionSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ExpandedTermDefinition, () => ({
			type: JsonLdTypes.ExpandedTermDefinition,
			jsonSchema: async () => JsonLdExpandedTermDefinitionSchema as unknown as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.Keyword, () => ({
			type: JsonLdTypes.Keyword,
			jsonSchema: async () => JsonLdKeywordSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ListOrSetItem, () => ({
			type: JsonLdTypes.ListOrSetItem,
			jsonSchema: async () => JsonLdListOrSetItemSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ContainerType, () => ({
			type: JsonLdTypes.ContainerType,
			jsonSchema: async () => JsonLdContainerTypeSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.ContainerTypeArray, () => ({
			type: JsonLdTypes.ContainerTypeArray,
			jsonSchema: async () => JsonLdContainerTypeArraySchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.JsonPrimitive, () => ({
			type: JsonLdTypes.JsonPrimitive,
			jsonSchema: async () => JsonLdJsonPrimitiveSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.JsonArray, () => ({
			type: JsonLdTypes.JsonArray,
			jsonSchema: async () => JsonLdJsonArraySchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.JsonObject, () => ({
			type: JsonLdTypes.JsonObject,
			jsonSchema: async () => JsonLdJsonObjectSchema as JSONSchema7
		}));
		DataTypeHandlerFactory.register(JsonLdTypes.JsonValue, () => ({
			type: JsonLdTypes.JsonValue,
			jsonSchema: async () => JsonLdJsonValueSchema as JSONSchema7
		}));
	}
}
