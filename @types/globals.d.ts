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

  function ___TikiSdk__address(): string;

  function ___TikiSdk__id(): string;

  function ___TikiSdk__isInitialized(): string;

  function ___TikiSdk__title(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiSdk__getTitle(json: string): string | undefined;

  function ___TikiSdk__getTitleById(json: string): string | undefined;

  function ___TikiSdk__license(
    json: string,
    onComplete?: (rsp: string) => void,
    onError?: (rsp: string) => void
  ): void;

  function ___TikiSdk__getLicenses(json: string): Array<string>;

  function ___TikiSdk__getLicense(json: string): string | undefined;

  function ___TikiSdk__getLicenseById(json: string): string | undefined;

  function ___TikiSdk__payable(
    json: string,
    onComplete?: (rsp: string) => void,
    onError?: (rsp: string) => void
  ): void;

  function ___TikiSdk__getPayables(json: string): Array<string>;

  function ___TikiSdk__getPayable(json: string): string | undefined;

  function ___TikiSdk__receipt(
    json: string,
    onComplete?: (rsp: string) => void,
    onError?: (rsp: string) => void
  ): void;

  function ___TikiSdk__getReceipts(json: string): Array<string>;

  function ___TikiSdk__getReceipt(json: string): string | undefined;

  function ___TikiSdk__guard(
    json: string,
    onPass?: () => void,
    onFail?: (rsp: string) => void
  ): string;
}
