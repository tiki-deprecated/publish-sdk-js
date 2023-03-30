/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface ReqGuard {
  ptr: string;
  usecases: Array<string>;
  destinations?: Array<string>;
  origin?: string;
}
