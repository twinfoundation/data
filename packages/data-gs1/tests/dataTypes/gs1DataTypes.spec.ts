// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Gs1Is } from "../../src/utils/gs1Is";

describe("Gs1DataTypes", () => {
	test("Test should successfully validate 24 character Hexadecimal EPCs", async () => {
		const epc = Gs1Is.isEpcHex("3db918dc38bffda99587fdd1");
		expect(epc).toEqual(true);
	});

	// test("Test should successfully validate Digital link URL", async () => {
	//     const epc = EpcHelper.validateDigitalLinkUrls("http://id.gs1.org/8006/00000");
	//     expect(epc).toEqual("http://id.gs1.org/8006/00000");
	// });

	// test("Test should return undefined if fails validate invalid Digital link URL", async () => {
	//     const epc = EpcHelper.validateDigitalLinkUrls("http://id.gs1.org/0000/00000");
	//     expect(epc).toBeUndefined();
	// });
});
