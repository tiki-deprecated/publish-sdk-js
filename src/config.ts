/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import KeyGen from "./core/key-gen";
import { Offer } from "./ui/offer";
import { Theme } from "./ui/theme";
import { LicenseRecord } from "./license-record";

export class Config {
  _isAcceptEndingDisabled = false;
  _isDeclineEndingDisabled = false;
  _onAccept: (offer: Offer, license: LicenseRecord) => void | undefined;
  _onDecline: (offer: Offer, license?: LicenseRecord) => void | undefined;
  _onSettings: () => void | undefined;
  _offers: Array<Offer> = [];
  _theme = new Theme(this);
  _dark: Theme | undefined;

  get theme(): Theme {
    return this._theme;
  }

  get dark(): Theme {
    this._dark = new Theme(this);
    return this._dark;
  }

  get offer(): Offer {
    const offer = new Offer(this);
    this._offers.push(offer);
    return offer;
  }

  addOffer(offer: Offer): Config {
    this._offers.push(offer);
    return this;
  }

  disableAcceptEnding(isDisabled = false): Config {
    this._isAcceptEndingDisabled = isDisabled;
    return this;
  }

  disableDeclineEnding(isDisabled = false): Config {
    this._isDeclineEndingDisabled = isDisabled;
    return this;
  }

  onAccept(callback: (offer: Offer) => void): Config {
    this._onAccept = callback;
    return this;
  }

  onDecline(callback: (offer: Offer) => void): Config {
    this._onDecline = callback;
    return this;
  }

  onSettings(callback: () => void): Config {
    this._onSettings = callback;
    return this;
  }

  async initialize(
    publishingId: string,
    id: string,
    origin?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        globalThis.___TikiSdk__initialize(
          JSON.stringify({
            id: id,
            publishingId: publishingId,
            origin: origin,
          }),
          KeyGen,
          () => resolve()
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  get activeTheme(): Theme {
    if (
      this._dark != undefined &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return this._dark;
    } else return this._theme;
  }
}
