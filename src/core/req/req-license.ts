/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface ReqLicense {
  ptr: string;
  uses: Array<ReqLicenseUse>;
  terms: string;
  tags: Array<string>;
  expiry?: number;
  licenseDescription?: string;
  titleDescription?: string;
  origin?: string;
}
