/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { ReceiptRecord } from "./receipt-record";
import { _toPayable } from "./payable";

export { ReceiptRecord } from "./receipt-record";

/**
 * Creates a new {@link ReceiptRecord} object.
 *
 * Note: This method requires an existing {@link Payable.PayableRecord}. Use {@link Payable.payable} first.
 *
 * @param payableId - The identifier for the corresponding payable record
 *
 * @param amount - The total amount paid.
 *
 * @param description - A short, human-readable description of the {@link Title.TitleRecord} as a future reminder.
 * This parameter is used only if a {@link Title.TitleRecord} does not already exist for the provided ptr.
 *
 * @param reference - A customer-specific reference identifier
 */
export async function create(
  payableId: string,
  amount: string,
  description?: string,
  reference?: string
): Promise<ReceiptRecord> {
  const req: ReqReceipt = {
    payableId: payableId,
    amount: amount,
    description: description,
    reference: reference,
  };
  return new Promise((resolve, reject) => {
    try {
      globalThis.___TikiTrail__receipt(JSON.stringify(req), (json) => {
        const rsp: RspReceipt = JSON.parse(json);
        resolve(_toReceipt(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Returns all {@link ReceiptRecord}s associated with a given {@link Payable.PayableRecord}.
 *
 * @param payableId - The id of the PayableRecord
 */
export function getByPayable(payableId: string): Array<ReceiptRecord> {
  const req: ReqGetReceipts = {
    payableId: payableId,
  };
  const json: Array<string> = globalThis.___TikiTrail__getReceipts(
    JSON.stringify(req)
  );
  const rsp: Array<RspReceipt> = json.map((item) => JSON.parse(item));
  return rsp.map((receipt) => _toReceipt(receipt));
}

/**
 * Retrieves the {@link ReceiptRecord} with the specified ID, or `undefined` if the record is not found.
 *
 * @param id - The ID of the ReceiptRecord to retrieve.
 */
export function getById(id: string): ReceiptRecord | undefined {
  const req: ReqGetReceiptId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiTrail__getReceipt(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspReceipt = JSON.parse(json);
    return _toReceipt(rsp);
  } else return undefined;
}

/**
 * @hidden
 * Marshall the {@link RspTitle} object to {@link ReceiptRecord}
 *
 * @param rsp - The response object to marshall
 */
export function _toReceipt(rsp: RspReceipt): ReceiptRecord {
  return {
    id: rsp.id,
    payable: _toPayable(rsp.payable),
    amount: rsp.amount,
    description: rsp.description,
    reference: rsp.reference,
  };
}
