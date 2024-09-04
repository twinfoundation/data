// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/**
 * Interface for VDA URI plates.
 */
export interface IVdaUriPlates {
	/**
	 * Application family identifier A2 or A5.
	 */
	applicationFamilyIdentifier: string;

	/**
	 * The type of package 2. Alphanumeric characters.
	 */
	typeOfPackage: string;

	/**
	 * The issuing agency. 2 alphanumeric characters.
	 */
	issuingAgencyCode: string;

	/**
	 * The company identification number.
	 */
	companyIdentificationNumber: string;

	/**
	 * The serial number of the package.
	 */
	packageSerialNumber: string;
}
