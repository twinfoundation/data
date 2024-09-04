// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ISensorMetadata } from "./ISensorMetadata";
import type { ISensorReport } from "./ISensorReport";

/**
 * EPCIS SensorElement.
 */
export interface ISensorElement {
	/**
	 * Sensor metadata.
	 */
	sensorMetadata?: ISensorMetadata;

	/**
	 * Sensor report.
	 */
	sensorReport: ISensorReport[];
}
