/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export {};

declare global {
  function ___TikiSdk__initialize(
    json: string,
    keyGen: () => Promise<string>,
    onComplete?: () => void
  ): void;

  function ___TikiSdk__title(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiSdk__license(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiSdk__getTitle(json: string): string | undefined;

  function ___TikiSdk__getLicense(json: string): string | undefined;

  function ___TikiSdk__all(json: string): Array<string>;

  function ___TikiSdk__latest(json: string): string | undefined;

  function ___TikiSdk__guard(
    json: string,
    onPass?: () => void,
    onFail?: (rsp: string) => void
  ): string;

  function ___TikiSdk__address(): string;

  function ___TikiSdk__id(): string;

  function ___TikiSdk__isInitialized(): string;
}
