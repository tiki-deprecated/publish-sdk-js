/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export const b64Encode = (bytes: Uint8Array): string =>
  btoa(bytes.reduce((acc, current) => acc + String.fromCharCode(current), ""));

export const b64Decode = (b64: string): Uint8Array =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
