// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IProperty } from "@gtsc/data-core";
import { FrameworkPropertyHelper } from "../../src/utils/frameworkPropertyHelper";

describe("FrameworkPropertyHelper", () => {
	test("Can set and get a urn property", () => {
		const properties: IProperty[] = [];
		FrameworkPropertyHelper.setUrn(properties, "a", "urn:a:b");

		expect(properties[0].value).toEqual("urn:a:b");

		const value = FrameworkPropertyHelper.getUrn(properties, "a");
		expect(value).toEqual("urn:a:b");
	});

	test("Can fail to set a urn property when the type is not a string", () => {
		const properties: IProperty[] = [];
		expect(() => FrameworkPropertyHelper.setUrn(properties, "a", 1 as unknown as string)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "value",
					value: 1
				}
			})
		);
	});

	test("Can set and get a timestamp milliseconds property", () => {
		const properties: IProperty[] = [];
		FrameworkPropertyHelper.setTimestampMilliseconds(properties, "a", 145876211123);

		expect(properties[0].value).toEqual(145876211123);

		const value = FrameworkPropertyHelper.getTimestampMilliseconds(properties, "a");
		expect(value).toEqual(145876211123);
	});

	test("Can fail to set a timestamp milliseconds property when the type is not a timestamp milliseconds", () => {
		const properties: IProperty[] = [];
		expect(() => FrameworkPropertyHelper.setTimestampMilliseconds(properties, "a", 1)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.timestampMilliseconds",
				properties: {
					property: "value",
					value: 1
				}
			})
		);
	});

	test("Can set and get a timestamp seconds property", () => {
		const properties: IProperty[] = [];
		FrameworkPropertyHelper.setTimestampSeconds(properties, "a", 145876211);

		expect(properties[0].value).toEqual(145876211);

		const value = FrameworkPropertyHelper.getTimestampSeconds(properties, "a");
		expect(value).toEqual(145876211);
	});

	test("Can fail to set a timestamp seconds property when the type is not a timestamp seconds", () => {
		const properties: IProperty[] = [];
		expect(() =>
			FrameworkPropertyHelper.setTimestampSeconds(properties, "a", 145876211123)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.timestampSeconds",
				properties: {
					property: "value",
					value: 145876211123
				}
			})
		);
	});
});
