/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface RspLicense {
  id: string;
  title: RspTitle;
  uses: Array<RspLicenseUse>;
  terms: string;
  description?: string;
  expiry?: number;
}
