/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import KeyGen from "./core/key-gen";
import { Offer } from "./ui/offer";
import { Theme } from "./ui/theme";

export class Config {
  private _isAcceptEndingDisabled = false;
  private _isDeclineEndingDisabled = false;
  private _onAccept = () => undefined;
  private _onDecline = () => undefined;
  private _onSettings = () => undefined;
  private _offers: Array<Offer> = [];
  private _theme = new Theme(this);
  private _dark: Theme | undefined;

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

  onAccept(callback: () => void): Config {
    this._onAccept = callback;
    return this;
  }

  onDecline(callback: () => void): Config {
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
    return globalThis.___TikiSdk__initialize(publishingId, id, KeyGen, origin);
  }
}
