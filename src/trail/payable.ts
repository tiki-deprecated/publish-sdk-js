/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { PayableRecord } from "./payable-record";
import { _toLicense } from "./license";

export { PayableRecord } from "./payable-record";

/**
 * Creates a new {@link PayableRecord} object.
 *
 * Note: This method requires an existing {@link License.LicenseRecord}. Use {@link License.create} first.
 *
 * The expiry parameter sets the expiration date of the {@link PayableRecord}. If the payable never expires,
 * leave this parameter as `undefined`.
 *
 * @param licenseId - The identifier for the corresponding license record
 *
 * @param amount - The total amount. Can be a simple numeric value, or an atypical value such as downloadable content.
 *
 * @param type - Describes the type of payment (e.g. loyalty-point, cash, coupon, etc.)
 *
 * @param description - A short, human-readable description of the {@link Title.TitleRecord} as a future reminder.
 * This parameter is used only if a {@link Title.TitleRecord} does not already exist for the provided ptr.
 *
 * @param expiry - The expiration date of the {@link License.LicenseRecord}. If the license never expires, leave this parameter
 * as `undefined`.
 *
 * @param reference - A customer-specific reference identifier
 */
export async function create(
  licenseId: string,
  amount: string,
  type: string,
  description?: string,
  expiry?: Date,
  reference?: string
): Promise<PayableRecord> {
  const req: ReqPayable = {
    licenseId: licenseId,
    amount: amount,
    type: type,
    description: description,
    expiry: expiry?.getTime(),
    reference: reference,
  };
  return new Promise((resolve, reject) => {
    try {
      globalThis.___TikiTrail__payable(
        JSON.stringify(req),
        (json) => {
          const rsp: RspPayable = JSON.parse(json);
          resolve(_toPayable(rsp));
        },
        (e) => reject(e)
      );
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Returns all {@link PayableRecord}s associated with a given {@link License.LicenseRecord}.
 *
 * @param licenseId - The id of the LicenseRecord
 */
export function getByLicense(licenseId: string): Array<PayableRecord> {
  const req: ReqGetPayables = {
    licenseId: licenseId,
  };
  const json: Array<string> = globalThis.___TikiTrail__getPayables(
    JSON.stringify(req)
  );
  const rsp: Array<RspPayable> = json.map((item) => JSON.parse(item));
  return rsp.map((payable) => _toPayable(payable));
}

/**
 * Retrieves the {@link PayableRecord} with the specified ID, or `undefined` if the record is not found.
 *
 * @param id - The ID of the PayableRecord to retrieve.
 */
export function getById(id: string): PayableRecord | undefined {
  const req: ReqGetPayableId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiTrail__getPayable(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspPayable = JSON.parse(json);
    return _toPayable(rsp);
  } else return undefined;
}

/**
 * @hidden
 * Marshall the {@link RspPayable} object to {@link PayableRecord}
 *
 * @param rsp - The response object to marshall
 */
export function _toPayable(rsp: RspPayable): PayableRecord {
  return {
    id: rsp.id,
    license: _toLicense(rsp.license),
    amount: rsp.amount,
    type: rsp.type,
    description: rsp.description,
    expiry: rsp.expiry != undefined ? new Date(rsp.expiry) : undefined,
    reference: rsp.reference,
  };
}
