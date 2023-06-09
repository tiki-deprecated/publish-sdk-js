/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTag } from "../title-tag";
import { TitleRecord } from "../title-record";
import { LicenseUse } from "../license-use";
import { LicenseRecord } from "../license-record";
import { LicenseUsecase } from "../license-usecase";
import { PayableRecord } from "../payable-record";
import { ReceiptRecord } from "../receipt-record";

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
        resolve(_toTitle(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Retrieves the {@link TitleRecord} with the specified ptr and optional origin, or `undefined` if the
 * record is not found.
 *
 * Use this method to retrieve the metadata associated with an asset identified by its {@link TitleRecord} ID.
 * @param ptr - The ptr for the TitleRecord to retrieve.
 * @param origin - The origin, defaults to the origin specified in {@link Config.initialize}.
 */
export function getTitle(
  ptr: string,
  origin?: string
): TitleRecord | undefined {
  const req: ReqGetTitle = {
    ptr: ptr,
    origin: origin,
  };
  const json: string | undefined = globalThis.___TikiSdk__getTitle(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspTitle = JSON.parse(json);
    return _toTitle(rsp);
  } else return undefined;
}

/**
 * Retrieves the {@link TitleRecord} with the specified ID, or `undefined` if the record is not found.
 *
 * Use this method to retrieve the metadata associated with an asset identified by its {@link TitleRecord} ID.
 * @param id - The ID of the TitleRecord to retrieve.
 */
export function getTitleById(id: string): TitleRecord | undefined {
  const req: ReqGetTitleId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiSdk__getTitleById(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspTitle = JSON.parse(json);
    return _toTitle(rsp);
  } else return undefined;
}

/**
 * Creates a new {@link LicenseRecord} object.
 *
 * Note: This method requires an existing {@link TitleRecord}. Use {@link title} first.
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
 * @param description - A short, human-readable description of the {@link TitleRecord} as a future reminder.
 * This parameter is used only if a {@link TitleRecord} does not already exist for the provided ptr.
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
 * Returns all {@link LicenseRecord}s associated with a given {@link TitleRecord}.
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
 * Returns the latest {@link LicenseRecord} associated with a given {@link TitleRecord} or `undefined` if no
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
 * Creates a new {@link PayableRecord} object.
 *
 * Note: This method requires an existing {@link LicenseRecord}. Use {@link license} first.
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
 * @param description - A short, human-readable description of the {@link TitleRecord} as a future reminder.
 * This parameter is used only if a {@link TitleRecord} does not already exist for the provided ptr.
 *
 * @param expiry - The expiration date of the {@link LicenseRecord}. If the license never expires, leave this parameter
 * as `undefined`.
 *
 * @param reference - A customer-specific reference identifier
 */
export async function payable(
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
      globalThis.___TikiSdk__payable(JSON.stringify(req), (json) => {
        const rsp: RspPayable = JSON.parse(json);
        resolve(_toPayable(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Returns all {@link PayableRecord}s associated with a given {@link LicenseRecord}.
 *
 * @param licenseId - The id of the LicenseRecord
 */
export function getPayables(licenseId: string): Array<PayableRecord> {
  const req: ReqGetPayables = {
    licenseId: licenseId,
  };
  const json: Array<string> = globalThis.___TikiSdk__getPayables(
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
export function getPayable(id: string): PayableRecord | undefined {
  const req: ReqGetPayableId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiSdk__getPayable(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspPayable = JSON.parse(json);
    return _toPayable(rsp);
  } else return undefined;
}

/**
 * Creates a new {@link ReceiptRecord} object.
 *
 * Note: This method requires an existing {@link PayableRecord}. Use {@link payable} first.
 *
 * @param payableId - The identifier for the corresponding payable record
 *
 * @param amount - The total amount paid.
 *
 * @param description - A short, human-readable description of the {@link TitleRecord} as a future reminder.
 * This parameter is used only if a {@link TitleRecord} does not already exist for the provided ptr.
 *
 * @param reference - A customer-specific reference identifier
 */
export async function receipt(
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
      globalThis.___TikiSdk__receipt(JSON.stringify(req), (json) => {
        const rsp: RspReceipt = JSON.parse(json);
        resolve(_toReceipt(rsp));
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Returns all {@link ReceiptRecord}s associated with a given {@link PayableRecord}.
 *
 * @param payableId - The id of the PayableRecord
 */
export function getReceipts(payableId: string): Array<ReceiptRecord> {
  const req: ReqGetReceipts = {
    payableId: payableId,
  };
  const json: Array<string> = globalThis.___TikiSdk__getReceipts(
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
export function getReceipt(id: string): ReceiptRecord | undefined {
  const req: ReqGetReceiptId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiSdk__getReceipt(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspReceipt = JSON.parse(json);
    return _toReceipt(rsp);
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

function _toTitle(rsp: RspTitle): TitleRecord {
  return {
    id: rsp.id,
    hashedPtr: rsp.hashedPtr,
    tags: rsp.tags.map((tag) => TitleTag.from(tag)),
    origin: rsp.origin,
    description: rsp.origin,
  };
}

function _toLicense(rsp: RspLicense): LicenseRecord {
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

function _toPayable(rsp: RspPayable): PayableRecord {
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

function _toReceipt(rsp: RspReceipt): ReceiptRecord {
  return {
    id: rsp.id,
    payable: _toPayable(rsp.payable),
    amount: rsp.amount,
    description: rsp.description,
    reference: rsp.reference,
  };
}
