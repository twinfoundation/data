// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@twin.org/core";
import type { IJsonLdDocument } from "../../src/models/IJsonLdDocument";
import { JsonLdHelper } from "../../src/utils/jsonLdHelper";
import { JsonLdProcessor } from "../../src/utils/jsonLdProcessor";

describe("JsonLdHelper", () => {
	beforeAll(() => {
		JsonLdProcessor.addRedirect(
			/https?:\/\/schema.org\/?/,
			"https://schema.org/docs/jsonldcontext.jsonld"
		);
	});

	test("Can validate a document", async () => {
		const doc: IJsonLdDocument = {
			"@context": "https://schema.org",
			"@type": "Person",
			name: "Jane Doe",
			jobTitle: "Professor",
			telephone: "(425) 123-4567",
			url: "http://www.janedoe.com"
		};

		const validationFailures: IValidationFailure[] = [];
		await JsonLdHelper.validate(doc, validationFailures);
		expect(validationFailures).toEqual([]);
	});

	test("Can validate a document with multiple types", async () => {
		const doc = {
			"@context": "https://www.w3.org/ns/activitystreams",
			type: "Add",
			actor: {
				id: "did:iota:testnet:0x123456"
			},
			object: {
				"@context": "https://vocabulary.uncefact.org/",
				type: "Document",
				globalId: "24KEP051219453I002610796"
			},
			updated: 123
		};

		const validationFailures: IValidationFailure[] = [];
		await JsonLdHelper.validate(doc, validationFailures);
		expect(validationFailures).toEqual([]);
	});
});
