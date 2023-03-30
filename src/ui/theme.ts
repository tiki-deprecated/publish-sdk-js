/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { Config } from "../config";

export class Theme {
  private readonly _config;
  _fontFamily = '"Space Grotesk", sans-serif';
  _primaryTextColor = "#1C0000";
  _secondaryTextColor = "#1C000099";
  _primaryBackgroundColor = "#FFFFFF";
  _secondaryBackgroundColor = "#F6F6F6";
  _accentColor = "#00b272";

  constructor(config?: Config) {
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
