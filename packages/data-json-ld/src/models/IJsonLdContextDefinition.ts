// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable jsdoc/require-jsdoc */
import type { IJsonLdExpandedTermDefinition } from "./IJsonLdExpandedTermDefinition";

/**
 * This is a copy of the types from the npm jsonld package. This is necessary as the JSON schema generators
 * that are used in other packages cannot understand some of the types e.g. OrArray
 */

/**
 * A context definition defines a local context in a node object.
 * @see https://www.w3.org/TR/json-ld11/#context-definitions
 */
export interface IJsonLdContextDefinition {
	[key: string]:
		| null
		| string
		| IJsonLdExpandedTermDefinition
		| IJsonLdContextDefinition[keyof IJsonLdContextDefinition];

	"@base"?: string | null | undefined;
	"@direction"?: "ltr" | "rtl" | null | undefined;
	"@import"?: string | undefined;
	"@language"?: string | undefined;
	"@propagate"?: boolean | undefined;
	"@protected"?: boolean | undefined;
	"@type"?:
		| {
				"@container": "@set";
				"@protected"?: boolean | undefined;
		  }
		| undefined;
	"@version"?: "1.1" | undefined;
	"@vocab"?: string | null | undefined;
}
