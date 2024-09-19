// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure, Urn } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import type { IVdaBizLocation } from "../models/IVdaBizLocation";
import type { IVdaObjectIdentifier } from "../models/IVdaObjectIdentifier";
import type { IVdaReadPoint } from "../models/IVdaReadPoint";
import type { IVdaUriPlates } from "../models/IVdaUriPlates";
import { VdaUriIdentifiers } from "../models/vdaUriIdentifiers";
import { VdaUriPackages } from "../models/vdaUriPackages";

/**
 * Validation for identifier types for VDA.
 */
export class VdaIdentifiersValidation {
	/**
	 * Validate if the property is a valid epc.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static jaifId(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const urn = Urn.fromValidString(value);
			const specificParts = urn.namespaceSpecific().split(":");

			if (specificParts[0] !== "id") {
				failures.push({
					property: propertyName,
					reason: "validation.vdaEpcNoId"
				});
			} else if (specificParts.length < 2) {
				failures.push({
					property: propertyName,
					reason: "validation.vdaIncorrectSegmentCount"
				});
			}
		}

		return is;
	}

	/**
	 * Validate if the property is a valid epc vda id location.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static jaifIdLocation(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (
			is &&
			Is.undefined(VdaIdentifiersValidation.extractBizLocation(value)) &&
			Is.undefined(VdaIdentifiersValidation.extractReadPoint(value))
		) {
			failures.push({
				property: propertyName,
				reason: "validation.vdaValueIncorrect"
			});
			return false;
		}

		return is;
	}

	/**
	 * Validate if the property is a valid epc vda id item.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static jaifIdItem(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (
			is &&
			Is.undefined(VdaIdentifiersValidation.extractUriPlp(value)) &&
			Is.undefined(VdaIdentifiersValidation.extractIdentifier(value))
		) {
			failures.push({
				property: propertyName,
				reason: "validation.vdaValueIncorrect"
			});
			return false;
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
	public static uriPlp(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const plp = VdaIdentifiersValidation.extractUriPlp(value);

			if (Is.undefined(plp)) {
				failures.push({
					property: propertyName,
					reason: "validation.vdaValueIncorrect"
				});
				return false;
			}
		}

		return is;
	}

	/**
	 * Function to validate and extract RFID read points URNs.
	 * @param urn The URN to validate.
	 * @returns The extracted read point object or undefined.
	 */
	public static extractReadPoint(urn: string): IVdaReadPoint | undefined {
		const parts =
			/^urn:jaif:id:obj:([\dA-Za-z]{3})([\dA-Za-z]{2})(\d{9})([\dA-Za-z]{2})(\d{5})([\dA-Za-z]*)/.exec(
				urn
			);
		if (parts) {
			return {
				dataIdentifier: parts[1],
				issuingAgencyCode: parts[2],
				dunsNumber: parts[3],
				plant: parts[4],
				costCenter: parts[5],
				serialNumber: parts[6]
			};
		}
	}

	/**
	 * Function to validate and extract Biz Location URN.
	 * @param urn The URN to validate.
	 * @returns The extracted biz location object or undefined.
	 */
	public static extractBizLocation(urn: string): IVdaBizLocation | undefined {
		const parts = /^urn:jaif:id:obj:([\dA-Za-z]{3})([\dA-Za-z]{2})(\d{9})([\dA-Za-z]*)/.exec(urn);
		if (parts) {
			return {
				dataIdentifier: parts[1],
				issuingAgencyCode: parts[2],
				dunsNumber: parts[3],
				plantBuildingFloorRoom: parts[4]
			};
		}
	}

	/**
	 * Function to validate VDA URI Packages License Plates.
	 * @param id The VDA URI to validate.
	 * @returns The VDA URI object or undefined.
	 */
	public static extractUriPlp(id: string): IVdaUriPlates | undefined {
		const parts = /^urn:jaif:id:([\dA-Z]{2}):([\dA-Z]{2})([\dA-Z]{2})([\dA-Z]{9})(\d{9})/.exec(id);
		if (parts && parts.length === 6 && id.split(":")[4].length === 22) {
			const data = {
				applicationFamilyIdentifier: parts[1],
				typeOfPackage: parts[2],
				issuingAgencyCode: parts[3],
				companyIdentificationNumber: parts[4],
				packageSerialNumber: parts[5]
			};

			if (!Is.arrayOneOf(data.applicationFamilyIdentifier, Object.values(VdaUriIdentifiers))) {
				return;
			}

			if (!Is.arrayOneOf(data.typeOfPackage, Object.values(VdaUriPackages))) {
				return;
			}

			return data;
		}
	}

	/**
	 * VDA object identifier verifier function.
	 * @param epc The epc to validate.
	 * @returns The VDA object or undefined.
	 */
	public static extractIdentifier(epc: string): IVdaObjectIdentifier | undefined {
		if (
			(epc.startsWith("urn:jaif:id:obj:") || epc.startsWith("urn:jaif:id:A1:")) &&
			epc.length <= 56
		) {
			const split = epc.split(":");
			if (split.length === 5) {
				const parts = /([\dA-Z]{3})([\dA-Z]{2})(\d+){1,9}(([\dA-Z]+)\+([\dA-Z]+))/.exec(split[4]);
				if (parts && parts.length === 7) {
					return {
						dataIdentifier: parts[1],
						issuingAgencyCode: parts[2],
						companyIdNumber: parts[3],
						// skipped part[4] since it is a concatenation of part[5] + part[6]
						partNumber: parts[5],
						partSerialNumber: parts[6]
					};
				}
			}
		}
	}
}
