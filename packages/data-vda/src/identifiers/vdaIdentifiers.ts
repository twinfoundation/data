// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, type IValidationFailure, Urn } from "@gtsc/core";
import { IdentifierHandlerFactory } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
import type { IVdaBizLocation } from "../models/IVdaBizLocation";
import type { IVdaObjectIdentifier } from "../models/IVdaObjectIdentifier";
import type { IVdaReadPoint } from "../models/IVdaReadPoint";
import type { IVdaUriPlates } from "../models/IVdaUriPlates";
import { VdaUriIdentifiers } from "../models/vdaUriIdentifiers";
import { VdaUriPackages } from "../models/vdaUriPackages";

/**
 * Handle all identifier types for VDA.
 */
export class VdaIdentifiers {
	/**
	 * Identifier Joint Automotive Industry Format namespace.
	 */
	public static NAMESPACE_JAIF_ID = "jaif:id";

	/**
	 * Specific extended namespace for location validation.
	 */
	public static NAMESPACE_JAIF_ID_LOCATION = "jaif:id@location";

	/**
	 * Specific extended namespace for item validation.
	 */
	public static NAMESPACE_JAIF_ID_ITEM = "jaif:id@item";

	/**
	 * Register all the identifiers.
	 */
	public static registerIdentifiers(): void {
		IdentifierHandlerFactory.register(VdaIdentifiers.NAMESPACE_JAIF_ID, () => ({
			namespace: VdaIdentifiers.NAMESPACE_JAIF_ID,
			validate: (propertyName, value, failures): boolean =>
				VdaIdentifiers.validateJaifId(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(VdaIdentifiers.NAMESPACE_JAIF_ID_LOCATION, () => ({
			namespace: VdaIdentifiers.NAMESPACE_JAIF_ID_LOCATION,
			validate: (propertyName, value, failures): boolean =>
				VdaIdentifiers.validateJaifIdLocation(propertyName, value, failures)
		}));

		IdentifierHandlerFactory.register(VdaIdentifiers.NAMESPACE_JAIF_ID_ITEM, () => ({
			namespace: VdaIdentifiers.NAMESPACE_JAIF_ID_ITEM,
			validate: (propertyName, value, failures): boolean =>
				VdaIdentifiers.validateJaifIdItem(propertyName, value, failures)
		}));
	}

	/**
	 * Validate if the property is a valid epc.
	 * @param propertyName The name of the property being validated.
	 * @param value The value to test.
	 * @param failures The list of failures to add to.
	 * @returns True if the value is valid epc.
	 */
	public static validateJaifId(
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
	public static validateJaifIdLocation(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (
			is &&
			Is.undefined(VdaIdentifiers.extractBizLocation(value)) &&
			Is.undefined(VdaIdentifiers.extractReadPoint(value))
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
	public static validateJaifIdItem(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (
			is &&
			Is.undefined(VdaIdentifiers.extractUriPlp(value)) &&
			Is.undefined(VdaIdentifiers.extractIdentifier(value))
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
	public static validateUriPlp(
		propertyName: string,
		value: unknown,
		failures: IValidationFailure[]
	): value is string {
		const is = Urn.validate(nameof(value), value, failures);

		if (is) {
			const plp = VdaIdentifiers.extractUriPlp(value);

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
