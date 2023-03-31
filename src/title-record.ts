/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { TitleTag } from "./title-tag";

/**
 * A record describing a data asset, which contains a **PointerRecord** to your system. Title Records are used to
 * provide metadata about a data asset that TIKI clients can use to evaluate the value of the asset for their
 * use cases. A Title Record must contain a **PointerRecord** that identifies the asset in your system.
 *
 * Learn more about Title Records in [TIKI's documentation](https://docs.mytiki.com/docs/offer-customization).
 */
export interface TitleRecord {
  /**
   * This record's unique identifier.
   */
  id: string;

  /**
   * A hashed **PointerRecord** identifying the asset in your system.
   */
  hashedPtr: string;

  /**
   * A list of tags that describe the asset in a search-friendly way.
   */
  tags: Array<TitleTag>;

  /**
   * A human-readable description of the asset.
   */
  description?: string;

  /**
   * The origin from which the data was generated.
   */
  origin?: string;
}
