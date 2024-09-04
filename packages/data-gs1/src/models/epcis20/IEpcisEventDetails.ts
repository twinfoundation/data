// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ActionTypes } from "./actionTypes";
import type { BizStepTypes } from "./bizStepTypes";
import type { DispositionTypes } from "./dispositionTypes";
import type { IBizTransaction } from "./IBizTransaction";
import type { IEpcisEvent } from "./IEpcisEvent";
import type { ISimpleLocation } from "./ISimpleLocation";

/**
 * EPCIS Event Details.
 */
export interface IEpcisEventDetails extends IEpcisEvent {
	/**
	 * Action: ADD, OBSERVE, DELETE.
	 */
	action: ActionTypes;

	/**
	 * The location of reading point.
	 */
	readPoint?: ISimpleLocation;

	/**
	 * The biz location where the item ends up.
	 */
	bizLocation?: ISimpleLocation;

	/**
	 * The business step as per EPCIS.
	 */
	bizStep?: BizStepTypes;

	/**
	 * The disposition as per EPCIS.
	 */
	disposition?: DispositionTypes;

	/**
	 * The list of related business transactions.
	 */
	bizTransactionList?: IBizTransaction[];
}
