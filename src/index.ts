/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./core/core.dart.cjs";
import KeyGen from "./core/key-gen";

async function initialize(
  publishingId: string,
  id: string,
  origin?: string
): Promise<void> {
  await globalThis.___TikiSdk__initialize(publishingId, id, KeyGen, origin);
}

async function title(
  ptr: string,
  tags?: Array<string>,
  description?: string,
  origin?: string
): Promise<TitleRecord> {
  return globalThis.___TikiSdk__title(ptr, tags, description, origin);
}

export { initialize, title };
