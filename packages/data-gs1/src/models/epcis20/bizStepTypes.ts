// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Supported EPCIS 2.0 bizStep.
 *
 * See EPCIS CVB specification for details.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BizStepTypes = {
	Accepting: "accepting",

	Arriving: "arriving",

	Assembling: "assembling",

	Collecting: "collecting",

	Commissioning: "commissioning",

	Consigning: "consigning",

	CreatingClassInstance: "creating_class_instance",

	CycleCounting: "cycle_counting",

	Decommissioning: "decommissioning",

	Departing: "departing",

	Destroying: "destroying",

	Disassembling: "disassembling",

	Dispensing: "dispensing",

	Encoding: "encoding",

	EnteringExiting: "entering_exiting",

	Holding: "holding",

	Inspecting: "inspecting",

	Installing: "installing",

	Killing: "killing",

	Loading: "loading",

	Other: "other",

	Packing: "packing",

	Picking: "picking",

	Receiving: "receiving",

	Removing: "removing",

	Repackaging: "repackaging",

	Repairing: "repairing",

	Replacing: "replacing",

	Reserving: "reserving",

	RetailSelling: "retail_selling",

	Shipping: "shipping",

	StagingOutbound: "staging_outbound",

	StockTaking: "stock_taking",

	Stocking: "stocking",

	Storing: "storing",

	Transporting: "transporting",

	Unloading: "unloading",

	Unpacking: "unpacking",

	VoidShipping: "void_shipping",

	SensorReporting: "sensor_reporting",

	Sampling: "sampling"
} as const;

/**
 * EPCIS 2.0 action types.
 */
export type BizStepTypes = (typeof BizStepTypes)[keyof typeof BizStepTypes];
