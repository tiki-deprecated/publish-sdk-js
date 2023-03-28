/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export {};

declare global {
  function ___TikiSdk__initialize(
    publishingId: string,
    id: string,
    keyGen: () => Promise<string>,
    origin?: string
  ): Promise<void>;

  function ___TikiSdk__title(
    ptr: string,
    tags?: Array<string>,
    description?: string,
    origin?: string
  ): Promise<TitleRecord>;

  function ___TikiSdk__license(
    ptr: string,
    uses: Array<LicenseUse>,
    terms: string,
    tags?: Array<string>,
    expiry?: Date,
    licenseDescription?: string,
    titleDescription?: string,
    origin?: string
  ): Promise<LicenseRecord>;

  function ___TikiSdk__getTitle(id: string): TitleRecord | undefined;

  function ___TikiSdk__getLicense(id: string): LicenseRecord | undefined;

  function ___TikiSdk__all(ptr: string, origin?: string): Array<LicenseRecord>;

  function ___TikiSdk__latest(
    ptr: string,
    origin?: string
  ): LicenseRecord | undefined;

  function ___TikiSdk__guard(
    ptr: string,
    usecases: Array<LicenseUsecase>,
    destinations?: Array<string>,
    onPass?: () => void,
    onFail?: () => void,
    origin?: string
  ): boolean;

  function ___TikiSdk__address(): string;

  function ___TikiSdk__id(): string;
}
