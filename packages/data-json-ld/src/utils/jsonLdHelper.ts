// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure } from "@gtsc/core";
import { DataTypeHelper } from "@gtsc/data-core";
import type { JsonLdDocument } from "../models/jsonLdDocument";
import type { NodeObject } from "../models/nodeObject";

/**
 * Class to help with JSON LD.
 */
export class JsonLdHelper {
	/**
	 * Validate a JSON LD document.
	 * @param propertyName The name of the property being validated to use in error messages.
	 * @param document The data to validate.
	 * @param validationFailures The list of validation failures to add to.
	 * @param validationMode The validation mode to use, defaults to either.
	 * @returns True if the data was valid.
	 */
	public static async validate<T extends JsonLdDocument = JsonLdDocument>(
		propertyName: string,
		document: T,
		validationFailures: IValidationFailure[],
		validationMode?: "validate" | "schema" | "either"
	): Promise<boolean> {
		if (Is.array<NodeObject>(document)) {
			// If the document is an array of nodes, validate each node
			for (const node of document) {
				await JsonLdHelper.validate(propertyName, node, validationFailures, validationMode);
			}
		} else if (Is.array<NodeObject>(document["@graph"])) {
			// If the graph is an array of nodes, validate each node
			for (const node of document["@graph"]) {
				await JsonLdHelper.validate(propertyName, node, validationFailures, validationMode);
			}
		} else if (Is.object<NodeObject>(document)) {
			// If the graph is a single node, then use the validate the node schema
			const dataType = document["@type"];
			if (Is.stringValue(dataType)) {
				await DataTypeHelper.validate(
					propertyName,
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
