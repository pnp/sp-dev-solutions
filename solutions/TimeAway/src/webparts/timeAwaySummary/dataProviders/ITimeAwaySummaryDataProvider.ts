// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {TimeAwaySummaryItem} from "../models/TimeAwaySummaryItem";
import {
    WeekType, Phase
} from '../../../libraries/index';

export interface ITimeAwaySummaryDataProvider {
  getTimeAwaySummaryList(weekType: WeekType, phase: Phase, statusFilter: boolean): Promise<TimeAwaySummaryItem[]>;
}
