/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTag } from "../title-tag";
import { TitleRecord } from "../title-record";
import { LicenseUse } from "../license-use";
import { LicenseRecord } from "../license-record";
import { LicenseUsecase } from "../license-usecase";

export function address(): string {
  const json: string = globalThis.___TikiSdk__address();
  const rsp: RspAddress = JSON.parse(json);
  return rsp.address;
}

export function id(): string {
  const json: string = globalThis.___TikiSdk__id();
  const rsp: RspId = JSON.parse(json);
  return rsp.id;
}

export function isInitialized(): boolean {
  const json: string = globalThis.___TikiSdk__isInitialized();
  const rsp: RspIsInitialized = JSON.parse(json);
  return rsp.isInitialized;
}

export async function title(
  ptr: string,
  tags?: Array<TitleTag>,
  description?: string,
  origin?: string
): Promise<TitleRecord> {
  const req: ReqTitle = {
    ptr: ptr,
    tags: tags.map((tag) => tag.value),
    description: description,
    origin: origin,
  };
  return new Promise((resolve, reject) => {
    try {
      globalThis.___TikiSdk__title(JSON.stringify(req), (json) => {
        const rsp: RspTitle = JSON.parse(json);
        resolve(toTitle(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

export async function license(
  ptr: string,
  uses: Array<LicenseUse>,
  terms: string,
  tags?: Array<TitleTag>,
  licenseDescription?: string,
  expiry?: Date,
  titleDescription?: string,
  origin?: string
): Promise<LicenseRecord> {
  const req: ReqLicense = {
    ptr: ptr,
    uses: uses.map((use) => {
      return {
        usecases: use.usecases.map((usecase) => usecase.value),
        destinations: use.destinations,
      };
    }),
    terms: terms,
    tags: tags?.map((tag) => tag.value) ?? [],
    licenseDescription: licenseDescription,
    expiry: expiry?.getTime(),
    titleDescription: titleDescription,
    origin: origin,
  };
  return new Promise((resolve, reject) => {
    try {
      globalThis.___TikiSdk__license(JSON.stringify(req), (json) => {
        const rsp: RspLicense = JSON.parse(json);
        resolve(toLicense(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function getTitle(id: string): TitleRecord | undefined {
  const req: ReqGetTitle = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiSdk__getTitle(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspTitle = JSON.parse(json);
    return toTitle(rsp);
  } else return undefined;
}

export function getLicense(id: string): LicenseRecord | undefined {
  const req: ReqGetLicense = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiSdk__getLicense(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspLicense = JSON.parse(json);
    return toLicense(rsp);
  } else return undefined;
}

export function all(ptr: string, origin?: string): Array<LicenseRecord> {
  const req: ReqAll = {
    ptr: ptr,
    origin: origin,
  };
  const json: Array<string> = globalThis.___TikiSdk__all(JSON.stringify(req));
  const rsp: Array<RspLicense> = json.map((item) => JSON.parse(item));
  return rsp.map((license) => toLicense(license));
}

export function latest(
  ptr: string,
  origin?: string
): LicenseRecord | undefined {
  const req: ReqLatest = {
    ptr: ptr,
    origin: origin,
  };
  const json: string | undefined = globalThis.___TikiSdk__latest(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspLicense = JSON.parse(json);
    return toLicense(rsp);
  } else return undefined;
}

export function guard(
  ptr: string,
  usecases: Array<LicenseUsecase>,
  destinations?: Array<string>,
  onPass?: () => void,
  onFail?: (reason: string) => void,
  origin?: string
): boolean {
  const req: ReqGuard = {
    ptr: ptr,
    usecases: usecases.map((usecase) => usecase.value),
    destinations: destinations,
    origin: origin,
  };
  const json: string = globalThis.___TikiSdk__guard(
    JSON.stringify(req),
    onPass,
    onFail
  );
  const rsp: RspGuard = JSON.parse(json);
  return rsp.success;
}

function toTitle(rsp: RspTitle): TitleRecord {
  return {
    id: rsp.id,
    hashedPtr: rsp.hashedPtr,
    tags: rsp.tags.map((tag) => TitleTag.from(tag)),
    origin: rsp.origin,
    description: rsp.origin,
  };
}

function toLicense(rsp: RspLicense): LicenseRecord {
  return {
    id: rsp.id,
    title: toTitle(rsp.title),
    terms: rsp.terms,
    uses: rsp.uses.map((use) => {
      return {
        usecases: use.usecases.map((usecase) => LicenseUsecase.from(usecase)),
        destinations: use.destinations,
      };
    }),
    description: rsp.description,
    expiry: rsp.expiry != undefined ? new Date(rsp.expiry) : undefined,
  };
}
