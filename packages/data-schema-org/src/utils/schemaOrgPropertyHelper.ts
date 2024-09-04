// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Guards, Is } from "@gtsc/core";
import { type IProperty, PropertyHelper } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
import { SchemaOrgDataTypes } from "../dataTypes/schemaOrgDataTypes";

/**
 * Class to help with properties for schema.org.
 */
export class SchemaOrgPropertyHelper extends PropertyHelper {
	/**
	 * Get some text from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getText<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): string | undefined {
		return PropertyHelper.getValue<string>(properties, key, SchemaOrgDataTypes.TYPE_TEXT);
	}

	/**
	 * Set some text in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setText<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: string | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.string(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<string, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_TEXT,
			value,
			additionalProperties
		);
	}

	/**
	 * Get an integer from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getInteger<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(properties, key, SchemaOrgDataTypes.TYPE_INTEGER);
	}

	/**
	 * Set an integer in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setInteger<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.integer(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_INTEGER,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a float from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getFloat<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(properties, key, SchemaOrgDataTypes.TYPE_FLOAT);
	}

	/**
	 * Set a float in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setFloat<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.number(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_FLOAT,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a boolean from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getBoolean<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): boolean | undefined {
		return PropertyHelper.getValue<boolean, U>(properties, key, SchemaOrgDataTypes.TYPE_BOOLEAN);
	}

	/**
	 * Set a boolean in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setBoolean<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: boolean | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.boolean(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<boolean, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_BOOLEAN,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a date time from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getDateTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): Date | undefined {
		return Coerce.dateTime(
			PropertyHelper.getValue<Date, U>(properties, key, SchemaOrgDataTypes.TYPE_DATE_TIME)
		);
	}

	/**
	 * Set a date time in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setDateTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: Date | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<string, U>(
			properties,
			key,
			SchemaOrgDataTypes.TYPE_DATE_TIME,
			value?.toISOString(),
			additionalProperties
		);
	}

	/**
	 * Get a date from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getDate<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): Date | undefined {
		return Coerce.date(
			PropertyHelper.getValue<string, U>(properties, key, SchemaOrgDataTypes.TYPE_DATE)
		);
	}

	/**
	 * Set a date in ISO format in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setDate<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: Date | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
			const dt = value.toISOString();
			const idx = dt.indexOf("T");
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_DATE,
				dt.slice(0, idx),
				additionalProperties
			);
		} else {
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_DATE,
				value,
				additionalProperties
			);
		}
	}

	/**
	 * Get a time from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): Date | undefined {
		const time = PropertyHelper.getValue<string, U>(properties, key, SchemaOrgDataTypes.TYPE_TIME);
		return Coerce.time(`1970-01-01T${time}Z`);
	}

	/**
	 * Set a time in standard format in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setTime<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: Date | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.date(nameof<PropertyHelper>(), nameof(value), value);
			const dt = value.toISOString();
			const idx = dt.indexOf("T");
			const idx2 = dt.indexOf("Z");
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_TIME,
				dt.slice(idx + 1, idx2),
				additionalProperties
			);
		} else {
			PropertyHelper.setValue<string, U>(
				properties,
				key,
				SchemaOrgDataTypes.TYPE_TIME,
				value,
				additionalProperties
			);
		}
	}
}
