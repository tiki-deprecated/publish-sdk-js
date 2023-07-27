/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ReqKey } from "./req/req-key";
import { ReqExport } from "./req/req-export";
import { RspExport } from "./rsp/rsp-export";
import { ReqImport } from "./req/req-import";
import { ReqSign } from "./req/req-sign";
import { RspSign } from "./rsp/rsp-sign";
import { ReqVerify } from "./req/req-verify";
import { RspVerify } from "./rsp/rsp-verify";
import { b64Decode, b64Encode } from "./util";

export const create = (keyId: string, overwrite?: boolean): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      const req: ReqKey = {
        keyId: keyId,
        overwrite: overwrite,
      };
      globalThis.___TikiIdp__key(JSON.stringify(req), () => {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });

export const get = (keyId: string, publik?: boolean): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const req: ReqExport = {
        keyId: keyId,
        public: publik,
      };
      globalThis.___TikiIdp__export(JSON.stringify(req), (json) => {
        const rsp: RspExport = JSON.parse(json);
        resolve(rsp.key);
      });
    } catch (e) {
      reject(e);
    }
  });

export const add = (
  keyId: string,
  key: string,
  publik?: boolean
): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      const req: ReqImport = {
        keyId: keyId,
        key: key,
        public: publik,
      };
      globalThis.___TikiIdp__import(JSON.stringify(req), () => {
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });

export const sign = (keyId: string, message: Uint8Array): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    try {
      const req: ReqSign = {
        keyId: keyId,
        message: b64Encode(message),
      };
      globalThis.___TikiIdp__sign(JSON.stringify(req), (json) => {
        const rsp: RspSign = JSON.parse(json);
        resolve(b64Decode(rsp.signature));
      });
    } catch (e) {
      reject(e);
    }
  });

export const verify = (
  keyId: string,
  message: Uint8Array,
  signature: Uint8Array
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    try {
      const req: ReqVerify = {
        keyId: keyId,
        message: b64Encode(message),
        signature: b64Encode(signature),
      };
      globalThis.___TikiIdp__verify(JSON.stringify(req), (json) => {
        const rsp: RspVerify = JSON.parse(json);
        resolve(rsp.isVerified);
      });
    } catch (e) {
      reject(e);
    }
  });
