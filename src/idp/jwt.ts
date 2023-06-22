/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export interface JWT {
  accessToken: string;
  tokenType: string;
  expires: Date;
  refreshToken?: string;
  scope?: Array<string>;
}
