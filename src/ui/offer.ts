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
  _ptr?: string;
  _description?: string;
  _terms?: string;
  _reward?: string;
  _bullets?: Array<Bullet> = [];
  _uses?: Array<LicenseUse> = [];
  _tags?: Array<TitleTag> = [];
  _expiry?: Date;

  constructor(config: Config) {
    this._id = Date.now().toString();
    this._config = config;
  }

  get id() {
    return this._id;
  }

  ptr(val: string): Offer {
    this._ptr = val;
    return this;
  }

  description(val: string): Offer {
    this._description = val;
    return this;
  }

  terms(val: string): Offer {
    this._terms = val;
    return this;
  }

  reward(val: string): Offer {
    this._reward = val;
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
