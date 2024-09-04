// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Supported EPCIS 2.0 bizStep.
 *
 * See EPCIS CVB specification for details.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BizStepTypes = {
	ACCEPTING: "accepting",

	ARRIVING: "arriving",

	ASSEMBLING: "assembling",

	COLLECTING: "collecting",

	COMMISSIONING: "commissioning",

	CONSIGNING: "consigning",

	CREATING_CLASS_INSTANCE: "creating_class_instance",

	CYCLE_COUNTING: "cycle_counting",

	DECOMMISSIONING: "decommissioning",

	DEPARTING: "departing",

	DESTROYING: "destroying",

	DISASSEMBLING: "disassembling",

	DISPENSING: "dispensing",

	ENCODING: "encoding",

	ENTERING_EXITING: "entering_exiting",

	HOLDING: "holding",

	INSPECTING: "inspecting",

	INSTALLING: "installing",

	KILLING: "killing",

	LOADING: "loading",

	OTHER: "other",

	PACKING: "packing",

	PICKING: "picking",

	RECEIVING: "receiving",

	REMOVING: "removing",

	REPACKAGING: "repackaging",

	REPAIRING: "repairing",

	REPLACING: "replacing",

	RESERVING: "reserving",

	RETAIL_SELLING: "retail_selling",

	SHIPPING: "shipping",

	STAGING_OUTBOUND: "staging_outbound",

	STOCK_TAKING: "stock_taking",

	STOCKING: "stocking",

	STORING: "storing",

	TRANSPORTING: "transporting",

	UNLOADING: "unloading",

	UNPACKING: "unpacking",

	VOID_SHIPPING: "void_shipping",

	SENSOR_REPORTING: "sensor_reporting",

	SAMPLING: "sampling"
} as const;

/**
 * EPCIS 2.0 action types.
 */
export type BizStepTypes = (typeof BizStepTypes)[keyof typeof BizStepTypes];
