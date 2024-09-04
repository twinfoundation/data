// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards, Is, Urn } from "@gtsc/core";
import { type IProperty, PropertyHelper } from "@gtsc/data-core";
import { nameof } from "@gtsc/nameof";
import { FrameworkDataTypes } from "../dataTypes/frameworkDataTypes";

/**
 * Class to help with properties for framework types.
 */
export class FrameworkPropertyHelper extends PropertyHelper {
	/**
	 * Get a urn from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getUrn<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): string | undefined {
		return PropertyHelper.getValue<string, U>(properties, key, FrameworkDataTypes.TYPE_URN);
	}

	/**
	 * Set a urn in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setUrn<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: string | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Urn.guard(nameof<PropertyHelper>(), "value", value);
		}
		PropertyHelper.setValue<string, U>(
			properties,
			key,
			FrameworkDataTypes.TYPE_URN,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a timestamp in milliseconds from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTimestampMilliseconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(
			properties,
			key,
			FrameworkDataTypes.TYPE_TIMESTAMP_MILLISECONDS
		);
	}

	/**
	 * Set a timestamp in milliseconds in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setTimestampMilliseconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.timestampMilliseconds(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			FrameworkDataTypes.TYPE_TIMESTAMP_MILLISECONDS,
			value,
			additionalProperties
		);
	}

	/**
	 * Get a timestamp in seconds from the list.
	 * @param properties The properties list to get from.
	 * @param key The key of the item to add.
	 * @returns The value if found.
	 */
	public static getTimestampSeconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): number | undefined {
		return PropertyHelper.getValue<number, U>(
			properties,
			key,
			FrameworkDataTypes.TYPE_TIMESTAMP_SECONDS
		);
	}

	/**
	 * Set a timestamp in seconds in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setTimestampSeconds<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		value: number | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		if (!Is.empty(value)) {
			Guards.timestampSeconds(nameof<PropertyHelper>(), nameof(value), value);
		}
		PropertyHelper.setValue<number, U>(
			properties,
			key,
			FrameworkDataTypes.TYPE_TIMESTAMP_SECONDS,
			value,
			additionalProperties
		);
	}
}
