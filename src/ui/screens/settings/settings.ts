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

export default function (terms: string, isHtml: boolean = false): void {
  const page: HTMLDivElement = document.createElement("div");
  page.id = id;

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-settings-body";
  body.appendChild(heading());
  body.appendChild(content(terms, isHtml));
  body.appendChild(cta());

  page.appendChild(body);
  document.body.appendChild(page);
}

function heading(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-heading";
  const left: HTMLDivElement = document.createElement("div");
  left.className = "tiki-settings-heading-left";
  left.appendChild(BackBtn("", () => {}));
  left.appendChild(TradeYourData());
  div.appendChild(left);
  div.appendChild(LearnMoreBtn(() => {}));
  return div;
}

function content(terms: string, isHtml: boolean = false): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-content";

  const card: HTMLDivElement = OfferCard(
    "https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg",
    "Trade your IDFA (kind of like a serial # for your phone) for a discount."
  );
  card.className = card.className + " tiki-settings-card";
  div.appendChild(card);

  const used: HTMLDivElement = UsedFor(
    new Map([
      ["Learn how our ads perform", true],
      ["Reach you on other platforms", false],
      ["Sold to other companies", false],
    ])
  );
  used.className = used.className + " tiki-settings-used";

  div.appendChild(used);
  div.appendChild(termsTitle());
  div.appendChild(termsLegal(terms, isHtml));
  return div;
}

function termsTitle(): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.className = "tiki-settings-terms-title";
  span.innerHTML = "TERMS & CONDITIONS";
  return span;
}

function termsLegal(terms: string, isHtml: boolean = false): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-terms-legal";
  if (isHtml) div.innerHTML = terms;
  else div.innerHTML = NanoMd(terms);
  return div;
}

function cta(isAccepted: boolean = false): HTMLButtonElement {
  const button: HTMLButtonElement = isAccepted
    ? TextBtn("Opt out", () => {})
    : TextBtn("Opt in", () => {}, true);
  button.className = button.className + " tiki-settings-terms-btn";
  return button;
}
