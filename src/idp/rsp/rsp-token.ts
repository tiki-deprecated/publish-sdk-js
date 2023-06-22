/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface RspToken {
  accessToken: string;
  tokenType: string;
  expires: number;
  refreshToken?: string;
  scope: Array<string>;
}
