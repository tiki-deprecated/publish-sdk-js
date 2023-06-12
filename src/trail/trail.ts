/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseUsecase } from "./license-usecase";

export * as Title from "./title";
export * as License from "./license";
export * as Payable from "./payable";
export * as Receipt from "./receipt";

/**
 * Returns the address assigned to the User
 */
export function address(): string {
  const json: string = globalThis.___TikiTrail__address();
  const rsp: RspAddress = JSON.parse(json);
  return rsp.address;
}

/**
 * Returns the User ID used to initialize the TikiSdk for
 */
export function id(): string {
  const json: string = globalThis.___TikiTrail__id();
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
  const json: string = globalThis.___TikiTrail__isInitialized();
  const rsp: RspIsInitialized = JSON.parse(json);
  return rsp.isInitialized;
}

/**
 * Guard against an invalid {@link License.LicenseRecord} for a list of usecases and destinations.
 *
 * Use this method to verify that a non-expired {@link License.LicenseRecord} for the specified pointer record exists
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
 * @param ptr - The pointer record for the asset. Used to locate the latest relevant {@link License.LicenseRecord}.
 * @param usecases - A list of usecases defining how the asset will be used.
 * @param destinations - A list of destinations defining where the asset will be used, often URLs.
 * @param onPass - A closure to execute automatically upon successfully resolving the {@link License.LicenseRecord}
 * against the usecases and destinations.
 * @param onFail - A closure to execute automatically upon failure to resolve the {@link License.LicenseRecord}.
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
  const json: string = globalThis.___TikiTrail__guard(
    JSON.stringify(req),
    onPass,
    onFail
  );
  const rsp: RspGuard = JSON.parse(json);
  return rsp.success;
}
