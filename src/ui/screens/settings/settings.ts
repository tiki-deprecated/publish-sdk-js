/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./settings.css";
import * as BackBtn from "../../elements/back-btn/back-btn";
import * as OfferCard from "../../elements/offer-card/offer-card";
import * as UsedFor from "../../elements/used-for/used-for";
import * as TradeYourData from "../../elements/trade-your-data/trade-your-data";
import * as LearnMoreBtn from "../../elements/learn-more-btn/learn-more-btn";
import { toHtml } from "../../utils/nano-md";
import * as TextBtn from "../../elements/text-btn/text-btn";
import { Offer } from "../../offer";
import { cssVar } from "../../utils/null-safe";
import { Theme } from "../../theme";

export function create(
  offer: Offer,
  isOptIn: boolean,
  onBack: () => void,
  onLearnMore: () => void,
  onOpt: () => void,
  theme: Theme = new Theme()
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-settings-body";
  body.appendChild(createHeading(onBack, onLearnMore, theme));
  body.appendChild(createContent(offer, theme));
  body.appendChild(cta(isOptIn, onOpt, theme));
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-settings-background-color",
      value: theme._secondaryBackgroundColor,
    },
    { property: "--tiki-settings-font-family", value: theme._fontFamily },
    {
      property: "--tiki-settings-terms-background-color",
      value: theme._primaryBackgroundColor,
    },
    {
      property: "--tiki-settings-terms-text-color",
      value: theme._primaryTextColor,
    },
    { property: "--tiki-settings-accent-color", value: theme._accentColor },
  ]);
  return div;
}

function createHeading(
  onBack: () => void,
  onLearMore: () => void,
  theme: Theme
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-heading";
  const left: HTMLDivElement = document.createElement("div");
  left.className = "tiki-settings-heading-left";
  left.appendChild(
    BackBtn.create("", onBack, {
      color: theme._primaryTextColor,
    })
  );
  left.appendChild(
    TradeYourData.create({
      textColor: theme._primaryTextColor,
      accentColor: theme._accentColor,
      fontFamily: theme._fontFamily,
    })
  );
  div.appendChild(left);
  div.appendChild(
    LearnMoreBtn.create(onLearMore, {
      color: theme._secondaryTextColor,
    })
  );
  return div;
}

function createContent(offer: Offer, theme: Theme): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-content";
  const card: HTMLDivElement = OfferCard.create(
    { src: offer._reward },
    offer._description,
    {
      fontFamily: theme._fontFamily,
      textColor: theme._secondaryTextColor,
      backgroundColor: theme._primaryBackgroundColor,
    }
  );
  card.className = card.className + " tiki-settings-card";
  div.appendChild(card);

  const used: HTMLDivElement = UsedFor.create(offer._bullets, {
    titleColor: theme._primaryTextColor,
    textColor: theme._secondaryTextColor,
    fontFamily: theme._fontFamily,
  });
  used.className = used.className + " tiki-settings-used";
  div.appendChild(used);
  div.appendChild(createTermsTitle());
  div.appendChild(createTermsLegal(offer._terms));
  return div;
}

function createTermsTitle(): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.className = "tiki-settings-terms-title";
  span.innerHTML = "TERMS & CONDITIONS";
  return span;
}

function createTermsLegal(terms: string, isHtml = false): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-terms-legal";
  if (isHtml) div.innerHTML = terms;
  else div.innerHTML = toHtml(terms);
  return div;
}

function cta(
  isAccepted = false,
  onOpt: () => void,
  theme: Theme
): HTMLButtonElement {
  const button: HTMLButtonElement = isAccepted
    ? TextBtn.create("Opt out", onOpt, {
        outlineColor: theme._accentColor,
        backgroundColor: theme._primaryBackgroundColor,
        fontFamily: theme._fontFamily,
        textColor: theme._primaryTextColor,
      })
    : TextBtn.create("Opt in", onOpt, {
        outlineColor: theme._accentColor,
        backgroundColor: theme._accentColor,
        fontFamily: theme._fontFamily,
        textColor: theme._primaryBackgroundColor,
      });
  button.className = button.className + " tiki-settings-terms-btn";
  return button;
}
