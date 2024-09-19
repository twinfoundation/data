// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { Is, type IValidationFailure, Urn, Validation } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import type { IEPCClassUri } from "../models/epc/IEPCClassUri";
import { Gs1IdTypes } from "../models/gs1/gs1IdTypes";

/**
 * Validation for GS1 identifiers.
 */
export class Gs1IdentifiersValidation {
	/**
	 * Validate if the property is a valid epc.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static epcId(
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
					Object.values(Gs1IdTypes),
					failures
				);

				if (isValid) {
					// eslint-disable-next-line default-case
					switch (specificParts[1]) {
						case Gs1IdTypes.Gtin:
							Gs1IdentifiersValidation.epcIdGtin(propertyName, urn, failures);
							break;
						case Gs1IdTypes.Gln:
							Gs1IdentifiersValidation.epcIdGln(propertyName, urn, failures);
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
	public static epcIdGtin(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const gtin = Gs1IdentifiersValidation.extractEpcIdGtin(value);

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
	public static epcIdGln(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const gtin = Gs1IdentifiersValidation.extractEpcIdGln(value);

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
	public static epcClass(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const extracted = Gs1IdentifiersValidation.extractEpcClassUri(value);

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
