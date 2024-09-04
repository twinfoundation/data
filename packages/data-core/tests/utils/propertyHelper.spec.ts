// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IProperty } from "../../src/models/IProperty";
import { PropertyHelper } from "../../src/utils/propertyHelper";

describe("PropertyHelper", () => {
	test("Get value can throw if no key", () => {
		expect(() => PropertyHelper.getValue(undefined, undefined as unknown as string)).toThrow(
			expect.objectContaining({
				name: "GuardError",
				message: "guard.string",
				properties: {
					property: "key",
					value: "undefined"
				}
			})
		);
	});

	test("Get value can return undefined if no properties", () => {
		const value = PropertyHelper.getValue(undefined, "a");
		expect(value).toBeUndefined();
	});

	test("Include filter can return nothing if no properties", () => {
		expect(PropertyHelper.filterInclude(undefined, undefined)).toBeUndefined();
	});

	test("Include filter can return all entries if no filters", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue<string>(properties, "a", "text", "b");
		const filtered = PropertyHelper.filterInclude(properties, undefined);
		expect(filtered?.length).toEqual(1);
	});

	test("Include filter can return reduced list if filtered", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue<string>(properties, "a", "text", "b");
		PropertyHelper.setValue<string>(properties, "c", "text", "d");
		const filtered = PropertyHelper.filterInclude(properties, ["c"]);
		expect(filtered?.length).toEqual(1);
		expect(filtered?.[0].key).toEqual("c");
	});

	test("Exclude filter can return nothing if no properties", () => {
		expect(PropertyHelper.filterExclude(undefined, undefined)).toBeUndefined();
	});

	test("Exclude filter can return all entries if no filters", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue<string>(properties, "a", "text", "b");
		const filtered = PropertyHelper.filterExclude(properties, undefined);
		expect(filtered?.length).toEqual(1);
	});

	test("Exclude filter can return reduced list if filtered", () => {
		const properties: IProperty[] = [];
		PropertyHelper.setValue<string>(properties, "a", "text", "b");
		PropertyHelper.setValue<string>(properties, "c", "text", "d");
		const filtered = PropertyHelper.filterExclude(properties, ["c"]);
		expect(filtered?.length).toEqual(1);
		expect(filtered?.[0].key).toEqual("a");
	});

	test("Can merge two property lists when the second is undefined", () => {
		const properties1: IProperty[] = [];
		PropertyHelper.setValue<string>(properties1, "a", "text", "b");
		PropertyHelper.setValue<string>(properties1, "c", "text", "d");

		const merged = PropertyHelper.merge(properties1, undefined as unknown as IProperty[]);

		expect(merged?.length).toEqual(2);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[1].key).toEqual("c");
	});

	test("Can merge two property lists when the first is undefined", () => {
		const properties2: IProperty[] = [];
		PropertyHelper.setValue<string>(properties2, "e", "text", "f");
		PropertyHelper.setValue<string>(properties2, "g", "text", "h");

		const merged = PropertyHelper.merge(undefined as unknown as IProperty[], properties2);

		expect(merged?.length).toEqual(2);
		expect(merged?.[0].key).toEqual("e");
		expect(merged?.[1].key).toEqual("g");
	});

	test("Can merge two property lists", () => {
		const properties1: IProperty[] = [];
		PropertyHelper.setValue<string>(properties1, "a", "text", "b");
		PropertyHelper.setValue<string>(properties1, "c", "text", "d");

		const properties2: IProperty[] = [];
		PropertyHelper.setValue<string>(properties2, "e", "text", "f");
		PropertyHelper.setValue<string>(properties2, "g", "text", "h");

		const merged = PropertyHelper.merge(properties1, properties2);

		expect(merged?.length).toEqual(4);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[1].key).toEqual("c");
		expect(merged?.[2].key).toEqual("e");
		expect(merged?.[3].key).toEqual("g");
	});

	test("Can merge two property lists with duplicate entries", () => {
		const properties1: IProperty[] = [];
		PropertyHelper.setValue<string>(properties1, "a", "text", "b");
		PropertyHelper.setValue<string>(properties1, "c", "text", "d");

		const properties2: IProperty[] = [];
		PropertyHelper.setValue<string>(properties2, "a", "text", "d");
		PropertyHelper.setValue<string>(properties2, "g", "text", "h");

		const merged = PropertyHelper.merge(properties1, properties2);

		expect(merged?.length).toEqual(3);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[0].value).toEqual("d");
		expect(merged?.[1].key).toEqual("c");
		expect(merged?.[2].key).toEqual("g");
	});

	test("Can create a custom type list", () => {
		/**
		 * Custom type.
		 */
		type CustomType = IProperty & { custom: string };

		const properties1: CustomType[] = [];
		PropertyHelper.setValue<string>(properties1, "a", "text", "b", { custom: "custom1" });
		PropertyHelper.setValue<string>(properties1, "c", "text", "d", { custom: "custom2" });

		const properties2: CustomType[] = [];
		PropertyHelper.setValue<string>(properties2, "a", "text", "d", { custom: "custom3" });
		PropertyHelper.setValue<string>(properties2, "g", "text", "h", { custom: "custom4" });

		const merged = PropertyHelper.merge(properties1, properties2);

		expect(merged?.length).toEqual(3);
		expect(merged?.[0].key).toEqual("a");
		expect(merged?.[0].value).toEqual("d");
		expect(merged?.[0].custom).toEqual("custom3");
		expect(merged?.[1].key).toEqual("c");
		expect(merged?.[1].custom).toEqual("custom2");
		expect(merged?.[2].key).toEqual("g");
		expect(merged?.[2].custom).toEqual("custom4");
	});
});
