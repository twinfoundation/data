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
	 * @param options Optional options for validation.
	 * @param options.failOnMissingType If true, will fail validation if the data type is missing, defaults to false.
	 * @param options.validationMode The validation mode to use, defaults to either.
	 * @returns True if the document was valid.
	 */
	public static async validate<T extends IJsonLdDocument = IJsonLdDocument>(
		document: T,
		validationFailures: IValidationFailure[],
		options?: {
			validationMode?: ValidationMode;
			failOnMissingType?: boolean;
		}
	): Promise<boolean> {
		if (Is.array<IJsonLdNodeObject>(document)) {
			// If the document is an array of nodes, validate each node
			for (const node of document) {
				await JsonLdHelper.validate(node, validationFailures, options);
			}
		} else if (Is.array<IJsonLdNodeObject>(document["@graph"])) {
			// If the graph is an array of nodes, validate each node
			for (const node of document["@graph"]) {
				await JsonLdHelper.validate(node, validationFailures, options);
			}
		} else if (Is.object<IJsonLdNodeObject>(document)) {
			// Expand the document to ensure we have the full context for types
			// As the data types in the factories are always fully qualified
			const expandedDocs = await JsonLdProcessor.expand(document);
			if (Is.arrayValue(expandedDocs)) {
				for (const expandedDoc of expandedDocs) {
					const expandedDataTypes = ArrayHelper.fromObjectOrArray(expandedDoc["@type"]);
					if (Is.arrayValue(expandedDataTypes)) {
						for (const expandedDataType of expandedDataTypes) {
							await DataTypeHelper.validate(
								"document",
								expandedDataType,
								document,
								validationFailures,
								options
							);
						}
					}
				}
			}
		}

		return validationFailures.length === 0;
	}
}
