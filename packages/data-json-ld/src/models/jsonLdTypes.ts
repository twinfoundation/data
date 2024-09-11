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
	Document: "https://schema.gtsc.io/json-ld/JsonLdDocument",

	/**
	 * Represents JSON-LD Node Object.
	 */
	NodeObject: "https://schema.gtsc.io/json-ld/JsonLdNodeObject",

	/**
	 * Represents JSON-LD Node Primitive.
	 */
	NodePrimitive: "https://schema.gtsc.io/json-ld/JsonLdNodePrimitive",

	/**
	 * Represents JSON-LD Graph Object.
	 */
	GraphObject: "https://schema.gtsc.io/json-ld/JsonLdGraphObject",

	/**
	 * Represents JSON-LD Value Object.
	 */
	ValueObject: "https://schema.gtsc.io/json-ld/JsonLdValueObject",

	/**
	 * Represents JSON-LD List Object.
	 */
	ListObject: "https://schema.gtsc.io/json-ld/JsonLdListObject",

	/**
	 * Represents JSON-LD Set Object.
	 */
	SetObject: "https://schema.gtsc.io/json-ld/JsonLdSetObject",

	/**
	 * Represents JSON-LD Language Map.
	 */
	LanguageMap: "https://schema.gtsc.io/json-ld/JsonLdLanguageMap",

	/**
	 * Represents JSON-LD Index Map.
	 */
	IndexMap: "https://schema.gtsc.io/json-ld/JsonLdIndexMap",

	/**
	 * Represents JSON-LD Index Map Item.
	 */
	IndexMapItem: "https://schema.gtsc.io/json-ld/JsonLdIndexMapItem",

	/**
	 * Represents JSON-LD Id Map.
	 */
	IdMap: "https://schema.gtsc.io/json-ld/JsonLdIdMap",

	/**
	 * Represents JSON-LD Type Map.
	 */
	TypeMap: "https://schema.gtsc.io/json-ld/JsonLdTypeMap",

	/**
	 * Represents JSON-LD Included block.
	 */
	IncludedBlock: "https://schema.gtsc.io/json-ld/JsonLdIncludedBlock",

	/**
	 * Represents JSON-LD Context Definition.
	 */
	ContextDefinition: "https://schema.gtsc.io/json-ld/JsonLdContextDefinition",

	/**
	 * Represents JSON-LD Expanded Term Definition.
	 */
	ExpandedTermDefinition: "https://schema.gtsc.io/json-ld/JsonLdExpandedTermDefinition",

	/**
	 * Represents JSON-LD Keyword.
	 */
	Keyword: "https://schema.gtsc.io/json-ld/JsonLdKeyword",

	/**
	 * Represents JSON-LD List or Set Item.
	 */
	ListOrSetItem: "https://schema.gtsc.io/json-ld/JsonLdListOrSetItem",

	/**
	 * Represents JSON-LD Container Type.
	 */
	ContainerType: "https://schema.gtsc.io/json-ld/JsonLdContainerType",

	/**
	 * Represents JSON-LD Container Type Array.
	 */
	ContainerTypeArray: "https://schema.gtsc.io/json-ld/JsonLdContainerTypeArray",

	/**
	 * Represents JSON-LD JSON Primitive.
	 */
	JsonPrimitive: "https://schema.gtsc.io/json-ld/JsonLdJsonPrimitive",

	/**
	 * Represents JSON-LD JSON Array.
	 */
	JsonArray: "https://schema.gtsc.io/json-ld/JsonLdJsonArray",

	/**
	 * Represents JSON-LD JSON Object.
	 */
	JsonObject: "https://schema.gtsc.io/json-ld/JsonLdJsonObject",

	/**
	 * Represents JSON-LD JSON Value.
	 */
	JsonValue: "https://schema.gtsc.io/json-ld/JsonLdJsonValue"
} as const;

/**
 * The types of JSON-LD data.
 */
export type JsonLdTypes = (typeof JsonLdTypes)[keyof typeof JsonLdTypes];
