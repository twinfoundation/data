// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property, EntitySchemaHelper, SortDirection } from "@twin.org/entity";
import type { IJsonSchema } from "../../src/models/IJsonSchema";
import { JsonSchemaHelper } from "../../src/utils/jsonSchemaHelper";

/**
 * Test entity.
 */
@entity({ description: "My Test Entity" })
export class TestEntity {
	@property({
		type: "number",
		optional: true,
		isPrimary: true,
		isSecondary: true,
		sortDirection: SortDirection.Ascending,
		examples: [1, 2, 3],
		description: "My Number Property"
	})
	public prop1!: number;

	@property({
		type: "string",
		examples: ["a", "b", "c"],
		description: "My String Property"
	})
	public prop2!: string;

	@property({
		type: "array",
		itemType: "string"
	})
	public prop3!: string[];

	@property({
		type: "array",
		itemType: "object",
		itemTypeRef: "Event"
	})
	public prop4!: unknown[];

	@property({
		type: "object",
		itemTypeRef: "Book"
	})
	public prop5!: unknown;
}

describe("JsonSchemaHelper", () => {
	test("Can fail to validate a string when value is not string", async () => {
		const schema: IJsonSchema = {
			type: "string"
		};

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.errors).toEqual([
			{
				absoluteKeywordLocation: "#/type",
				instanceLocation: "#",
				keyword: "https://json-schema.org/keyword/type",
				message: '"#" fails schema constraint #/type'
			}
		]);
	});

	test("Can validate a string", async () => {
		const schema: IJsonSchema = {
			type: "string"
		};

		const data = "Hello World";

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.errors).toBeUndefined();
	});

	test("Can fail to validate a number when value is not number", async () => {
		const schema: IJsonSchema = {
			type: "number"
		};

		const data = "123";

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.errors).toEqual([
			{
				absoluteKeywordLocation: "#/type",
				instanceLocation: "#",
				keyword: "https://json-schema.org/keyword/type",
				message: '"#" fails schema constraint #/type'
			}
		]);
	});

	test("Can validate a number", async () => {
		const schema: IJsonSchema = {
			type: "number"
		};

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.errors).toBeUndefined();
	});

	test("Can fail to validate a property", async () => {
		const schema: IJsonSchema = {
			type: "object",
			properties: {
				key: {
					type: "string"
				},
				type: {
					type: "string"
				},
				value: {}
			},
			required: ["key", "type", "value"]
		};

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(false);
		expect(validation.errors).toEqual([
			{
				absoluteKeywordLocation: "#/type",
				instanceLocation: "#",
				keyword: "https://json-schema.org/keyword/type",
				message: '"#" fails schema constraint #/type'
			}
		]);
	});

	test("Can validate a property", async () => {
		const schema: IJsonSchema = {
			type: "object",
			properties: {
				key: {
					type: "string"
				},
				type: {
					type: "string"
				},
				value: {}
			},
			required: ["key", "type", "value"]
		};

		const data = {
			key: "foo",
			type: "string",
			value: "aaa"
		};

		const validation = await JsonSchemaHelper.validate(schema, data);

		expect(validation.result).toEqual(true);
		expect(validation.errors).toBeUndefined();
	});

	test("Can fail to validate a property list", async () => {
		const schema: IJsonSchema = {
			type: "array",
			items: {
				$ref: "Property"
			}
		};

		const schemaProperty: IJsonSchema = {
			type: "object",
			properties: {
				key: {
					type: "string"
				},
				type: {
					type: "string"
				},
				value: {}
			},
			required: ["key", "type", "value"]
		};

		const data = 123;

		const validation = await JsonSchemaHelper.validate(schema, data, { Property: schemaProperty });

		expect(validation.result).toEqual(false);
		expect(validation.errors).toEqual([
			{
				absoluteKeywordLocation: "#/type",
				instanceLocation: "#",
				keyword: "https://json-schema.org/keyword/type",
				message: '"#" fails schema constraint #/type'
			}
		]);
	});

	test("Can validate a property list", async () => {
		const schema: IJsonSchema = {
			type: "array",
			items: {
				$ref: "Property"
			}
		};

		const schemaProperty: IJsonSchema = {
			type: "object",
			properties: {
				key: {
					type: "string"
				},
				type: {
					type: "string"
				},
				value: {}
			},
			required: ["key", "type", "value"]
		};

		const data = [
			{
				key: "foo",
				type: "string",
				value: "aaa"
			}
		];

		const validation = await JsonSchemaHelper.validate(schema, data, { Property: schemaProperty });

		expect(validation.result).toEqual(true);
		expect(validation.errors).toBeUndefined();
	});

	test("Can fail to get the type for a property when the property does not exist", async () => {
		const type = JsonSchemaHelper.getPropertyType(
			{
				type: "object",
				properties: {
					foo: {
						type: "string"
					}
				}
			},
			"goo"
		);

		expect(type).toBeUndefined();
	});

	test("Can get the type for a property when it is a type", async () => {
		const type = JsonSchemaHelper.getPropertyType(
			{
				type: "object",
				properties: {
					foo: {
						type: "string"
					}
				}
			},
			"foo"
		);

		expect(type).toEqual("string");
	});

	test("Can get the type for a property when it is a reference", async () => {
		const type = JsonSchemaHelper.getPropertyType(
			{
				type: "object",
				properties: {
					foo: {
						$ref: "https://example.com/foo"
					}
				}
			},
			"foo"
		);

		expect(type).toEqual("https://example.com/foo");
	});

	test("Can convert an entity schema to a JSON schema", () => {
		const jsonSchema = JsonSchemaHelper.entitySchemaToJsonSchema(
			EntitySchemaHelper.getSchema(TestEntity),
			"https://example.com/"
		);

		expect(jsonSchema.$schema).toEqual(JsonSchemaHelper.SCHEMA_VERSION);
		expect(jsonSchema.$id).toEqual("https://example.com/TestEntity");
		expect(jsonSchema.title).toEqual("TestEntity");
		expect(jsonSchema.type).toEqual("object");
		expect(jsonSchema.description).toEqual("My Test Entity");
		expect(jsonSchema.required).toEqual(["prop2", "prop3", "prop4", "prop5"]);
		expect(jsonSchema.properties?.prop1).toEqual({
			type: "number",
			description: "My Number Property",
			examples: [1, 2, 3]
		});
		expect(jsonSchema.properties?.prop2).toEqual({
			type: "string",
			description: "My String Property",
			examples: ["a", "b", "c"]
		});
		expect(jsonSchema.properties?.prop3).toEqual({
			type: "array",
			items: {
				type: "string"
			}
		});
		expect(jsonSchema.properties?.prop4).toEqual({
			type: "array",
			items: {
				$ref: "https://example.com/Event"
			}
		});
		expect(jsonSchema.properties?.prop5).toEqual({
			$ref: "https://example.com/Book"
		});
		expect(jsonSchema.additionalProperties).toEqual(false);
	});

	test("Can convert an entity schema to a JSON schema with no base domain", () => {
		const jsonSchema = JsonSchemaHelper.entitySchemaToJsonSchema(
			EntitySchemaHelper.getSchema(TestEntity)
		);

		expect(jsonSchema.$schema).toEqual(JsonSchemaHelper.SCHEMA_VERSION);
		expect(jsonSchema.$id).toEqual("TestEntity");
		expect(jsonSchema.title).toEqual("TestEntity");
		expect(jsonSchema.type).toEqual("object");
		expect(jsonSchema.description).toEqual("My Test Entity");
		expect(jsonSchema.required).toEqual(["prop2", "prop3", "prop4", "prop5"]);
		expect(jsonSchema.properties?.prop1).toEqual({
			type: "number",
			description: "My Number Property",
			examples: [1, 2, 3]
		});
		expect(jsonSchema.properties?.prop2).toEqual({
			type: "string",
			description: "My String Property",
			examples: ["a", "b", "c"]
		});
		expect(jsonSchema.properties?.prop3).toEqual({
			type: "array",
			items: {
				type: "string"
			}
		});
		expect(jsonSchema.properties?.prop4).toEqual({
			type: "array",
			items: {
				$ref: "Event"
			}
		});
		expect(jsonSchema.properties?.prop5).toEqual({
			$ref: "Book"
		});
		expect(jsonSchema.additionalProperties).toEqual(false);
	});
});
