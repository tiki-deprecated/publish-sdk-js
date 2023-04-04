/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "../config";

/**
 * The theme for pre-built UIs.
 *
 * The pre-built UI styles are defined by a `Theme` object. To configure a theme,
 * chain calls to the `config()` method.
 *
 * @example
 * ```ts
 * TikiSdk.config()
 *     .theme
 *         .primaryTextColor('#000000')
 *         .primaryBackgroundColor('#FFFFFF')
 *         .accentColor('blue')
 *         .fontFamily('"Space Grotesk", sans-serif')
 * ```
 */
export class Theme {
  private readonly _config;
  /**
   * @hidden
   */
  _fontFamily = '"Space Grotesk", sans-serif';
  /**
   * @hidden
   */
  _primaryTextColor = "#1C0000";
  /**
   * @hidden
   */
  _secondaryTextColor = "#1C000099";
  /**
   * @hidden
   */
  _primaryBackgroundColor = "#FFFFFF";
  /**
   * @hidden
   */
  _secondaryBackgroundColor = "#F6F6F6";
  /**
   * @hidden
   */
  _accentColor = "#00b272";

  /**
   * Create a new Theme object
   *
   * @param config - The optional {@link Config} object to attach this Theme to. Required for {@link and()}.
   */
  constructor(config?: Config) {
    this._config = config;
  }

  /**
   * Set the CSS font family
   *
   * @param val - The font family to use
   */
  fontFamily(val: string): Theme {
    this._fontFamily = val;
    return this;
  }

  /**
   * Set the primary text CSS color
   *
   * @param color - The color to use
   */
  primaryTextColor(color: string): Theme {
    this._primaryTextColor = color;
    return this;
  }

  /**
   * Set the secondary text CSS color
   *
   * @param color - The color to use
   */
  secondaryTextColor(color: string): Theme {
    this._secondaryTextColor = color;
    return this;
  }

  /**
   * Set the primary background CSS color
   *
   * @param color - The color to use
   */
  primaryBackgroundColor(color: string): Theme {
    this._primaryBackgroundColor = color;
    return this;
  }

  /**
   * Set the secondary background CSS color
   *
   * @param color - The color to use
   */
  secondaryBackgroundColor(color: string): Theme {
    this._secondaryBackgroundColor = color;
    return this;
  }

  /**
   * Set the accent CSS color
   *
   * @param color - The color to use
   */
  accentColor(color: string): Theme {
    this._accentColor = color;
    return this;
  }

  /**
   * Use to return to parent {@link Config} object for chaining
   *
   * @example
   * ```ts
   * TikiSdk.config()
   *     .theme
   *         .primaryTextColor('#000000')
   *         .primaryBackgroundColor('#FFFFFF')
   *         .accentColor('blue')
   *         .fontFamily('"Space Grotesk", sans-serif')
   *         .and()
   *     .dark
   *         .primaryTextColor('#FFFFFF')
   *         .primaryBackgroundColor('#000000')
   * ```
   */
  and(): Config {
    return this._config;
  }
}
