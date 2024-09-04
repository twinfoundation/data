// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEpcisEventDetails } from "./IEpcisEventDetails";
import type { IQuantity } from "./IQuantity";
import type { ISensorElement } from "./ISensorElement";

/**
 * Defines an EPCIS 2.0 Object Event.
 *
 */
export interface IObjectEvent extends IEpcisEventDetails {
	/**
	 * Fixed to ObjectEvent.
	 */
	type: "ObjectEvent";

	/**
	 * List of EPCs involved.
	 */
	epcList: string[];

	/**
	 * Quantity in case of class-level event visibility data.
	 */
	quantityList?: IQuantity[];

	/**
	 * Sensor element list.
	 */
	sensorElementList?: ISensorElement[];
}
