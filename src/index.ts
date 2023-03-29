/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./core/core.dart.cjs";
import KeyGen from "./core/key-gen";

export {
  initialize,
  title,
  license,
  getTitle,
  getLicense,
  id,
  all,
  guard,
  latest,
  address,
};

const initialize = async (
  publishingId: string,
  id: string,
  origin?: string
): Promise<void> =>
  await globalThis.___TikiSdk__initialize(publishingId, id, KeyGen, origin);

const title = async (
  ptr: string,
  tags?: Array<string>,
  description?: string,
  origin?: string
): Promise<TitleRecord> =>
  globalThis.___TikiSdk__title(ptr, tags, description, origin);

const license = async (
  ptr: string,
  uses: Array<LicenseUse>,
  terms: string,
  tags?: Array<string>,
  expiry?: Date,
  licenseDescription?: string,
  titleDescription?: string,
  origin?: string
): Promise<LicenseRecord> =>
  globalThis.___TikiSdk__license(
    ptr,
    uses,
    terms,
    tags,
    expiry,
    licenseDescription,
    titleDescription,
    origin
  );

const getTitle = (id: string): TitleRecord | undefined =>
  globalThis.___TikiSdk__getTitle(id);

const getLicense = (id: string): LicenseRecord | undefined =>
  globalThis.___TikiSdk__getLicense(id);

const all = (ptr: string, origin?: string): Array<LicenseRecord> =>
  globalThis.___TikiSdk__all(ptr, origin);

const latest = (ptr: string, origin?: string): LicenseRecord | undefined =>
  globalThis.___TikiSdk__latest(ptr, origin);

const guard = (
  ptr: string,
  usecases: Array<LicenseUsecase>,
  destinations?: Array<string>,
  onPass?: () => void,
  onFail?: () => void,
  origin?: string
): boolean =>
  globalThis.___TikiSdk__guard(
    ptr,
    usecases,
    destinations,
    onPass,
    onFail,
    origin
  );

const address = (): string => globalThis.___TikiSdk__address();

const id = (): string => globalThis.___TikiSdk__id();
