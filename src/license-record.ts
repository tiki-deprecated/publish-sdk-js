/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleRecord } from "./title-record";
import { LicenseUse } from "./license-use";

export interface LicenseRecord {
  id: string;
  title: TitleRecord;
  uses: Array<LicenseUse>;
  terms: string;
  description?: string;
  expiry?: Date;
}
