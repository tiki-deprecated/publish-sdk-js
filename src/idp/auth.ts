/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { JWT } from "./jwt";
import { RspToken } from "./rsp/rsp-token";

export async function token(): Promise<JWT> {
  return new Promise((resolve, reject) => {
    try {
      globalThis.___TikiIdp__token((json) => {
        const rsp: RspToken = JSON.parse(json);
        resolve(_toJwt(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

function _toJwt(rsp: RspToken): JWT {
  return {
    accessToken: rsp.accessToken,
    tokenType: rsp.tokenType,
    expires: new Date(rsp.expires),
    refreshToken: rsp.refreshToken,
    scope: rsp.scope,
  };
}
