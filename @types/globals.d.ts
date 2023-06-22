/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export {};

declare global {
  function ___TikiTrail__address(): string;

  function ___TikiTrail__id(): string;

  function ___TikiTrail__title(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiTrail__getTitle(json: string): string | undefined;

  function ___TikiTrail__getTitleById(json: string): string | undefined;

  function ___TikiTrail__license(
    json: string,
    onComplete?: (rsp: string) => void,
    onError?: (rsp: string) => void
  ): void;

  function ___TikiTrail__getLicenses(json: string): Array<string>;

  function ___TikiTrail__getLicense(json: string): string | undefined;

  function ___TikiTrail__getLicenseById(json: string): string | undefined;

  function ___TikiTrail__payable(
    json: string,
    onComplete?: (rsp: string) => void,
    onError?: (rsp: string) => void
  ): void;

  function ___TikiTrail__getPayables(json: string): Array<string>;

  function ___TikiTrail__getPayable(json: string): string | undefined;

  function ___TikiTrail__receipt(
    json: string,
    onComplete?: (rsp: string) => void,
    onError?: (rsp: string) => void
  ): void;

  function ___TikiTrail__getReceipts(json: string): Array<string>;

  function ___TikiTrail__getReceipt(json: string): string | undefined;

  function ___TikiTrail__guard(
    json: string,
    onPass?: () => void,
    onFail?: (rsp: string) => void
  ): string;

  function ___TikiIdp__key(json: string, onComplete?: () => void): void;

  function ___TikiIdp__export(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiIdp__import(json: string, onComplete?: () => void): void;

  function ___TikiIdp__sign(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiIdp__verify(
    json: string,
    onComplete?: (rsp: string) => void
  ): void;

  function ___TikiIdp__token(onComplete?: (rsp: string) => void): void;

  function ___TikiWrapper__initialize(
    json: string,
    keyGen: () => Promise<string>,
    onComplete?: () => void
  ): void;

  function ___TikiWrapper__isInitialized(): string;
}
