/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface RspReceipt {
  id: string;
  payable: RspPayable;
  amount: string;
  description?: string;
  reference?: string;
}
