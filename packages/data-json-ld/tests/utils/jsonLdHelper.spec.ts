// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IJsonLdDocument } from "../../src/models/IJsonLdDocument";
import { JsonLdHelper } from "../../src/utils/JsonLdHelper";
import { JsonLdProcessor } from "../../src/utils/jsonLdProcessor";

describe("JsonLdHelper", () => {
	beforeAll(() => {
		JsonLdProcessor.addRedirect(
			/https?:\/\/schema.org\/?/,
			"https://schema.org/docs/jsonldcontext.jsonld"
		);
	});

	test("Can extract a property from a document and don't remove it", async () => {
		const doc: IJsonLdDocument = {
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		};

		const val = JsonLdHelper.extractProperty(doc, ["@type"], false);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		});
	});

	test("Can extract a property from a document and remove it", async () => {
		const doc: IJsonLdDocument = {
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		};

		const val = JsonLdHelper.extractProperty(doc, ["@type"]);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			name: "Jane Doe"
		});
	});

	test("Can extract a property from a document and remove it with multiple matching properties", async () => {
		const doc: IJsonLdDocument = {
			"@context": "http://schema.org/",
			"@type": "Person",
			type: "Person",
			name: "Jane Doe"
		};

		const val = JsonLdHelper.extractProperty(doc, ["@type", "type"]);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			name: "Jane Doe"
		});
	});

	test("Can combine contexts when they are empty", async () => {
		const combined = await JsonLdHelper.combineContexts(undefined, undefined);
		expect(combined).toEqual(null);
	});

	test("Can combine contexts when first is empty", async () => {
		const combined = await JsonLdHelper.combineContexts("https://schema.twindev.org", undefined);
		expect(combined).toEqual("https://schema.twindev.org");
	});

	test("Can combine contexts when second is empty", async () => {
		const combined = await JsonLdHelper.combineContexts(undefined, "https://schema.twindev.org");
		expect(combined).toEqual("https://schema.twindev.org");
	});

	test("Can combine contexts when they both have values", async () => {
		const combined = await JsonLdHelper.combineContexts(
			"https://schema.twindev.org/framework/types.jsonld",
			"https://schema.org"
		);
		expect(combined).toEqual([
			"https://schema.twindev.org/framework/types.jsonld",
			"https://schema.org"
		]);
	});

	test("Can combine contexts when they both have complex values and remove duplicates", async () => {
		const combined = await JsonLdHelper.combineContexts(
			["https://schema.twindev.org/framework/types.jsonld", "https://schema.org"],
			["https://schema.twindev.org/framework/types.jsonld", "https://schema.org"]
		);
		expect(combined).toEqual([
			"https://schema.twindev.org/framework/types.jsonld",
			"https://schema.org"
		]);
	});

	test("Can combine contexts when they both have nested values and remove duplicates", async () => {
		const combined = await JsonLdHelper.combineContexts(
			["https://schema.twindev.org/framework/types.jsonld", { foo: "https://example.org/" }],
			[
				"https://schema.twindev.org/framework/types.jsonld",
				"https://schema.org",
				{ foo: "https://example.org/" }
			]
		);
		expect(combined).toEqual([
			"https://schema.twindev.org/framework/types.jsonld",
			{ foo: "https://example.org/" },
			"https://schema.org"
		]);
	});
});
