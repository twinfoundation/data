// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IValidationFailure } from "@gtsc/core";
import { Gs1Identifiers } from "../../src/identifiers/gs1Identifiers";

describe("Gs1Identifiers", () => {
	test("Test should successfully validate EPC Class URI", async () => {
		const epc = Gs1Identifiers.extractEpcClassUri("urn:epc:class:lgtin:4012345.012345.998877");
		expect(epc).toBeDefined();
		expect(epc?.companyPrefix).toEqual("4012345");
		expect(epc?.itemRefAndIndicator).toEqual("012345");
		expect(epc?.lot).toEqual("998877");
	});

	test("Test should successfully validate Transaction EPC", async () => {
		const failures: IValidationFailure[] = [];
		const result = Gs1Identifiers.validateEpcIdGtin(
			"id",
			"urn:epc:id:sgtin:0614141.012345.62852",
			failures
		);
		expect(result).toEqual(true);
		expect(failures.length).toEqual(0);
	});

	// test("Test should fail if EPC identifier type is unknown", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1Identifiers.validateEpcIdGtin(
	//         "id",
	//         "urn:unknown:unknown:unknown:0614141.12345.400",
	//         failures
	//     );
	//     expect(result).toEqual(false);
	//     expect(failures.length).toEqual(1);
	// });

	// test("Test should successfully validate Location EPC", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1Identifiers.validateEpcIdGln("id", "urn:epc:id:sgln:0614141.12345.400", failures);
	//     expect(result).toEqual(true);
	//     expect(failures.length).toEqual(0);
	// });

	// test("Test should fail if EPC identifier type is unknown", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1Identifiers.validateEpcIdGln("id", "urn:unknown:id:sgln:06141.12345.400", failures);
	//     expect(result).toEqual(false);
	//     expect(failures.length).toEqual(1);
	// });

	// test("Test should successfully validate GS1 item EPC", async () => {
	//     const failures: IValidationFailure[] = [];
	//     const result = Gs1Identifiers.validateEpcIdGtin("id", "urn:epc:id:sgtin:0614141.012345.62852", failures);
	//     expect(result).toEqual(true);
	//     expect(failures.length).toEqual(0);
	// });
});
