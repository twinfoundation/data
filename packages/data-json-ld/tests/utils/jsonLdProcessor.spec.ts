// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IJsonLdDocument } from "../../src/models/IJsonLdDocument";
import { JsonLdProcessor } from "../../src/utils/jsonLdProcessor";

describe("JsonLdProcessor", () => {
	beforeAll(() => {
		JsonLdProcessor.addRedirect(
			/https?:\/\/schema.org\/?/,
			"https://schema.org/docs/jsonldcontext.jsonld"
		);
	});

	test("Can expand a document", async () => {
		const doc: IJsonLdDocument = {
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe",
			jobTitle: "Professor",
			telephone: "(425) 123-4567",
			url: "http://www.janedoe.com"
		};

		const expanded = await JsonLdProcessor.expand(doc);
		expect(expanded).toEqual([
			{
				"@type": ["http://schema.org/Person"],
				"http://schema.org/jobTitle": [
					{
						"@value": "Professor"
					}
				],
				"http://schema.org/name": [
					{
						"@value": "Jane Doe"
					}
				],
				"http://schema.org/telephone": [
					{
						"@value": "(425) 123-4567"
					}
				],
				"http://schema.org/url": [
					{
						"@id": "http://www.janedoe.com"
					}
				]
			}
		]);
	});

	test("Can compact a document", async () => {
		const doc: IJsonLdDocument = {
			"@type": ["http://schema.org/Person"],
			"http://schema.org/jobTitle": [
				{
					"@value": "Professor"
				}
			],
			"http://schema.org/name": [
				{
					"@value": "Jane Doe"
				}
			],
			"http://schema.org/telephone": [
				{
					"@value": "(425) 123-4567"
				}
			],
			"http://schema.org/url": [
				{
					"@id": "http://www.janedoe.com"
				}
			]
		};
		const compacted = await JsonLdProcessor.compact(doc, {
			"@context": "http://schema.org/"
		});
		expect(compacted).toEqual({
			"@context": "http://schema.org/",
			type: "Person",
			jobTitle: "Professor",
			name: "Jane Doe",
			telephone: "(425) 123-4567",
			url: "http://www.janedoe.com"
		});
	});

	test("Can compact a document without providing a context", async () => {
		const doc: IJsonLdDocument = {
			"@context": "http://schema.org/",
			"@type": ["http://schema.org/Person"],
			"http://schema.org/jobTitle": [
				{
					"@value": "Professor"
				}
			],
			"http://schema.org/name": [
				{
					"@value": "Jane Doe"
				}
			],
			"http://schema.org/telephone": [
				{
					"@value": "(425) 123-4567"
				}
			],
			"http://schema.org/url": [
				{
					"@id": "http://www.janedoe.com"
				}
			]
		};
		const compacted = await JsonLdProcessor.compact(doc);
		expect(compacted).toEqual({
			"@context": "http://schema.org/",
			type: "Person",
			jobTitle: "Professor",
			name: "Jane Doe",
			telephone: "(425) 123-4567",
			url: "http://www.janedoe.com"
		});
	});

	test("Can extract a property from a document and don't remove it", async () => {
		const doc: IJsonLdDocument = {
			"@context": "http://schema.org/",
			"@type": "Person",
			name: "Jane Doe"
		};

		const val = JsonLdProcessor.extractProperty(doc, ["@type"], false);
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

		const val = JsonLdProcessor.extractProperty(doc, ["@type"]);
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

		const val = JsonLdProcessor.extractProperty(doc, ["@type", "type"]);
		expect(val).toEqual("Person");
		expect(doc).toEqual({
			"@context": "http://schema.org/",
			name: "Jane Doe"
		});
	});

	test("Can combine contexts when they are empty", async () => {
		const combined = JsonLdProcessor.combineContexts(undefined, undefined);
		expect(combined).toEqual(null);
	});

	test("Can combine contexts when first is empty", async () => {
		const combined = JsonLdProcessor.combineContexts("https://schema.twindev.org", undefined);
		expect(combined).toEqual("https://schema.twindev.org");
	});

	test("Can combine contexts when second is empty", async () => {
		const combined = JsonLdProcessor.combineContexts(undefined, "https://schema.twindev.org");
		expect(combined).toEqual("https://schema.twindev.org");
	});

	test("Can combine contexts when they both have values", async () => {
		const combined = JsonLdProcessor.combineContexts(
			"https://schema.twindev.org/framework/types.jsonld",
			"https://schema.org"
		);
		expect(combined).toEqual([
			"https://schema.twindev.org/framework/types.jsonld",
			"https://schema.org"
		]);
	});

	test("Can combine contexts when they both have complex values and remove duplicates", async () => {
		const combined = JsonLdProcessor.combineContexts(
			["https://schema.twindev.org/framework/types.jsonld", "https://schema.org"],
			["https://schema.twindev.org/framework/types.jsonld", "https://schema.org"]
		);
		expect(combined).toEqual([
			"https://schema.twindev.org/framework/types.jsonld",
			"https://schema.org"
		]);
	});

	test("Can combine contexts when they both have nested values and remove duplicates", async () => {
		const combined = JsonLdProcessor.combineContexts(
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

	test("Can remove contexts when they don't exist", async () => {
		const removed = JsonLdProcessor.removeContexts(
			["https://schema.twindev.org/framework/types.jsonld", { foo: "https://example.org/" }],
			["https://aaa"]
		);
		expect(removed).toEqual([
			"https://schema.twindev.org/framework/types.jsonld",
			{ foo: "https://example.org/" }
		]);
	});

	test("Can remove contexts when they exist as string", async () => {
		const removed = JsonLdProcessor.removeContexts(
			"https://schema.twindev.org/framework/types.jsonld",
			["https://schema.twindev.org/framework/types.jsonld"]
		);
		expect(removed).toEqual(undefined);
	});

	test("Can remove contexts when they exist as object", async () => {
		const removed = JsonLdProcessor.removeContexts({ foo: "https://example.org/" }, [
			{ foo: "https://example.org/" }
		]);
		expect(removed).toEqual(undefined);
	});

	test("Can remove contexts when they exist as string", async () => {
		const removed = JsonLdProcessor.removeContexts(
			["https://schema.twindev.org/framework/types.jsonld"],
			["https://schema.twindev.org/framework/types.jsonld"]
		);
		expect(removed).toEqual(undefined);
	});

	test("Can remove contexts when they exist as string and leave remaining", async () => {
		const removed = JsonLdProcessor.removeContexts(
			[
				"https://schema.twindev.org/framework/types.jsonld",
				"https://schema.twindev.org/ais/types.jsonld"
			],
			["https://schema.twindev.org/framework/types.jsonld"]
		);
		expect(removed).toEqual("https://schema.twindev.org/ais/types.jsonld");
	});

	test("Can remove contexts when they exist as object", async () => {
		const removed = JsonLdProcessor.removeContexts(
			[{ foo: "https://example.org/" }],
			[{ foo: "https://example.org/" }]
		);
		expect(removed).toEqual(undefined);
	});

	test("Can remove contexts when they exist as object and leave remaining", async () => {
		const removed = JsonLdProcessor.removeContexts(
			[{ foo: "https://example.org/" }, "https://schema.twindev.org/ais/types.jsonld"],
			[{ foo: "https://example.org/" }]
		);
		expect(removed).toEqual("https://schema.twindev.org/ais/types.jsonld");
	});
});
