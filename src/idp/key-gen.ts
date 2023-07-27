/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { b64Encode } from "./util";

export default async function (): Promise<string> {
  const crypto: SubtleCrypto = window.crypto.subtle;
  const keypair: CryptoKeyPair = await crypto.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );
  const pkcs8: ArrayBuffer = await crypto.exportKey(
    "pkcs8",
    keypair.privateKey
  );
  return b64Encode(new Uint8Array(pkcs8));
}
