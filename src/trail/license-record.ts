/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleRecord } from "./title-record";
import { LicenseUse } from "./license-use";

/**
 * A LicenseRecord describes the terms under which a data asset may be used and MUST contain a reference to the
 * corresponding {@link TitleRecord}.
 *
 * [Learn more about LicenseRecords →](https://docs.mytiki.com/docs/offer-customization)
 */
export interface LicenseRecord {
  /**
   * This record's unique identifier.
   */
  id: string;

  /**
   * The {@link TitleRecord} associated with this license.
   */
  title: TitleRecord;

  /**
   * A list of {@link LicenseUse} instances describing how an asset can be used.
   */
  uses: Array<LicenseUse>;

  /**
   * The legal terms for the license.
   */
  terms: string;

  /**
   * A human-readable description of the license.
   */
  description?: string;

  /**
   * The date when the license expires.
   */
  expiry?: Date;
}
