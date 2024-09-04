// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Guards, Is, ObjectHelper } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IProperty } from "../models/IProperty";

/**
 * Class to help with properties.
 */
export class PropertyHelper {
	/**
	 * Get property with the specific key.
	 * @param properties The properties list to look in.
	 * @param key The key of the item to find.
	 * @param type Will only return the value if the type matches or is undefined.
	 * @returns The item if it was found.
	 */
	public static getValue<T, U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		type?: string
	): T | undefined {
		Guards.stringValue(nameof<PropertyHelper>(), nameof(key), key);
		if (Is.arrayValue(properties)) {
			const item = properties.find(p => p.key === key);

			if (Is.object<IProperty>(item) && (Is.undefined(type) || item.type === type)) {
				return item.value as T;
			}
		}
	}

	/**
	 * Set a property in to the list.
	 * @param properties The properties list to add to.
	 * @param key The key of the item to add.
	 * @param type The type of the item to add.
	 * @param value The value of the item to add.
	 * @param additionalProperties Additional properties to add to the item.
	 */
	public static setValue<T, U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string,
		type: string,
		value: T | undefined,
		additionalProperties?: { [key in Exclude<keyof U, "key" | "type" | "value">]?: unknown }
	): void {
		Guards.array(nameof<PropertyHelper>(), nameof(properties), properties);
		Guards.stringValue(nameof<PropertyHelper>(), nameof(key), key);
		Guards.stringValue(nameof<PropertyHelper>(), nameof(type), type);

		const isEmpty = Is.empty(value);

		const existingIndex = properties.findIndex(m => m.key === key);
		if (existingIndex >= 0) {
			if (isEmpty) {
				properties.splice(existingIndex, 1);
			} else {
				properties[existingIndex].value = value;

				if (Is.objectValue(additionalProperties)) {
					Object.assign(properties[existingIndex], additionalProperties);
				}
			}
		} else if (!isEmpty) {
			properties.push({
				key,
				type,
				value,
				...additionalProperties
			} as U);
		}
	}

	/**
	 * Remove property with the specific key.
	 * @param properties The properties list to look in.
	 * @param key The key of the item to remove.
	 */
	public static removeValue<U extends IProperty = IProperty>(
		properties: U[] | undefined,
		key: string
	): void {
		Guards.stringValue(nameof<PropertyHelper>(), nameof(key), key);
		if (Is.arrayValue(properties)) {
			const item = properties.findIndex(p => p.key === key);

			if (item >= 0) {
				properties.splice(item, 1);
			}
		}
	}

	/**
	 * Reduce the keys in the property list.
	 * @param properties The properties list to filter.
	 * @param includeKeys The keys to include.
	 * @returns The filtered list.
	 */
	public static filterInclude<U extends IProperty = IProperty>(
		properties?: U[],
		includeKeys?: string[]
	): U[] | undefined {
		if (Is.arrayValue(properties)) {
			return Is.array(includeKeys)
				? properties.filter(p => includeKeys.includes(p.key))
				: properties;
		}
	}

	/**
	 * Filter the keys from the properties.
	 * @param properties The properties list to filter.
	 * @param excludeKeys The keys to filter.
	 * @returns The filtered list.
	 */
	public static filterExclude<U extends IProperty = IProperty>(
		properties?: U[],
		excludeKeys?: string[]
	): U[] | undefined {
		if (Is.arrayValue(properties)) {
			return Is.array(excludeKeys)
				? properties.filter(p => !excludeKeys.includes(p.key))
				: properties;
		}
	}

	/**
	 * Merge two property lists.
	 * @param properties1 The current profile properties.
	 * @param properties2 The new properties to merge in to the first list.
	 * @returns The merged list.
	 */
	public static merge<U extends IProperty = IProperty>(properties1?: U[], properties2?: U[]): U[] {
		const listMerged = ObjectHelper.clone<U[]>(properties1 ?? []);

		if (Is.arrayValue(properties2)) {
			for (const prop of properties2) {
				const { key, type, value, ...additionalProperties } = prop;
				PropertyHelper.setValue(listMerged, key, type, value, additionalProperties);
			}
		}

		return listMerged;
	}
}
