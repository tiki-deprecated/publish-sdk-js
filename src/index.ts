/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ui/theme.css";
import OfferPrompt from "./ui/screens/offer-prompt/offer-prompt";
import EndingDeclined from "./ui/screens/ending/ending-declined";

function present() {
  OfferPrompt();
}

function ending() {
  EndingDeclined(() => {
    console.log("settings");
  });
}

export { present, ending };
