// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IVdaBizLocation } from "../../src/models/IVdaBizLocation";
import type { IVdaObjectIdentifier } from "../../src/models/IVdaObjectIdentifier";
import type { IVdaReadPoint } from "../../src/models/IVdaReadPoint";
import { VdaIdentifiersValidation } from "../../src/utils/vdaIdentifiersValidation";

describe("VdaIdentifiersValidation", () => {
	test("Test should successfully extract VDA Object Identifier", async () => {
		const vdaIdentifiers: IVdaObjectIdentifier | undefined =
			VdaIdentifiersValidation.extractIdentifier(
				"urn:jaif:id:obj:37SUN321456789A111222333AB+123456789012"
			);
		expect(vdaIdentifiers).toBeDefined();
		expect(vdaIdentifiers?.dataIdentifier).toEqual("37S");
		expect(vdaIdentifiers?.issuingAgencyCode).toEqual("UN");
		expect(vdaIdentifiers?.companyIdNumber).toEqual("321456789");
		expect(vdaIdentifiers?.partNumber).toEqual("A111222333AB");
		expect(vdaIdentifiers?.partSerialNumber).toEqual("123456789012");
	});

	test("Test should successfully extract VDA A1 Identifier", async () => {
		const vdaIdentifiers: IVdaObjectIdentifier | undefined =
			VdaIdentifiersValidation.extractIdentifier(
				"urn:jaif:id:A1:37SUN321456789A111222333AB+123456789012"
			);
		expect(vdaIdentifiers).toBeDefined();
		expect(vdaIdentifiers?.dataIdentifier).toEqual("37S");
		expect(vdaIdentifiers?.issuingAgencyCode).toEqual("UN");
		expect(vdaIdentifiers?.companyIdNumber).toEqual("321456789");
		expect(vdaIdentifiers?.partNumber).toEqual("A111222333AB");
		expect(vdaIdentifiers?.partSerialNumber).toEqual("123456789012");
	});

	test("Test should successfully extract RFID read point VDA URN", async () => {
		const readPoint: IVdaReadPoint | undefined = VdaIdentifiersValidation.extractReadPoint(
			"urn:jaif:id:obj:25SUN321456789211234022334455"
		);
		expect(readPoint).toBeDefined();
		expect(readPoint?.dataIdentifier).toEqual("25S");
		expect(readPoint?.issuingAgencyCode).toEqual("UN");
		expect(readPoint?.dunsNumber).toEqual("321456789");
		expect(readPoint?.plant).toEqual("21");
		expect(readPoint?.costCenter).toEqual("12340");
		expect(readPoint?.serialNumber).toEqual("22334455");
	});

	test("Test should fail to extract RFID read point VDA URN", async () => {
		const readPoint: IVdaReadPoint | undefined = VdaIdentifiersValidation.extractReadPoint(
			"urn:jaif:id:unknown:25SUN321456789211234022334455"
		);
		expect(readPoint).toBeUndefined();
	});

	test("Test should successfully extract Biz Location URN", async () => {
		const bizLocation: IVdaBizLocation | undefined = VdaIdentifiersValidation.extractBizLocation(
			"urn:jaif:id:obj:25LUN321456789INT32204"
		);
		expect(bizLocation).toBeDefined();
		expect(bizLocation?.dataIdentifier).toEqual("25L");
		expect(bizLocation?.issuingAgencyCode).toEqual("UN");
		expect(bizLocation?.dunsNumber).toEqual("321456789");
		expect(bizLocation?.plantBuildingFloorRoom).toEqual("INT32204");
	});

	test("Test should fail to extract Biz Location URN", async () => {
		const bizLocation: IVdaBizLocation | undefined = VdaIdentifiersValidation.extractBizLocation(
			"urn:jaif:id:unknown:25LUN321456789INT32204"
		);
		expect(bizLocation).toBeUndefined();
	});

	test("Test should fail if vda object identifier is invalid", async () => {
		const vdaIdentifiers: IVdaObjectIdentifier | undefined =
			VdaIdentifiersValidation.extractIdentifier(
				"urn:jaif:id:obj:37SUN321456789A111222333AB123456789012"
			);
		expect(vdaIdentifiers).toBeUndefined();
	});

	test("Test should successfully extract VDA URI Packages License Plates", async () => {
		const id = VdaIdentifiersValidation.extractUriPlp("urn:jaif:id:A2:1JUN499771473123456789");
		expect(id).toBeDefined();
		expect(id?.applicationFamilyIdentifier).toEqual("A2");
		expect(id?.typeOfPackage).toEqual("1J");
		expect(id?.issuingAgencyCode).toEqual("UN");
		expect(id?.companyIdentificationNumber).toEqual("499771473");
		expect(id?.packageSerialNumber).toEqual("123456789");
	});

	test("Test should fail if VDA URI Packages License Plates length is invalid", async () => {
		const id = VdaIdentifiersValidation.extractUriPlp("urn:jaif:id:A2:1JUN4997714732345789");
		expect(id).toBeUndefined();
	});

	test("Test should fail if VDA URI Packages License Plates application family identifier is invalid", async () => {
		const id = VdaIdentifiersValidation.extractUriPlp("urn:jaif:id:V2:1JUN499771473123456789");
		expect(id).toBeUndefined();
	});

	test("Test should fail if VDA URI Packages License Plates package type is invalid", async () => {
		const id = VdaIdentifiersValidation.extractUriPlp("urn:jaif:id:A2:1SUN499771473123456789");
		expect(id).toBeUndefined();
	});
});
