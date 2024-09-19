// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IJsonLdContextDefinition } from "@twin.org/data-json-ld";
import type { IDestination } from "./IDestination";
import type { ISource } from "./ISource";

/**
 * EPCIS Event.
 */
export interface IEpcisEvent {
	/**
	 * JSON-LD @context.
	 */
	"@context"?: IJsonLdContextDefinition;

	/**
	 * UUID of the event.
	 */
	id?: string;

	/**
	 * The id of the event. Marked here as optional as we usually won't store it on Tangle.
	 */
	eventID?: string;

	/**
	 * Type of Event.
	 */
	type: string;

	/**
	 * Timestamp in UTC.
	 */
	eventTime: string;

	/**
	 * Timezone offset. Useful if we want to represent timestamp in local timezone.
	 */
	eventTimeZoneOffset: string;

	/**
	 * When the event was recorded. It will be automatically generated.
	 */
	recordTime?: string;

	/**
	 * Source list. Semantics according to EPCIS standard.
	 */
	sourceList?: ISource[];

	/**
	 * Destination list. Semantics according to EPCIS standard.
	 */
	destinationList?: IDestination[];
}
