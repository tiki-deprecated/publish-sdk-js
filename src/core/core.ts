/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTag } from "../title-tag";
import { TitleRecord } from "../title-record";
import { LicenseUse } from "../license-use";
import { LicenseRecord } from "../license-record";
import { LicenseUsecase } from "../license-usecase";

/**
 * Returns the address assigned to the User
 */
export function address(): string {
  const json: string = globalThis.___TikiSdk__address();
  const rsp: RspAddress = JSON.parse(json);
  return rsp.address;
}

/**
 * Returns the User ID used to initialize the TikiSdk for
 */
export function id(): string {
  const json: string = globalThis.___TikiSdk__id();
  const rsp: RspId = JSON.parse(json);
  return rsp.id;
}

/**
 * Returns a Boolean value indicating whether the TikiSdk has been initialized.
 *
 * If `true`, it means that the TikiSdk has been successfully initialized.
 * If `false`, it means that the TikiSdk has not yet been initialized or has failed to initialize.
 */
export function isInitialized(): boolean {
  const json: string = globalThis.___TikiSdk__isInitialized();
  const rsp: RspIsInitialized = JSON.parse(json);
  return rsp.isInitialized;
}

/**
 * Creates a new {@link TitleRecord}, or retrieves an existing one.
 *
 * Use this function to create a new {@link TitleRecord} for a given Pointer Record (ptr), or retrieve an existing
 * one if it already exists.
 *
 *
 * @param ptr - The Pointer Record that identifies the data stored in your system, similar to a foreign key.
 * Learn more about selecting good pointer records at https://docs.mytiki.com/docs/selecting-a-pointer-record.
 * @param tags - A list of metadata tags included in the {@link TitleRecord} describing the asset, for your use in
 * record search and filtering. Learn more about adding tags at https://docs.mytiki.com/docs/adding-tags.
 * @param description - A short, human-readable, description of the {@link TitleRecord} as a future reminder.
 * @param origin - An optional override of the default origin specified in {@link Config.initialize}.
 */
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

/**
 * Creates a new {@link LicenseRecord} object.
 *
 * The method searches for a {@link TitleRecord} object that matches the provided ptr parameter. If such a record
 * exists, the tags and titleDescription parameters are ignored. Otherwise, a new {@link TitleRecord} is created
 * using the provided tags and titleDescription parameters.
 *
 * If the origin parameter is not provided, the default origin specified in initialization is used.
 *
 * The expiry parameter sets the expiration date of the {@link LicenseRecord}. If the license never expires,
 * leave this parameter as `undefined`.
 *
 * @param ptr - The pointer record identifies data stored in your system, similar to a foreign key.
 * Learn more about selecting good pointer records at https://docs.mytiki.com/docs/selecting-a-pointer-record.
 *
 * @param uses - A list defining how and where an asset may be used, in the format of `LicenseUse` objects.
 * Learn more about specifying uses at https://docs.mytiki.com/docs/specifying-terms-and-usage.
 *
 * @param terms - A URL to the legal terms of the contract. This is a long text document that explains the
 * terms of the license.
 *
 * @param tags - A list of metadata tags included in the {@link TitleRecord} describing the asset, for your use in
 * record search and filtering. This parameter is used only if a {@link TitleRecord} does not already exist for the
 * provided ptr.
 *
 * @param titleDescription - A short, human-readable description of the {@link TitleRecord} as a future reminder.
 * This parameter is used only if a {@link TitleRecord} does not already exist for the provided ptr.
 *
 * @param licenseDescription - A short, human-readable description of the {@link LicenseRecord} as a future reminder.
 *
 * @param expiry - The expiration date of the {@link LicenseRecord}. If the license never expires, leave this parameter
 * as `undefined`.
 *
 * @param origin - An optional override of the default origin specified in {@link Config.initialize}.
 */
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

/**
 * Retrieves the {@link TitleRecord} with the specified ID, or `undefined` if the record is not found.
 *
 * Use this method to retrieve the metadata associated with an asset identified by its {@link TitleRecord} ID.
 * @param id - The ID of the TitleRecord to retrieve.
 */
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

/**
 * Retrieves the {@link LicenseRecord} with the specified ID, or `undefined` if the record is not found.
 *
 * Use this method to retrieve the metadata associated with an license identified by its {@link LicenseRecord} ID.
 * @param id - The ID of the LicenseRecord to retrieve.
 */
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

/**
 * Returns all {@link LicenseRecord}s associated with a given Pointer Record.
 *
 * Use this method to retrieve all {@link LicenseRecord}s that have been previously stored for a given
 * Pointer Record in your system.
 *
 * @param ptr - The Pointer Record that identifies the data stored in your system, similar to a foreign key.
 * @param origin - An optional origin. If `undefined`, the origin defaults to the origin set during
 * {@link Config.initialize}
 */
export function all(ptr: string, origin?: string): Array<LicenseRecord> {
  const req: ReqAll = {
    ptr: ptr,
    origin: origin,
  };
  const json: Array<string> = globalThis.___TikiSdk__all(JSON.stringify(req));
  const rsp: Array<RspLicense> = json.map((item) => JSON.parse(item));
  return rsp.map((license) => toLicense(license));
}

/**
 * Returns the latest {@link LicenseRecord} associated with a given Pointer Record or `undefined` if no
 * records are found.
 *
 * Use this method to retrieve the current {@link LicenseRecord} for a given Pointer Record.
 *
 * @param ptr - The Pointer Record that identifies the data stored in your system, similar to a foreign key.
 * @param origin - An optional origin. If `undefined`, the origin defaults to the origin set during
 * {@link Config.initialize}
 */
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

/**
 * Guard against an invalid {@link LicenseRecord} for a list of usecases and destinations.
 *
 * Use this method to verify that a non-expired {@link LicenseRecord} for the specified pointer record exists
 * and permits the listed usecases and destinations.
 *
 * This method can be used in two ways:
 * 1. As an async traditional guard, returning a pass/fail boolean:
 * ```
 * const pass: boolean = await TikiSdk.guard("example-ptr", [TikiSdk.LicenseUsecase.attribution], ["https://example.com"]);
 * if (pass) {
 *   // Perform the action allowed by the LicenseRecord.
 * }
 * ```
 * 2. As a wrapper around a function:
 * ```
 * TikiSdk.guard("example-ptr", [TikiSdk.LicenseUsecase.attribution], destinations: ["https://example.com"],
 * () => {
 *   // Perform the action allowed by the LicenseRecord.
 * },
 * (reason) => {
 *   // Handle the error.
 * });
 * ```
 *
 * @param ptr - The pointer record for the asset. Used to locate the latest relevant {@link LicenseRecord}.
 * @param usecases - A list of usecases defining how the asset will be used.
 * @param destinations - A list of destinations defining where the asset will be used, often URLs.
 * @param onPass - A closure to execute automatically upon successfully resolving the {@link LicenseRecord}
 * against the usecases and destinations.
 * @param onFail - A closure to execute automatically upon failure to resolve the {@link LicenseRecord}.
 * Accepts an optional error message describing the reason for failure.
 * @param origin - An optional override of the default origin specified in {@link Config.initialize}.
 */
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
