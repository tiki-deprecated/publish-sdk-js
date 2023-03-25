/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./settings.css";
import BackBtn from "../../elements/back-btn/back-btn";
import OfferCard from "../../elements/offer-card/offer-card";
import UsedFor from "../../elements/used-for/used-for";
import TradeYourData from "../../elements/trade-your-data/trade-your-data";
import LearnMoreBtn from "../../elements/learn-more-btn/learn-more-btn";
import NanoMd from "../../nano-md";
import TextBtn from "../../elements/text-btn/text-btn";

const id = "tiki-settings";

export default function (terms: string, isHtml: boolean = false) {
  const page: HTMLDivElement = document.createElement("div");
  page.id = id;

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-settings-body";

  const heading: HTMLDivElement = document.createElement("div");
  heading.className = "tiki-settings-heading";
  const headingLeft: HTMLDivElement = document.createElement("div");
  headingLeft.className = "tiki-settings-heading-left";
  headingLeft.appendChild(BackBtn("", () => {}));
  headingLeft.appendChild(TradeYourData());
  heading.appendChild(headingLeft);
  heading.appendChild(LearnMoreBtn(() => {}));
  body.appendChild(heading);

  const content: HTMLDivElement = document.createElement("div");
  content.className = "tiki-settings-content";

  const card: HTMLDivElement = OfferCard(
    "https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg",
    "Trade your IDFA (kind of like a serial # for your phone) for a discount."
  );
  card.className = card.className + " tiki-settings-card";
  content.appendChild(card);

  const used: HTMLDivElement = UsedFor(
    new Map([
      ["Learn how our ads perform", true],
      ["Reach you on other platforms", false],
      ["Sold to other companies", false],
    ])
  );
  used.className = used.className + " tiki-settings-used";
  content.appendChild(used);

  const legalTitle: HTMLSpanElement = document.createElement("span");
  legalTitle.className = "tiki-settings-terms-title";
  legalTitle.innerHTML = "TERMS & CONDITIONS";
  content.appendChild(legalTitle);

  const legalTerms: HTMLDivElement = document.createElement("div");
  legalTerms.className = "tiki-settings-terms-legal";
  if (isHtml) legalTerms.innerHTML = terms;
  else legalTerms.innerHTML = NanoMd(terms);
  content.appendChild(legalTerms);
  body.appendChild(content);

  const btn: HTMLButtonElement = TextBtn("Opt out", () => {});
  btn.className = btn.className + " tiki-settings-terms-btn";
  body.appendChild(btn);
  page.appendChild(body);
  document.body.appendChild(page);
}
