/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import KeyGen from "./idp/key-gen";
import { Offer } from "./ui/offer";
import { Theme } from "./ui/theme";
import { LicenseRecord } from "./trail/license-record";

/**
 * The top-level class for configuring and initializing a TikiSdk instance.
 */
export class Config {
  /**
   * @hidden
   */
  _isAcceptEndingDisabled = false;
  /**
   * @hidden
   */
  _isDeclineEndingDisabled = false;
  /**
   * @hidden
   */
  _onAccept: (offer: Offer, license: LicenseRecord) => void | undefined;
  /**
   * @hidden
   */
  _onDecline: (offer: Offer, license?: LicenseRecord) => void | undefined;
  /**
   * @hidden
   */
  _onSettings: () => void | undefined;
  /**
   * @hidden
   */
  _offers: Array<Offer> = [];
  /**
   * @hidden
   */
  _theme = new Theme(this);
  /**
   * @hidden
   */
  _dark: Theme | undefined;

  /**
   * A configurable {@link UI.Theme} object for pre-built UIs.
   */
  get theme(): Theme {
    return this._theme;
  }

  /**
   * A {@link UI.Theme} object for pre-built UIs with a dark mode appearance.
   *
   * The dark mode theme is applied to the UI elements only when explicitly called. By default, the dark
   * mode theme is identical to the default (light) theme. Each individual property of the dark mode theme
   * can be customized during configuration.
   */
  get dark(): Theme {
    this._dark = new Theme(this);
    return this._dark;
  }

  /**
   * Creates a new, empty {@link UI.Offer} object.
   *
   * This Offer object can be used to define a new offer before adding it to the TIKI SDK.
   * To add the offer, call the {@link UI.Offer.add} method on the Offer object.
   */
  get offer(): Offer {
    const offer = new Offer(this);
    this._offers.push(offer);
    return offer;
  }

  /**
   * Adds an Offer object to the offers list.
   *
   * Currently only a single offer is supported in TIKI's pre-built UI.
   *
   * @param offer - The Offer object to add to the offers list.
   */
  addOffer(offer: Offer): Config {
    this._offers.push(offer);
    return this;
  }

  /**
   * Disables or enables the ending UI for accepted offers.
   *
   * If this method is called with a parameter value of `true`, the ending UI will not be shown when an offer
   * is accepted. If the parameter value is `false`, the ending UI will be shown as usual.
   *
   * @param disable - A Boolean value indicating whether the ending UI for accepted offers should be disabled
   * (`true`) or enabled (`false`).
   */
  disableAcceptEnding(disable = false): Config {
    this._isAcceptEndingDisabled = disable;
    return this;
  }

  /**
   * Disables or enables the ending UI for declined offers.
   *
   * If this method is called with a parameter value of `true`, the ending UI will not be shown when an offer is
   * declined. If the parameter value is `false`, the ending UI will be shown as usual.
   *
   * @param disable - A Boolean value indicating whether the ending UI for declined offers should be disabled
   * (`true`) or enabled (`false`).
   */
  disableDeclineEnding(disable = false): Config {
    this._isDeclineEndingDisabled = disable;
    return this;
  }

  /**
   * Sets the callback function for when an offer is accepted.
   *
   * This method sets the onAccept event handler, which is triggered when the user accepts a licensing offer.
   *
   * @param callback - The closure to be executed when an offer is declined. The closure takes two arguments: the
   * {@link UI.Offer} that was accepted, and the {@link LicenseRecord} object containing the license information for the
   * accepted offer.
   */
  onAccept(callback: (offer: Offer, license: LicenseRecord) => void): Config {
    this._onAccept = callback;
    return this;
  }

  /**
   * Sets the callback function for when an offer is declined.
   *
   * This method sets the onDecline event handler, which is triggered when the user declines a licensing offer.
   * The event is triggered either when the user selects "Back Off" or "Opts Out" in settings.
   *
   * @param callback - The closure to be executed when an offer is declined. The closure takes two arguments: the
   * {@link UI.Offer} that was declined, and an optional {@link LicenseRecord} object containing the license information
   * for the declined offer, if it was previously accepted.
   */
  onDecline(callback: (offer: Offer, license?: LicenseRecord) => void): Config {
    this._onDecline = callback;
    return this;
  }

  /**
   * Sets the callback function for when the user selects "settings" in the ending widget.
   * This method sets the `onSettings()` event handler, which is triggered when the user selects "settings" in
   * the ending screen. If a callback function is not registered, the SDK will default to calling the
   * `TikiSdk.settings()` method.
   *
   * @param callback - The closure to be executed when the "settings" option is selected. The closure
   * takes no arguments and returns no value.
   */
  onSettings(callback: () => void): Config {
    this._onSettings = callback;
    return this;
  }

  /**
   * Initializes the TIKI SDK.
   *
   * Use this method to initialize the TIKI SDK with the specified publishingId, id, and origin.
   *
   * @param publishingId - The publishingId is required for connecting to TIKI's services. Get a free publishingId at
   * [console.mytiki.com](https://console.mytiki.com).
   *
   * @param id - The ID that uniquely identifies your user.
   *
   * @param origin - The default origin for all transactions. Defaults to `window.location.hostname` if `undefined`.
   */
  async initialize(
    publishingId: string,
    id: string,
    origin?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        globalThis.___TikiWrapper__initialize(
          JSON.stringify({
            id: id,
            publishingId: publishingId,
            origin: origin,
          }),
          KeyGen,
          () => resolve(),
          (e) => reject(e)
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * The active {@link UI.Theme} depending on the user's configuration
   *
   * Defaults to *light* if a *dark* theme has not been set.
   * @see {@link dark}
   */
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
