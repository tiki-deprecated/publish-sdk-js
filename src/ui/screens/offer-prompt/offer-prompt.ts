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
import { cssVar } from "../../utils/null-safe";
import { Theme } from "../../theme";

/**
 * Create the pre-built UI for the offer pop-up.
 *
 * @param offer - The {@link Offer} to present to the user
 * @param onAccept - Callback fired when the user accepts the offer
 * @param onDecline - Callback fired when the user declines the offer
 * @param onLearnMore - Callback fired when the user selects the learn more button
 * @param theme - {@link Theme} used to style the UI
 */
export function create(
  offer: Offer,
  onAccept: (offer: Offer) => void,
  onDecline: (offer: Offer) => void,
  onLearnMore: () => void,
  theme: Theme = new Theme()
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-offer-prompt-body";
  body.appendChild(createHeading(onLearnMore, theme));
  body.appendChild(createOffer(offer, theme));
  body.appendChild(
    createCta(
      () => onAccept(offer),
      () => onDecline(offer),
      theme
    )
  );
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-offer-prompt-background-color",
      value: theme._secondaryBackgroundColor,
    },
    { property: "--tiki-offer-prompt-font-family", value: theme._fontFamily },
  ]);
  return div;
}

function createHeading(onLearnMore: () => void, theme: Theme): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt-heading";
  div.appendChild(
    TradeYourData.create({
      textColor: theme._primaryTextColor,
      accentColor: theme._accentColor,
      fontFamily: theme._fontFamily,
    })
  );
  div.appendChild(
    LearnMoreBtn.create(onLearnMore, {
      color: theme._secondaryTextColor,
    })
  );
  return div;
}

function createOffer(offer: Offer, theme: Theme): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  const card: HTMLDivElement = OfferCard.create(
    { src: offer._reward },
    offer._description,
    {
      backgroundColor: theme._primaryBackgroundColor,
      textColor: theme._secondaryTextColor,
      fontFamily: theme._fontFamily,
    }
  );
  div.appendChild(card);
  const usedFor: HTMLDivElement = UsedFor.create(offer._bullets, {
    textColor: theme._secondaryTextColor,
    titleColor: theme._primaryTextColor,
    fontFamily: theme._fontFamily,
  });
  usedFor.className = "tiki-used-for";
  div.appendChild(usedFor);
  return div;
}

function createCta(
  onAccept: () => void,
  onDecline: () => void,
  theme: Theme
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-prompt-cta";
  const backOff: HTMLButtonElement = TextBtn.create("Back Off", onDecline, {
    textColor: theme._primaryTextColor,
    backgroundColor: theme._primaryBackgroundColor,
    outlineColor: theme._accentColor,
    fontFamily: theme._fontFamily,
  });
  backOff.className = backOff.className + " tiki-back-off-btn";
  div.appendChild(backOff);
  div.appendChild(
    TextBtn.create("I'm In", onAccept, {
      textColor: theme._primaryBackgroundColor,
      backgroundColor: theme._accentColor,
      outlineColor: theme._accentColor,
      fontFamily: theme._fontFamily,
    })
  );
  return div;
}
