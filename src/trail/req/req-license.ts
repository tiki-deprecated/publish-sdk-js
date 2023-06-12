/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface ReqLicense {
  titleId: string;
  uses: Array<ReqLicenseUse>;
  terms: string;
  expiry?: number;
  description?: string;
}
