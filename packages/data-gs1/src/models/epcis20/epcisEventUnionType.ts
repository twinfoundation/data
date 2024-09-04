// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAggregationEvent } from "./IAggregationEvent";
import type { IAssociationEvent } from "./IAssociationEvent";
import type { IObjectEvent } from "./IObjectEvent";

/**
 * The type that subsumes an EPCIS Event.
 */
export type EpcisEventUnionType = IObjectEvent | IAssociationEvent | IAggregationEvent;
