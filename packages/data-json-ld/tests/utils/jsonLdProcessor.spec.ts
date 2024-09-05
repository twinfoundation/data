// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { JsonLdDocument } from "jsonld";
import { JsonLdProcessor } from "../../src/utils/jsonLdProcessor";

describe("JsonLdProcessor", () => {
	beforeAll(() => {
		JsonLdProcessor.addRedirect(
			/https?:\/\/schema.org\/?/,
			"https://schema.org/docs/jsonldcontext.jsonld"
		);
	});

	test("Can expand a document", async () => {
		const doc: JsonLdDocument = {
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
		const doc: JsonLdDocument = {
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
			"@type": "http://schema.org/Person",
			"http://schema.org/jobTitle": "Professor",
			"http://schema.org/name": "Jane Doe",
			"http://schema.org/telephone": "(425) 123-4567",
			"http://schema.org/url": {
				"@id": "http://www.janedoe.com"
			}
		});
	});
});
