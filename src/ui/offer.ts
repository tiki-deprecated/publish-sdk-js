/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LicenseUse } from "../trail/license-use";
import { TitleTag } from "../trail/title-tag";
import { Bullet } from "./bullet";
import { Config } from "../config";

/**
 * An Offer represents the Terms and Conditions for a particular offer. Acceptance of an offer by a user
 * always results in creation a new {@link Trail.License.LicenseRecord}.
 */
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
   _termsIsHtml: boolean = false;
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
   * The pointer record for the {@link Trail.Title.TitleRecord} to which this Offer applies.
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
   * the {@link Trail.License.LicenseRecord} associated with this Offer.
   *
   * @param val - the Offer description
   */
  description(val: string): Offer {
    this._description = val;
    return this;
  }

  /**
   * The legal Terms & Conditions of the Offer
   *
   * @param src - A **link** (e.g. `'./terms.md'` ) to the markdown file containing the Terms.
   *
   * The specified Terms & Conditions are permanently recorded in the {@link Trail.License.LicenseRecord}. Supports **basic
   * markdown** syntax for speed and package size minimization.
   *
   * ```
   * Heading:
   * # foo
   * ## foo
   * ### foo
   *
   * Images:
   * ![image alt text](/images/picture.jpg)
   * ![image alt text](/images/picture.jpg "image title text")
   *
   * Links:
   * [link text](http://github.com)
   * [open link in new window](+http://github.com)
   * [link with title](http://github.com "title text")
   *
   * Bold/Italic/Strikeout:
   * __bold__, **bold**
   * _italic_, *italic*
   * ~~strikeout text~~
   *
   * Horizontal Rules:
   * ---
   *  - - - -
   *    -- -- -- -- --
   * ------------------------
   *
   * Lists:
   *  * unordered list
   *  1. ordered list
   *
   * Code:
   *    // Four spaces indented text
   *     var count = 1000;
   *     while (--count) {
   *         console.log('Wow %d!', count);
   *     }
   * ```
   */
  terms(src: string, isHtml: boolean = false): Offer {
    this._terms = src;
    this._termsIsHtml = isHtml;
    return this;
  }

  /**
   * The Image that represents the Offer.
   *
   * This property is used to display a graphical representation of the Offer. For best results, it is recommended to
   * provide an image with at least 300 x 86 resolution (150:43).
   *
   * @param src -  A **link** (e.g. `'./reward.png'` ) to the image.
   */
  reward(src: string): Offer {
    this._reward = src;
    return this;
  }

  /**
   * Add a {@link UI.Bullet} to the array of bullets objects describing how the data will or will not be
   * used.
   *
   * Each bullet provides a {@link UI.Bullet.text} description and a {@link UI.Bullet.isUsed} flag declaring if
   * this is how the data will or will NOT be used.
   *
   * **UI ONLY*: not persisted within a Title or License Record
   *
   * @param val - The Bullet to add
   */
  bullet(val: Bullet): Offer {
    this._bullets.push(val);
    return this;
  }

  /**
   * Add a {@link Trail.License.LicenseUse} to the list of uses for the Offer.
   *
   * Each use includes a list of {@link Trail.License.LicenseUse.usecases} explicitly declaring how the data will be used. This differs
   * from {@link bullet}, in that uses are stored permanently within {@link Trail.License.LicenseRecord}s and searchable via TIKI's
   * API.
   *
   * Uses may optionally include a list of {@link Trail.License.LicenseUse.destinations} explicitly declaring where the data may
   * be used/reside. Supports ECMAScript Regex (**make sure you escape your tokens!**) (e.g. `'\\.mytiki\\.com'`)
   *
   * @param val - The LicenseUse to add
   */
  use(val: LicenseUse): Offer {
    this._uses.push(val);
    return this;
  }

  /**
   * Adds a {@link Trail.Title.TitleTag} to the list of tags for this Offer.
   *
   * Tags describe the type of data for the Offer and are persisted in the {@link Trail.Title.TitleRecord}. Tags improve
   * performance and simplify API searchability and license enforcement.
   *
   * @param val - The TitleTag to add
   */
  tag(val: TitleTag): Offer {
    this._tags.push(val);
    return this;
  }

  /**
   * Determines when the resulting license ({@link Trail.License.LicenseRecord}) expires (assuming the user accepts the Offer).
   *
   * This method calculates the {@link Trail.License.LicenseRecord.expiry} date by adding the specified number of seconds
   * to the current date.
   *
   * @param seconds - The number of seconds to add to the current date.
   */
  duration(seconds: number): Offer {
    const now = new Date();
    this._expiry = new Date(now.getTime() + seconds * 1000);
    return this;
  }

  /**
   *  Adds this offer to the parent {@link Config} object.
   */
  add(): Config {
    return this._config.addOffer(this);
  }
}
