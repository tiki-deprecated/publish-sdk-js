/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-prompt.css";
import * as TradeYourData from "../../elements/trade-your-data/trade-your-data";
import * as LearnMoreBtn from "../../elements/learn-more-btn/learn-more-btn";
import * as TextBtn from "../../elements/text-btn/text-btn";
import * as UsedFor from "../../elements/used-for/used-for";
import * as OfferCard from "../../elements/offer-card/offer-card";
import { Offer } from "../../offer";

export function create(
  offer: Offer,
  onAccept: (offer: Offer) => void,
  onDecline: (offer: Offer) => void,
  onLearnMore: () => void
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-offer-prompt-body";
  body.appendChild(createHeading(onLearnMore));
  body.appendChild(createOffer(offer));
  body.appendChild(
    createCta(
      () => onAccept(offer),
      () => onDecline(offer)
    )
  );
  div.appendChild(body);
  return div;
}

function createHeading(onLearnMore: () => void): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt-heading";
  div.appendChild(TradeYourData.create());
  div.appendChild(LearnMoreBtn.create(onLearnMore));
  return div;
}

function createOffer(offer: Offer): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  const card: HTMLDivElement = OfferCard.create(
    offer._reward,
    offer._description
  );
  div.appendChild(card);
  const usedFor: HTMLDivElement = UsedFor.create(offer._bullets);
  usedFor.className = "tiki-used-for";
  div.appendChild(usedFor);
  return div;
}

function createCta(
  onAccept: () => void,
  onDecline: () => void
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt-cta";
  const backOff: HTMLButtonElement = TextBtn.create("Back Off", onDecline);
  backOff.className = backOff.className + " tiki-back-off-btn";
  div.appendChild(backOff);
  div.appendChild(TextBtn.create("I'm In", onAccept, true));
  return div;
}
