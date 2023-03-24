/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-prompt.css";
import * as Overlay from "../overlay/overlay";
import tradeYourData from "../../elements/trade-your-data/trade-your-data";
import learnMoreBtn from "../../elements/learn-more-btn/learn-more-btn";
import textBtn from "../../elements/text-btn/text-btn";
import usedFor from "../../elements/used-for/used-for";
import OfferCard from "../../elements/offer-card/offer-card";

const id = "tiki-offer-prompt";

export default function () {
  const prompt = document.createElement("div");
  prompt.id = id;

  const body = document.createElement("div");
  body.className = "tiki-offer-prompt-body";

  const heading = document.createElement("div");
  heading.className = "tiki-offer-prompt-heading";
  heading.appendChild(tradeYourData());
  heading.appendChild(learnMoreBtn(() => console.log("Learn More")));
  body.appendChild(heading);

  const offer = document.createElement("div");
  const used = usedFor(
    new Map([
      ["Learn how our ads perform", true],
      ["Reach you on other platforms", false],
      ["Sold to other companies", false],
    ])
  );
  used.className = "tiki-used-for";
  offer.appendChild(
    OfferCard(
      "https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg",
      "Trade your IDFA (kind of like a serial # for your phone) for a discount."
    )
  );
  offer.appendChild(used);
  body.appendChild(offer);

  const cta = document.createElement("div");
  cta.className = "tiki-offer-prompt-cta";
  const backOff = textBtn("Back Off", () => console.log("Back Off"));
  backOff.className = backOff.className + " tiki-back-off-btn";
  cta.appendChild(backOff);
  cta.appendChild(textBtn("I'm In", () => console.log("I'm In"), true));

  body.appendChild(cta);
  prompt.appendChild(body);
  Overlay.display(true, () => {
    document.body.removeChild(prompt);
  });
  document.body.appendChild(prompt);
}
