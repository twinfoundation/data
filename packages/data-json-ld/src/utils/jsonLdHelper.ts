// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { ArrayHelper, Is, type IValidationFailure } from "@twin.org/core";
import { DataTypeHelper, type ValidationMode } from "@twin.org/data-core";
import { JsonLdProcessor } from "jsonld";
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
	 * @param expand Whether the JSON-Ld document has to be expanded.
	 * @returns True if the document was valid.
	 */
	public static async validate<T extends IJsonLdDocument = IJsonLdDocument>(
		document: T,
		validationFailures: IValidationFailure[],
		validationMode?: ValidationMode,
		expand?: boolean
	): Promise<boolean> {
		if (Is.array<IJsonLdNodeObject>(document)) {
			// If the document is an array of nodes, validate each node
			for (const node of document) {
				await JsonLdHelper.validate(node, validationFailures, validationMode, expand);
			}
		} else if (Is.array<IJsonLdNodeObject>(document["@graph"])) {
			// If the graph is an array of nodes, validate each node
			for (const node of document["@graph"]) {
				await JsonLdHelper.validate(node, validationFailures, validationMode, expand);
			}
		} else if (Is.object<IJsonLdNodeObject>(document)) {
			const dataType = ArrayHelper.fromObjectOrArray(document["@type"])[0];
			// If JSON-LD has to be expanded the data type will be the expanded one
			if (expand) {
				// If the graph is a single node, then use the validate the node schema
				const expandedDoc = await JsonLdProcessor.expand(document);
				const expandedDataType = ArrayHelper.fromObjectOrArray(expandedDoc[0]["@type"]);
				if (Is.arrayValue(expandedDataType)) {
					await DataTypeHelper.validateWithExpandedType(
						"document",
						dataType,
						expandedDataType[0],
						document,
						validationFailures,
						validationMode
					);
				}
			} else if (Is.stringValue(dataType)) {
				await DataTypeHelper.validate(
					"document",
					dataType,
					document,
					validationFailures,
					validationMode
				);
			}
		}

		return validationFailures.length === 0;
	}
}
