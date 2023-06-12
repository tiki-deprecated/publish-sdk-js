/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface ReqPayable {
  licenseId: string;
  amount: string;
  type: string;
  expiry?: number;
  description?: string;
  reference?: string;
}
