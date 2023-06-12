/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface RspPayable {
  id: string;
  license: RspLicense;
  amount: string;
  type: string;
  description?: string;
  expiry?: string;
  reference?: string;
}
