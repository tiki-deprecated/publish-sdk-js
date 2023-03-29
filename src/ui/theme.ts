/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "../config";

export const CSS_VAR_FONT_FAMILY = "var(--tiki-font-family)";
export const CSS_VAR_PRIMARY_TEXT_COLOR = "var(--tiki-primary-text-color)";
export const CSS_VAR_SECONDARY_TEXT_COLOR = "var(--tiki-secondary-text-color)";
export const CSS_VAR_PRIMARY_BACKGROUND_COLOR =
  "var(--tiki-primary-background-color)";
export const CSS_VAR_SECONDARY_BACKGROUND_COLOR =
  "var(--tiki-secondary-background-color)";
export const CSS_VAR_ACCENT_COLOR = "var(--tiki-accent-color)";

export class Theme {
  private readonly _config;
  private _fontFamily = '"Space Grotesk", sans-serif';
  private _primaryTextColor = "#1C0000";
  private _secondaryTextColor = "#1C000099";
  private _primaryBackgroundColor = "#FFFFFF";
  private _secondaryBackgroundColor = "#F6F6F6";
  private _accentColor = "#00b272";

  constructor(config: Config) {
    this._config = config;
  }

  fontFamily(val: string): Theme {
    this._fontFamily = val;
    return this;
  }

  primaryTextColor(color: string): Theme {
    this._primaryTextColor = color;
    return this;
  }

  secondaryTextColor(color: string): Theme {
    this._secondaryTextColor = color;
    return this;
  }

  primaryBackgroundColor(color: string): Theme {
    this._primaryBackgroundColor = color;
    return this;
  }

  secondaryBackgroundColor(color: string): Theme {
    this._secondaryBackgroundColor = color;
    return this;
  }

  accentColor(color: string): Theme {
    this._accentColor = color;
    return this;
  }

  and(): Config {
    return this._config;
  }
}
