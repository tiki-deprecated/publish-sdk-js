/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseRecord } from "./license-record";
import { LicenseUse } from "./license-use";
import { LicenseUsecase } from "./license-usecase";
import { _toTitle } from "./title";

export { LicenseRecord } from "./license-record";
export { LicenseUse } from "./license-use";
export { LicenseUsecase } from "./license-usecase";

/**
 * Creates a new {@link LicenseRecord} object.
 *
 * Note: This method requires an existing {@link Title.TitleRecord}. Use {@link Title.title} first.
 *
 * The expiry parameter sets the expiration date of the {@link LicenseRecord}. If the license never expires,
 * leave this parameter as `undefined`.
 *
 * @param titleId - The identifier for the corresponding title record
 *
 * @param uses - A list defining how and where an asset may be used, in the format of `LicenseUse` objects.
 * Learn more about specifying uses at https://docs.mytiki.com/docs/specifying-terms-and-usage.
 *
 * @param terms - A URL to the legal terms of the contract. This is a long text document that explains the
 * terms of the license.
 *
 * @param description - A short, human-readable description of the {@link Title.TitleRecord} as a future reminder.
 * This parameter is used only if a {@link Title.TitleRecord} does not already exist for the provided ptr.
 *
 * @param expiry - The expiration date of the {@link LicenseRecord}. If the license never expires, leave this parameter
 * as `undefined`.
 */
export async function license(
  titleId: string,
  uses: Array<LicenseUse>,
  terms: string,
  description?: string,
  expiry?: Date
): Promise<LicenseRecord> {
  const req: ReqLicense = {
    titleId: titleId,
    uses: uses.map((use) => {
      return {
        usecases: use.usecases.map((usecase) => usecase.value),
        destinations: use.destinations,
      };
    }),
    terms: terms,
    description: description,
    expiry: expiry?.getTime(),
  };
  return new Promise((resolve, reject) => {
    try {
      globalThis.___TikiSdk__license(JSON.stringify(req), (json) => {
        const rsp: RspLicense = JSON.parse(json);
        resolve(_toLicense(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Retrieves the {@link LicenseRecord} with the specified ID, or `undefined` if the record is not found.
 *
 * Use this method to retrieve the metadata associated with an license identified by its {@link LicenseRecord} ID.
 * @param id - The ID of the LicenseRecord to retrieve.
 */
export function getLicenseById(id: string): LicenseRecord | undefined {
  const req: ReqGetLicenseId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiSdk__getLicenseById(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspLicense = JSON.parse(json);
    return _toLicense(rsp);
  } else return undefined;
}

/**
 * Returns all {@link LicenseRecord}s associated with a given {@link Title.TitleRecord}.
 *
 * Use this method to retrieve all {@link LicenseRecord}s that have been previously stored for a given
 * Pointer Record in your system.
 *
 * @param titleId - The id of the TitleRecord
 */
export function getLicenses(titleId: string): Array<LicenseRecord> {
  const req: ReqGetLicenses = {
    titleId: titleId,
  };
  const json: Array<string> = globalThis.___TikiSdk__getLicenses(
    JSON.stringify(req)
  );
  const rsp: Array<RspLicense> = json.map((item) => JSON.parse(item));
  return rsp.map((license) => _toLicense(license));
}

/**
 * Returns the latest {@link LicenseRecord} associated with a given {@link Title.TitleRecord} or `undefined` if no
 * records are found.
 *
 * Use this method to retrieve the current {@link LicenseRecord} for a given TitleRecord
 *
 * @param titleId - The id of the TitleRecord
 */
export function getLicense(titleId: string): LicenseRecord | undefined {
  const req: ReqGetLicense = {
    titleId: titleId,
  };
  const json: string | undefined = globalThis.___TikiSdk__getLicense(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspLicense = JSON.parse(json);
    return _toLicense(rsp);
  } else return undefined;
}

/**
 * @hidden
 * Marshall the {@link RspTitle} object to {@link TitleRecord}
 *
 * @param rsp - The response object to marshall
 */
export function _toLicense(rsp: RspLicense): LicenseRecord {
  return {
    id: rsp.id,
    title: _toTitle(rsp.title),
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
