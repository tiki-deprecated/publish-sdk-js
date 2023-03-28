/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export {};
declare global {
  interface Window {
    ___TikiSdk__initialize: (
      publishingId: string,
      id: string,
      keyGen: () => Promise<string>,
      origin?: string
    ) => Promise<unknown>;
  }
}
