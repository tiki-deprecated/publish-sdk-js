/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-prompt.css";
import Overlay from "../overlay/overlay";
import TradeYourData from "../../elements/trade-your-data/trade-your-data";
import LearnMoreBtn from "../../elements/learn-more-btn/learn-more-btn";
import TextBtn from "../../elements/text-btn/text-btn";
import UsedFor from "../../elements/used-for/used-for";
import OfferCard from "../../elements/offer-card/offer-card";

export default function (): void {
  const prompt: HTMLDivElement = document.createElement("div");
  prompt.className = "tiki-offer-prompt";

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-offer-prompt-body";
  body.appendChild(heading());
  body.appendChild(offer());
  body.appendChild(cta());

  prompt.appendChild(body);
  Overlay(true, () => document.body.removeChild(prompt));
  document.body.appendChild(prompt);
}

function heading(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt-heading";
  div.appendChild(TradeYourData());
  div.appendChild(LearnMoreBtn(() => console.log("Learn More")));
  return div;
}

function offer(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  const card: HTMLDivElement = OfferCard(
    "https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg",
    "Trade your IDFA (kind of like a serial # for your phone) for a discount."
  );
  div.appendChild(card);
  const usedFor: HTMLDivElement = UsedFor(
    new Map([
      ["Learn how our ads perform", true],
      ["Reach you on other platforms", false],
      ["Sold to other companies", false],
    ])
  );
  usedFor.className = "tiki-used-for";
  div.appendChild(usedFor);
  return div;
}

function cta(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt-cta";
  const backOff: HTMLButtonElement = TextBtn("Back Off", () =>
    console.log("Back Off")
  );
  backOff.className = backOff.className + " tiki-back-off-btn";
  div.appendChild(backOff);
  div.appendChild(TextBtn("I'm In", () => console.log("I'm In"), true));
  return div;
}
