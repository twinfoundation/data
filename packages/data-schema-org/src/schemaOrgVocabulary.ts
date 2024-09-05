// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Schema.org vocabulary.
 */
export abstract class SchemaOrgVocabulary {
	/**
	 * Schema.org LD Context URL.
	 */
	public static SCHEMA_ORG_CONTEXT_URI = "https://schema.org";

	/**
	 * Schema.org JSON-LD redirect.
	 */
	public static SCHEMA_ORG_JSON_LD_REDIRECT = /https?:\/\/schema.org\/?/;

	/**
	 * Schema.org JSON LD Context.
	 */
	public static SCHEMA_ORG_JSON_LD_CONTEXT = "https://schema.org/docs/jsonldcontext.jsonld";
}
