/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./main.dart.cjs";

async function initialize(): Promise<void> {
  await globalThis.___TikiSdk__initialize("", "");
}

export { initialize };
