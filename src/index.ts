/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./main.dart.cjs";
import KeyGen from "./key-gen";

async function initialize(): Promise<void> {
  await globalThis.___TikiSdk__initialize(
    "f3dbd181-1273-4be7-8a56-a9d258feccda",
    "19532a12-7ad8-4c41-8792-1d3bc04d49e5",
    KeyGen
  );
}

export { initialize };
