// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ILdContext } from "@gtsc/data-json-ld";
import type { IEpcisEvent } from "./IEpcisEvent";

/**
 * EPCIS Document.
 */
export interface IEpcisDocument {
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
	type: "EPCISDocument";

	/**
	 * The EPCIS Body.
	 */
	epcisBody: {
		/**
		 * The list of events.
		 */
		eventList: IEpcisEvent[];
	};
}
