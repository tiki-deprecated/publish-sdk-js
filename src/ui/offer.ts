/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseUse } from "../license-use";
import { TitleTag } from "../title-tag";
import { Bullet } from "./bullet";
import { Config } from "../config";

export class Offer {
  private readonly _id: string;
  private readonly _config: Config;

  /**
   * @hidden
   */
  _ptr?: string;
  /**
   * @hidden
   */
  _description?: string;
  /**
   * @hidden
   */
  _terms?: string;
  /**
   * @hidden
   */
  _reward?: string;
  /**
   * @hidden
   */
  _bullets?: Array<Bullet> = [];
  /**
   * @hidden
   */
  _uses?: Array<LicenseUse> = [];
  /**
   * @hidden
   */
  _tags?: Array<TitleTag> = [];
  /**
   * @hidden
   */
  _expiry?: Date;

  /**
   * Create a new Offer object
   *
   * @param config - The optional {@link Config} object to attach this Offer to. Required for {@link add}.
   */
  constructor(config?: Config) {
    this._id = Date.now().toString();
    this._config = config;
  }

  /**
   * An identifier for this Offer.
   *
   * Auto-created on construction using the current time in milliseconds since the epoch.
   */
  get id() {
    return this._id;
  }

  /**
   * The pointer record for the {@link TitleRecord} to which this Offer applies.
   *
   * This property is used to create or find the TitleRecord for which the Offer applies.
   */
  ptr(val: string): Offer {
    this._ptr = val;
    return this;
  }

  /**
   * A brief description of the Offer.
   *
   * This property is used to inform the user about the Offer, and is also used as the description for
   * the {@link LicenseRecord} associated with this Offer.
   *
   * @param val - the Offer description
   */
  description(val: string): Offer {
    this._description = val;
    return this;
  }

  terms(val: string): Offer {
    this._terms = val;
    return this;
  }

  reward(src: string): Offer {
    this._reward = src;
    return this;
  }

  bullet(val: Bullet): Offer {
    this._bullets.push(val);
    return this;
  }

  use(val: LicenseUse): Offer {
    this._uses.push(val);
    return this;
  }

  tag(val: TitleTag): Offer {
    this._tags.push(val);
    return this;
  }

  duration(seconds: number): Offer {
    const now = new Date();
    this._expiry = new Date(now.getTime() + seconds * 1000);
    return this;
  }

  add(): Config {
    return this._config.addOffer(this);
  }
}
