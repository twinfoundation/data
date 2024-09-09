// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure } from "@gtsc/core";
import { DataTypeHelper, type ValidationMode } from "@gtsc/data-core";
import type { IJsonLdDocument } from "../models/IJsonLdDocument";
import type { IJsonLdNodeObject } from "../models/IJsonLdNodeObject";

/**
 * Class to help with JSON LD.
 */
export class JsonLdHelper {
	/**
	 * Validate a JSON-LD document.
	 * @param document The JSON-LD document to validate.
	 * @param validationFailures The list of validation failures to add to.
	 * @param validationMode The validation mode to use, defaults to either.
	 * @returns True if the document was valid.
	 */
	public static async validate<T extends IJsonLdDocument = IJsonLdDocument>(
		document: T | undefined,
		validationFailures: IValidationFailure[],
		validationMode?: ValidationMode
	): Promise<boolean> {
		if (!Is.empty(document)) {
			if (Is.array<IJsonLdNodeObject>(document)) {
				// If the document is an array of nodes, validate each node
				for (const node of document) {
					await JsonLdHelper.validate(node, validationFailures, validationMode);
				}
			} else if (Is.array<IJsonLdNodeObject>(document["@graph"])) {
				// If the graph is an array of nodes, validate each node
				for (const node of document["@graph"]) {
					await JsonLdHelper.validate(node, validationFailures, validationMode);
				}
			} else if (Is.object<IJsonLdNodeObject>(document)) {
				// If the graph is a single node, then use the validate the node schema
				const dataType = document["@type"];
				if (Is.stringValue(dataType)) {
					await DataTypeHelper.validate(
						"document",
						dataType,
						document,
						validationFailures,
						validationMode
					);
				}
			}
		}

		return validationFailures.length === 0;
	}
}
