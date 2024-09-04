// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * VDA URI Packages License Plates identifiers.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const VdaUriIdentifiers = {
	/**
	 * ISO 17367 Supply chain applications for RFID - Product tagging.
	 */
	RfidProductTagging: "A1",

	/**
	 * ISO 17365 Supply chain applications for RFID - Transport unit.
	 */
	RfidTransportUnit: "A2",

	/**
	 * ISO 17364 Supply chain applications for RFID - Returnable transport item.
	 */
	RfidReturnableTransportItem: "A3",

	/**
	 * ISO 17367 Supply chain applications for RFID - Product tagging (HazMat).
	 */
	RfidProductTaggingHazmat: "A4",

	/**
	 * ISO 17366 Supply chain applications for RFID - Product packaging.
	 */
	RfidProductPackaging: "A5",

	/**
	 * ISO 17366 Supply chain applications for RFID - Product packaging (HazMat).
	 */
	RfidProductPackagingHazmat: "A6",

	/**
	 * ISO 17365 Supply chain applications for RFID - Transport unit (HazMat).
	 */
	RfidTransportUnitHazmat: "A7",

	/**
	 * ISO 17364 Supply chain applications for RFID - Returnable transport item (Hazmat).
	 */
	RfidReturnableTransportItemHazmat: "A8",

	/**
	 * ISO 17363 Supply chain applications for RFID - Freight container.
	 */
	RfidFreightContainer: "A9",

	/**
	 * ISO 17363 Supply chain applications for RFID - Freight container (HazMat).
	 */
	RfidFreightContainerHazmat: "AA",

	/**
	 * Vehicle identified with the Vehicle Identification Number (VIN) as defined in ISO 3779.
	 */
	VehicleIdentificationNumber: "90"
} as const;

/**
 * VDA URI Packages License Plates identifiers.
 */
export type VdaUriIdentifiers = (typeof VdaUriIdentifiers)[keyof typeof VdaUriIdentifiers];
