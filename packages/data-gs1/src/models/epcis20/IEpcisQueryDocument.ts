// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILdContext } from "@gtsc/data-json-ld";
import type { IEpcisEvent } from "./IEpcisEvent";

/**
 * EPCIS Query Document.
 */
export interface IEpcisQueryDocument {
	/**
	 * The @context.
	 */
	"@context": ILdContext;

	/**
	 * The JSON-LD document id.
	 */
	id?: string;

	/**
	 * JSON-LD Type.
	 */
	type: string;

	/**
	 * Schema version.
	 */
	schemaVersion?: string;
	/**
	 * Creation Date.
	 */
	creationDate?: string;

	/**
	 * The EPCIS Body.
	 */
	epcisBody: {
		/**
		 * The results of the query.
		 */
		queryResults: {
			/**
			 * The concerned subscription.
			 */
			subscriptionID?: string;
			/**
			 * The concerned query.
			 */
			queryName: string;
			/**
			 * And now the results.
			 */
			resultsBody: {
				/**
				 * The list of events.
				 */
				eventList: IEpcisEvent[];
			};
		};
	};
}
