// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper, Is, type IValidationFailure } from "@twin.org/core";
import { DataTypeHelper, type ValidationMode } from "@twin.org/data-core";
import { JsonLdProcessor } from "./jsonLdProcessor";
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
		document: T,
		validationFailures: IValidationFailure[],
		validationMode?: ValidationMode
	): Promise<boolean> {
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
			// Expand the document to ensure we have the full context for types
			// As the data types in the factories are not always fully qualified
			const expandedDoc = await JsonLdProcessor.expand(document);
			const expandedDataType = ArrayHelper.fromObjectOrArray(expandedDoc[0]["@type"]);
			if (Is.arrayValue(expandedDataType)) {
				await DataTypeHelper.validate(
					"document",
					expandedDataType[0],
					document,
					validationFailures,
					validationMode
				);
			}
		}

		return validationFailures.length === 0;
	}
}
