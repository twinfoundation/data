// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IProperty } from "@gtsc/data-core";
import { SchemaOrgPropertyHelper } from "../../src/utils/schemaOrgPropertyHelper";

describe("SchemaOrgPropertyHelper", () => {
	test("Can set and get a text property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setText(properties, "a", "b");

		expect(properties[0].value).toEqual("b");

		const value = SchemaOrgPropertyHelper.getText(properties, "a");
		expect(value).toEqual("b");
	});

	test("Can fail to set a text property when the type is not a string", () => {
		const properties: IProperty[] = [];
		expect(() => SchemaOrgPropertyHelper.setText(properties, "a", 1 as unknown as string)).toThrow(
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

	test("Can set and get an integer property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setInteger(properties, "a", 1);

		expect(properties[0].value).toEqual(1);

		const value = SchemaOrgPropertyHelper.getInteger(properties, "a");
		expect(value).toEqual(1);
	});

	test("Can fail to set a integer property when the type is not an integer", () => {
		const properties: IProperty[] = [];
		expect(() => SchemaOrgPropertyHelper.setInteger(properties, "a", 1.23)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.integer",
				properties: {
					property: "value",
					value: 1.23
				}
			})
		);
	});

	test("Can set and get a float property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setFloat(properties, "a", 1.23);

		expect(properties[0].value).toEqual(1.23);

		const value = SchemaOrgPropertyHelper.getFloat(properties, "a");
		expect(value).toEqual(1.23);
	});

	test("Can fail to set a float property when the type is not an float", () => {
		const properties: IProperty[] = [];
		expect(() =>
			SchemaOrgPropertyHelper.setFloat(properties, "a", "" as unknown as number)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.number",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a boolean property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setBoolean(properties, "a", true);

		expect(properties[0].value).toEqual(true);

		const value = SchemaOrgPropertyHelper.getBoolean(properties, "a");
		expect(value).toEqual(true);
	});

	test("Can fail to set a boolean property when the type is not an boolean", () => {
		const properties: IProperty[] = [];
		expect(() =>
			SchemaOrgPropertyHelper.setBoolean(properties, "a", "" as unknown as boolean)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.boolean",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a date time property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setDateTime(
			properties,
			"a",
			new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123))
		);

		expect(properties[0].value).toEqual("1974-08-16T09:10:11.123Z");

		const value = SchemaOrgPropertyHelper.getDateTime(properties, "a");
		expect(value?.getUTCFullYear()).toEqual(1974);
		expect(value?.getUTCMonth()).toEqual(7);
		expect(value?.getUTCDate()).toEqual(16);
		expect(value?.getUTCHours()).toEqual(9);
		expect(value?.getUTCMinutes()).toEqual(10);
		expect(value?.getUTCSeconds()).toEqual(11);
		expect(value?.getUTCMilliseconds()).toEqual(123);
	});

	test("Can fail to set a date time property when the type is not an date time", () => {
		const properties: IProperty[] = [];
		expect(() =>
			SchemaOrgPropertyHelper.setDateTime(properties, "a", "" as unknown as Date)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.date",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a date property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setDate(
			properties,
			"a",
			new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123))
		);

		expect(properties[0].value).toEqual("1974-08-16");

		const value = SchemaOrgPropertyHelper.getDate(properties, "a");
		expect(value?.getUTCFullYear()).toEqual(1974);
		expect(value?.getUTCMonth()).toEqual(7);
		expect(value?.getUTCDate()).toEqual(16);
		expect(value?.getUTCHours()).toEqual(0);
		expect(value?.getUTCMinutes()).toEqual(0);
		expect(value?.getUTCSeconds()).toEqual(0);
		expect(value?.getUTCMilliseconds()).toEqual(0);
	});

	test("Can set an empty date", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setDate(properties, "a", undefined);
		expect(properties.length).toEqual(0);
	});

	test("Can fail to set a date property when the type is not an date", () => {
		const properties: IProperty[] = [];
		expect(() =>
			SchemaOrgPropertyHelper.setDateTime(properties, "a", "" as unknown as Date)
		).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.date",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});

	test("Can set and get a time property", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setTime(
			properties,
			"a",
			new Date(Date.UTC(1974, 7, 16, 9, 10, 11, 123))
		);

		expect(properties[0].value).toEqual("09:10:11.123");

		const value = SchemaOrgPropertyHelper.getTime(properties, "a");

		expect(value?.getUTCFullYear()).toEqual(1970);
		expect(value?.getUTCMonth()).toEqual(0);
		expect(value?.getUTCDate()).toEqual(1);
		expect(value?.getUTCHours()).toEqual(9);
		expect(value?.getUTCMinutes()).toEqual(10);
		expect(value?.getUTCSeconds()).toEqual(11);
		expect(value?.getUTCMilliseconds()).toEqual(123);
	});

	test("Can set an empty time", () => {
		const properties: IProperty[] = [];
		SchemaOrgPropertyHelper.setTime(properties, "a", undefined);
		expect(properties.length).toEqual(0);
	});

	test("Can fail to set a time property when the type is not an date", () => {
		const properties: IProperty[] = [];
		expect(() => SchemaOrgPropertyHelper.setTime(properties, "a", "" as unknown as Date)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.date",
				properties: {
					property: "value",
					value: ""
				}
			})
		);
	});
});
