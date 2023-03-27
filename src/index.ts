/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ui/theme.css";
import OfferPrompt from "./ui/screens/offer-prompt/offer-prompt";
import Settings from "./ui/screens/settings/settings";

function present() {
  OfferPrompt();
}

function settings() {
  Settings("");
}

export { present, settings };
