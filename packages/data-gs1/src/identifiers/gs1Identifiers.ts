// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure, Urn, Validation } from "@gtsc/core";
import { IdentifierHandlerFactory } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
import { Gs1IdentifierTypes } from "./gs1IdTypes";
import type { IEPCClassUri } from "../models/epc/IEPCClassUri";

/**
 * Handle all identifier types for GS1.
 */
export class Gs1Identifiers {
	/**
	 * Identifier epc id namespace.
	 */
	public static NAMESPACE_EPC_ID = "epc:id";

	/**
	 * Identifier epc:id:gtin namespace.
	 */
	public static NAMESPACE_EPC_ID_GTIN = `${Gs1Identifiers.NAMESPACE_EPC_ID}:${Gs1IdentifierTypes.Gtin}`;

	/**
	 * Identifier epc:id:sgln namespace.
	 */
	public static NAMESPACE_EPC_ID_GLN = `${Gs1Identifiers.NAMESPACE_EPC_ID}:${Gs1IdentifierTypes.Gln}`;

	/**
	 * Identifier epc id namespace.
	 */
	public static NAMESPACE_EPC_CLASS = "epc:class";

	/**
	 * Register all the identifiers.
	 */
	public static registerIdentifiers(): void {
		IdentifierHandlerFactory.register(Gs1Identifiers.NAMESPACE_EPC_ID, () => ({
			namespace: Gs1Identifiers.NAMESPACE_EPC_ID,
			validate: (propertyName, value, failures): boolean =>
				Gs1Identifiers.validateEpcId(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(Gs1Identifiers.NAMESPACE_EPC_ID_GTIN, () => ({
			namespace: Gs1Identifiers.NAMESPACE_EPC_ID_GTIN,
			validate: (propertyName, value, failures): boolean =>
				Gs1Identifiers.validateEpcIdGtin(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(Gs1Identifiers.NAMESPACE_EPC_ID_GLN, () => ({
			namespace: Gs1Identifiers.NAMESPACE_EPC_ID_GLN,
			validate: (propertyName, value, failures): boolean =>
				Gs1Identifiers.validateEpcIdGln(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(Gs1Identifiers.NAMESPACE_EPC_CLASS, () => ({
			namespace: Gs1Identifiers.NAMESPACE_EPC_CLASS,
			validate: (propertyName, value, failures): boolean =>
				Gs1Identifiers.validateEpcClass(propertyName, value, failures)
		}));
	}

	/**
	 * Validate if the property is a valid epc.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static validateEpcId(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const urn = Urn.fromValidString(value);
			const specificParts = urn.namespaceSpecific().split(":");

			if (specificParts.length < 2) {
				failures.push({
					property: propertyName,
					reason: "validation.gs1IncorrectSegmentCount"
				});
			} else {
				const isValid = Validation.arrayOneOf(
					propertyName,
					specificParts[1],
					Object.values(Gs1IdentifierTypes),
					failures
				);

				if (isValid) {
					// eslint-disable-next-line default-case
					switch (specificParts[1]) {
						case Gs1IdentifierTypes.Gtin:
							Gs1Identifiers.validateEpcIdGtin(propertyName, urn, failures);
							break;
						case Gs1IdentifierTypes.Gln:
							Gs1Identifiers.validateEpcIdGln(propertyName, urn, failures);
							break;
					}
				}
			}
		}

		return is;
	}

	/**
	 * Validate if the property is a valid epc id gtin.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static validateEpcIdGtin(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const gtin = Gs1Identifiers.extractEpcIdGtin(value);

			if (Is.undefined(gtin)) {
				failures.push({
					property: propertyName,
					reason: "validation.gs1ValueIncorrect"
				});
				return false;
			}
		}

		return is;
	}

	/**
	 * Validate if the property is a valid epc id gln.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static validateEpcIdGln(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const gtin = Gs1Identifiers.extractEpcIdGln(value);

			if (Is.undefined(gtin)) {
				failures.push({
					property: propertyName,
					reason: "validation.gs1ValueIncorrect"
				});
				return false;
			}
		}

		return is;
	}

	/**
	 * Validate if the property is a valid epc class.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static validateEpcClass(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const extracted = Gs1Identifiers.extractEpcClassUri(value);

			if (Is.undefined(extracted)) {
				failures.push({
					property: propertyName,
					reason: "validation.gs1EpcClassIncorrect"
				});
				return false;
			}
		}

		return is;
	}

	/**
	 * Extract the EPC gtin from the URI.
	 * @param epc The uri to extract from.
	 * @returns The extracted data or undefined.
	 */
	public static extractEpcIdGtin(epc: string): string | undefined {
		const parts = /^urn:epc:id:sgtin:(\d+)\.(\d+)\.([\w!%'()*+,-.:;=]+)/.exec(epc);

		if (parts && parts.length >= 3 && parts[1].length + parts[2].length === 13) {
			return parts.slice(1).join(".");
		}
	}

	/**
	 * Extract the EPC gln from the URI.
	 * @param epc The uri to extract from.
	 * @returns The extracted data or undefined.
	 */
	public static extractEpcIdGln(epc: string): string | undefined {
		const parts = /^urn:epc:id:sgln:(\d+)\.(\d+)\.([\w!%'()*+,-.:;=]+)/.exec(epc);

		if (parts && parts.length >= 3 && parts[1].length + parts[2].length === 12) {
			return parts.slice(1).join(".");
		}
	}

	/**
	 * Extract The EPC Class from the URI.
	 * @param epc The uri to extract from.
	 * @returns The extracted data or undefined.
	 */
	public static extractEpcClassUri(epc: string): IEPCClassUri | undefined {
		const parts = /^urn:epc:class:lgtin:(\d+)\.(\d+)\.([\w!%'()*+,-.:;=]+)/.exec(epc);

		if (parts && parts.length === 4 && parts[1].length + parts[2].length === 13) {
			return {
				companyPrefix: parts[1],
				itemRefAndIndicator: parts[2],
				lot: parts[3]
			};
		}
	}
}
