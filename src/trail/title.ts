/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTag } from "./title-tag";
import { TitleRecord } from "./title-record";

export { TitleTag } from "./title-tag";
export { TitleRecord } from "./title-record";

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
export async function create(
  ptr: string,
  tags: Array<TitleTag> = [],
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
      globalThis.___TikiTrail__title(JSON.stringify(req), (json) => {
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
export function getByPtr(
  ptr: string,
  origin?: string
): TitleRecord | undefined {
  const req: ReqGetTitle = {
    ptr: ptr,
    origin: origin,
  };
  const json: string | undefined = globalThis.___TikiTrail__getTitle(
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
export function getById(id: string): TitleRecord | undefined {
  const req: ReqGetTitleId = {
    id: id,
  };
  const json: string | undefined = globalThis.___TikiTrail__getTitleById(
    JSON.stringify(req)
  );
  if (json != undefined) {
    const rsp: RspTitle = JSON.parse(json);
    return _toTitle(rsp);
  } else return undefined;
}

/**
 * @hidden
 * Marshall the {@link RspTitle} object to {@link TitleRecord}
 *
 * @param rsp - The response object to marshall
 */
export function _toTitle(rsp: RspTitle): TitleRecord {
  return {
    id: rsp.id,
    hashedPtr: rsp.hashedPtr,
    tags: rsp.tags.map((tag) => TitleTag.from(tag)),
    origin: rsp.origin,
    description: rsp.origin,
  };
}
