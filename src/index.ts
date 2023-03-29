/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./core/core.dart.cjs";

import { TitleRecord } from "./title-record";
import { LicenseRecord } from "./license-record";
import { LicenseUsecase } from "./license-usecase";
import { LicenseUse } from "./license-use";
import { flow } from "./ui/flow";
import { FlowStep } from "./ui/flow-step";
import { Config } from "./config";

const _config = new Config();

_config.offer
  .reward(
    "https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg"
  )
  .description(
    "Trade your IDFA (kind of like a serial # for your phone) for a discount."
  )
  .terms("# TERMS in md.")
  .bullet({
    text: "Learn how our ads perform",
    isUsed: true,
  })
  .bullet({
    text: "Reach you on other platforms",
    isUsed: false,
  })
  .bullet({
    text: "Sold to other companies",
    isUsed: false,
  })
  .add();

export const present = () => flow(FlowStep.prompt, _config._offers[0]);
export const settings = () => flow(FlowStep.settings, _config._offers[0]);
export const config = (): Config => _config;

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

export const isInitialized = (): boolean =>
  globalThis.___TikiSdk__isInitialized();
