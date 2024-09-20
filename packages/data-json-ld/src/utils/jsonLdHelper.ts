// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure, ObjectHelper } from "@twin.org/core";
import { DataTypeHelper, type ValidationMode } from "@twin.org/data-core";
import type {
	IJsonLdContextDefinitionRoot,
	IJsonLdDocument,
	IJsonLdNodeObject
} from "../models/IJsonLdDocument";

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

		return validationFailures.length === 0;
	}

	/**
	 * Extract a property from the JSON-LD.
	 * @param nodeObject The JSON-LD node object to extract from.
	 * @param propertyNames The possible names for the property.
	 * @param deleteProperty Delete the property from the object, defaults to true.
	 * @returns The properties if available.
	 */
	public static extractProperty<T>(
		nodeObject: IJsonLdNodeObject,
		propertyNames: string[],
		deleteProperty: boolean = true
	): T | undefined {
		let retVal: T | undefined;

		for (const prop of propertyNames) {
			retVal ??= nodeObject[prop] as T;
			if (deleteProperty) {
				delete nodeObject[prop];
			}
		}

		return retVal;
	}

	/**
	 * Combine contexts.
	 * @param context1 The first JSON-LD context to combine.
	 * @param context2 The second JSON-LD context to combine.
	 * @returns The combined context.
	 */
	public static async combineContexts(
		context1: IJsonLdContextDefinitionRoot | undefined,
		context2: IJsonLdContextDefinitionRoot | undefined
	): Promise<IJsonLdContextDefinitionRoot | undefined> {
		const combinedContext: IJsonLdContextDefinitionRoot = [];

		if (Is.string(context1)) {
			if (!combinedContext.includes(context1)) {
				combinedContext.push(context1);
			}
		} else if (Is.array(context1)) {
			for (const context of context1) {
				const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context));
				if (!hasMatch) {
					combinedContext.push(context);
				}
			}
		} else if (Is.object(context1)) {
			const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context1));
			if (!hasMatch) {
				combinedContext.push(context1);
			}
		}

		if (Is.string(context2)) {
			if (!combinedContext.includes(context2)) {
				combinedContext.push(context2);
			}
		} else if (Is.array(context2)) {
			for (const context of context2) {
				const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context));
				if (!hasMatch) {
					combinedContext.push(context);
				}
			}
		} else if (Is.object(context2)) {
			const hasMatch = combinedContext.some(c => ObjectHelper.equal(c, context2));
			if (!hasMatch) {
				combinedContext.push(context2);
			}
		}

		if (combinedContext.length === 0) {
			return null;
		}

		if (combinedContext.length === 1) {
			return combinedContext[0];
		}

		return combinedContext;
	}
}
