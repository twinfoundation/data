// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The types of JSON-LD data.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const JsonLdTypes = {
	/**
	 * Represents JSON-LD Document.
	 */
	Document: "https://schema.twindev.org/json-ld/JsonLdDocument",

	/**
	 * Represents JSON-LD Node Object.
	 */
	NodeObject: "https://schema.twindev.org/json-ld/JsonLdNodeObject",

	/**
	 * Represents JSON-LD Node Primitive.
	 */
	NodePrimitive: "https://schema.twindev.org/json-ld/JsonLdNodePrimitive",

	/**
	 * Represents JSON-LD Graph Object.
	 */
	GraphObject: "https://schema.twindev.org/json-ld/JsonLdGraphObject",

	/**
	 * Represents JSON-LD Value Object.
	 */
	ValueObject: "https://schema.twindev.org/json-ld/JsonLdValueObject",

	/**
	 * Represents JSON-LD List Object.
	 */
	ListObject: "https://schema.twindev.org/json-ld/JsonLdListObject",

	/**
	 * Represents JSON-LD Set Object.
	 */
	SetObject: "https://schema.twindev.org/json-ld/JsonLdSetObject",

	/**
	 * Represents JSON-LD Language Map.
	 */
	LanguageMap: "https://schema.twindev.org/json-ld/JsonLdLanguageMap",

	/**
	 * Represents JSON-LD Index Map.
	 */
	IndexMap: "https://schema.twindev.org/json-ld/JsonLdIndexMap",

	/**
	 * Represents JSON-LD Index Map Item.
	 */
	IndexMapItem: "https://schema.twindev.org/json-ld/JsonLdIndexMapItem",

	/**
	 * Represents JSON-LD Id Map.
	 */
	IdMap: "https://schema.twindev.org/json-ld/JsonLdIdMap",

	/**
	 * Represents JSON-LD Type Map.
	 */
	TypeMap: "https://schema.twindev.org/json-ld/JsonLdTypeMap",

	/**
	 * Represents JSON-LD Included block.
	 */
	IncludedBlock: "https://schema.twindev.org/json-ld/JsonLdIncludedBlock",

	/**
	 * Represents JSON-LD Context Definition.
	 */
	ContextDefinition: "https://schema.twindev.org/json-ld/JsonLdContextDefinition",

	/**
	 * Represents JSON-LD Expanded Term Definition.
	 */
	ExpandedTermDefinition: "https://schema.twindev.org/json-ld/JsonLdExpandedTermDefinition",

	/**
	 * Represents JSON-LD Keyword.
	 */
	Keyword: "https://schema.twindev.org/json-ld/JsonLdKeyword",

	/**
	 * Represents JSON-LD List or Set Item.
	 */
	ListOrSetItem: "https://schema.twindev.org/json-ld/JsonLdListOrSetItem",

	/**
	 * Represents JSON-LD Container Type.
	 */
	ContainerType: "https://schema.twindev.org/json-ld/JsonLdContainerType",

	/**
	 * Represents JSON-LD Container Type Array.
	 */
	ContainerTypeArray: "https://schema.twindev.org/json-ld/JsonLdContainerTypeArray",

	/**
	 * Represents JSON-LD JSON Primitive.
	 */
	JsonPrimitive: "https://schema.twindev.org/json-ld/JsonLdJsonPrimitive",

	/**
	 * Represents JSON-LD JSON Array.
	 */
	JsonArray: "https://schema.twindev.org/json-ld/JsonLdJsonArray",

	/**
	 * Represents JSON-LD JSON Object.
	 */
	JsonObject: "https://schema.twindev.org/json-ld/JsonLdJsonObject",

	/**
	 * Represents JSON-LD JSON Value.
	 */
	JsonValue: "https://schema.twindev.org/json-ld/JsonLdJsonValue"
} as const;

/**
 * The types of JSON-LD data.
 */
export type JsonLdTypes = (typeof JsonLdTypes)[keyof typeof JsonLdTypes];
