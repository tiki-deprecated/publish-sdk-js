/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface LicenseRecord {
  id: string;
  title: TitleRecord;
  uses: Array<LicenseUse>;
  terms: string;
  description?: string;
  expiry?: Date;
}
