/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface TitleRecord {
  id: string;
  hashedPtr: string;
  origin?: string;
  tags: Array<string>;
  description?: string;
}
