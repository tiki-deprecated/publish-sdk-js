/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface ReqReceipt {
  payableId: string;
  amount: string;
  description?: string;
  reference?: string;
}
