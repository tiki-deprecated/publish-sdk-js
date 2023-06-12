/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface RspTitle {
  id: string;
  hashedPtr: string;
  tags: Array<string>;
  origin?: string;
  description?: string;
}
