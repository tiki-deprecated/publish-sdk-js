/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./core/core.dart.cjs";
import KeyGen from "./core/key-gen";

import { TitleRecord } from "./title-record";
import { LicenseRecord } from "./license-record";
import { LicenseUsecase } from "./license-usecase";
import { LicenseUse } from "./license-use";
import { flow } from "./ui/screens/flow";
import { FlowStep } from "./ui/screens/flow-step";

export const present = () => flow();

export const settings = () => flow(FlowStep.settings);

export const initialize = async (
  publishingId: string,
  id: string,
  origin?: string
): Promise<void> =>
  await globalThis.___TikiSdk__initialize(publishingId, id, KeyGen, origin);

export const title = async (
  ptr: string,
  tags?: Array<string>,
  description?: string,
  origin?: string
): Promise<TitleRecord> =>
  globalThis.___TikiSdk__title(ptr, tags, description, origin);

export const license = async (
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

export const getTitle = (id: string): TitleRecord | undefined =>
  globalThis.___TikiSdk__getTitle(id);

export const getLicense = (id: string): LicenseRecord | undefined =>
  globalThis.___TikiSdk__getLicense(id);

export const all = (ptr: string, origin?: string): Array<LicenseRecord> =>
  globalThis.___TikiSdk__all(ptr, origin);

export const latest = (
  ptr: string,
  origin?: string
): LicenseRecord | undefined => globalThis.___TikiSdk__latest(ptr, origin);

export const guard = (
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

export const address = (): string => globalThis.___TikiSdk__address();

export const id = (): string => globalThis.___TikiSdk__id();
