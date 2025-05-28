// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { I18n, Validation, type IValidationFailure } from "@twin.org/core";
import { DataTypeHandlerFactory } from "../../src/factories/dataTypeHandlerFactory";
import { DataTypeHelper } from "../../src/utils/dataTypeHelper";

describe("DataTypeHelper", () => {
	beforeAll(async () => {
		I18n.addDictionary("en", await import("../../locales/en.json"));

		DataTypeHandlerFactory.register("test", () => ({
			context: "test",
			type: "test",
			defaultValue: "",
			jsonSchema: async () => ({
				type: "string"
			}),
			validate: async (propertyName, value, failures, container) =>
				Validation.string(propertyName, value, failures)
		}));
	});

	test("Can fail to validate a string with undefined value", async () => {
		const validationFailures: IValidationFailure[] = [];

		const validation = await DataTypeHelper.validate(
			"value",
			"test",
			undefined,
			validationFailures
		);

		expect(validation).toEqual(false);
		expect(validationFailures).toEqual([
			{
				property: "value",
				reason: "validation.beText",
				properties: {
					fieldName: "validation.defaultFieldName"
				}
			}
		]);
	});

	test("Can validate a string with value", async () => {
		const validationFailures: IValidationFailure[] = [];

		const validation = await DataTypeHelper.validate("value", "test", "", validationFailures);

		expect(validation).toEqual(true);
		expect(validationFailures).toEqual([]);
	});

	test("Can validate an object that has no validate method or schema", async () => {
		DataTypeHandlerFactory.register("test", () => ({
			context: "test",
			type: "test"
		}));
		const validationFailures: IValidationFailure[] = [];
		const validation = await DataTypeHelper.validate("value", "test", "", validationFailures);

		expect(validation).toEqual(true);
		expect(validationFailures).toEqual([]);
	});

	test("Can validate an object that has a validate method and no schema", async () => {
		DataTypeHandlerFactory.register("test", () => ({
			context: "test",
			type: "test",
			validate: async () => false
		}));
		const validationFailures: IValidationFailure[] = [];
		const validation = await DataTypeHelper.validate("value", "test", "", validationFailures);

		expect(validation).toEqual(false);
		expect(validationFailures).toEqual([]);
	});

	test("Can validate an object that has no validate method and a schema", async () => {
		DataTypeHandlerFactory.register("test", () => ({
			context: "test",
			type: "test",
			jsonSchema: async () => ({
				type: "string"
			})
		}));
		const validationFailures: IValidationFailure[] = [];
		const validation = await DataTypeHelper.validate("value", "test", "", validationFailures);

		expect(validation).toEqual(true);
		expect(validationFailures).toEqual([]);
	});

	test("Can fail to validate an object that has no validate method and a schema", async () => {
		DataTypeHandlerFactory.register("test", () => ({
			context: "test",
			type: "test",
			jsonSchema: async () => ({
				type: "string"
			})
		}));
		const validationFailures: IValidationFailure[] = [];
		const validation = await DataTypeHelper.validate("value", "test", 123, validationFailures);

		expect(validation).toEqual(false);
		expect(validationFailures).toEqual([
			{
				property: "value",
				reason: "validation.schema.failedValidation",
				properties: {
					value: 123,
					schemaErrors: [
						{
							instancePath: "",
							schemaPath: "#/type",
							keyword: "type",
							params: { type: "string" },
							message: "must be string"
						}
					],
					message: "must be string"
				}
			}
		]);
		expect(
			I18n.formatMessage(`error.${validationFailures[0].reason}`, validationFailures[0].properties)
		).toEqual("The JSON schema failed validation, must be string");
	});
});
