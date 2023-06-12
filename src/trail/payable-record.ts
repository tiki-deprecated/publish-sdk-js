/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseRecord } from "./license-record";

/**
 * A record describing a payment owed to a user in accordance with a {@link LicenseRecord}
 */
export interface PayableRecord {
  /**
   * This record's unique identifier.
   */
  id: string;

  /**
   * The corresponding {@link LicenseRecord}
   */
  license: LicenseRecord;

  /**
   * The total amount. Can be a simple numeric value, or an atypical value such as downloadable content.
   */
  amount: string;

  /**
   * Describes the type of payment (e.g. loyalty-point, cash, coupon, etc.)
   */
  type: string;

  /**
   * A human-readable description of the asset.
   */
  description?: string;

  /**
   * The date when the payable expires.
   */
  expiry?: Date;

  /**
   * A customer-specific reference identifier
   */
  reference?: string;
}
