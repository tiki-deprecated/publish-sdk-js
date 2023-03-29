/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface TitleRecord {
  id: string;
  hashedPtr: string;
  origin?: string;
  tags: Array<string>;
  description?: string;
}
