// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@twin.org/core";
import { Gs1IdentifiersValidation } from "../../src/utils/gs1IdentifiersValidation";

describe("Gs1IdentifiersValidation", () => {
	test("Test should successfully validate EPC Class URI", async () => {
		const epc = Gs1IdentifiersValidation.extractEpcClassUri(
			"urn:epc:class:lgtin:4012345.012345.998877"
		);
		expect(epc).toBeDefined();
		expect(epc?.companyPrefix).toEqual("4012345");
		expect(epc?.itemRefAndIndicator).toEqual("012345");
		expect(epc?.lot).toEqual("998877");
	});

	test("Test should successfully validate Transaction EPC", async () => {
		const failures: IValidationFailure[] = [];
		const result = Gs1IdentifiersValidation.epcIdGtin(
			"id",
			"urn:epc:id:sgtin:0614141.012345.62852",
			failures
		);
		expect(result).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	// test("Test should fail if EPC identifier type is unknown", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1IdentifiersValidation.epcIdGtin(
	//         "id",
	//         "urn:unknown:unknown:unknown:0614141.12345.400",
	//         failures
	//     );
	//     expect(result).toEqual(false);
	//     expect(failures.length).toEqual(1);
	// });

	// test("Test should successfully validate Location EPC", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1IdentifiersValidation.epcIdGln("id", "urn:epc:id:sgln:0614141.12345.400", failures);
	//     expect(result).toEqual(true);
	//     expect(failures.length).toEqual(0);
	// });

	// test("Test should fail if EPC identifier type is unknown", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1IdentifiersValidation.epcIdGln("id", "urn:unknown:id:sgln:06141.12345.400", failures);
	//     expect(result).toEqual(false);
	//     expect(failures.length).toEqual(1);
	// });

	// test("Test should successfully validate GS1 item EPC", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1IdentifiersValidation.epcIdGtin("id", "urn:epc:id:sgtin:0614141.012345.62852", failures);
	//     expect(result).toEqual(true);
	//     expect(failures.length).toEqual(0);
	// });
});
