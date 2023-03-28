/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default async function (): Promise<string> {
  const crypto: SubtleCrypto = window.crypto.subtle;
  const keypair: CryptoKeyPair = await crypto.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );
  const pkcs8: ArrayBuffer = await crypto.exportKey(
    "pkcs8",
    keypair.privateKey
  );
  return window.btoa(String.fromCharCode.apply(null, new Uint8Array(pkcs8)));
}
