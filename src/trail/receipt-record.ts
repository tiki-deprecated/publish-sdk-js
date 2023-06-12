/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { PayableRecord } from "./payable-record";

/**
 * A record describing a payment made to a user in accordance with a {@link PayableRecord}
 */
export interface ReceiptRecord {
  /**
   * This record's unique identifier.
   */
  id: string;

  /**
   * The corresponding {@link PayableRecord}
   */
  payable: PayableRecord;

  /**
   * The total amount paid.
   */
  amount: string;

  /**
   * A human-readable description of the asset.
   */
  description?: string;

  /**
   * A customer-specific reference identifier
   */
  reference?: string;
}
