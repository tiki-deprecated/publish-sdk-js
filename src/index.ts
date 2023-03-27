/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ui/theme.css";
import OfferPrompt from "./ui/screens/offer-prompt/offer-prompt";
import LearnMore from "./ui/screens/learn-more/learn-more";

function present() {
  OfferPrompt();
}

function terms() {
  LearnMore();
}

export { present, terms };
