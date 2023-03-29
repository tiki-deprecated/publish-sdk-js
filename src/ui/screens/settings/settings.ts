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

interface Style {
  backgroundColor: string;
  fontFamily: string;
  termsBackgroundColor: string;
  termsTextColor: string;
  accentColor: string;
}

export function create(
  offer: Offer,
  onBack: () => void,
  onLearnMore: () => void,
  style?: Style
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-settings-body";
  body.appendChild(createHeading(onBack, onLearnMore));
  body.appendChild(createContent(offer));
  body.appendChild(cta());
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-settings-background-color",
      value: style?.backgroundColor,
    },
    {
      property: "--tiki-settings-font-family",
      value: style?.fontFamily,
    },
    {
      property: "--tiki-settings-terms-background-color",
      value: style?.termsBackgroundColor,
    },
    {
      property: "--tiki-settings-terms-text-color",
      value: style?.termsTextColor,
    },
    {
      property: "--tiki-settings-accent-color",
      value: style?.accentColor,
    },
  ]);
  return div;
}

function createHeading(
  onBack: () => void,
  onLearMore: () => void
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-heading";
  const left: HTMLDivElement = document.createElement("div");
  left.className = "tiki-settings-heading-left";
  left.appendChild(BackBtn.create("", onBack));
  left.appendChild(TradeYourData.create());
  div.appendChild(left);
  div.appendChild(LearnMoreBtn.create(onLearMore));
  return div;
}

function createContent(offer: Offer): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-settings-content";
  const card: HTMLDivElement = OfferCard.create(
    { src: offer._reward },
    offer._description
  );
  card.className = card.className + " tiki-settings-card";
  div.appendChild(card);

  const used: HTMLDivElement = UsedFor.create(offer._bullets);
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

function cta(isAccepted = false): HTMLButtonElement {
  const button: HTMLButtonElement = isAccepted
    ? TextBtn.create("Opt out", () => {
        //
      })
    : TextBtn.create("Opt in", () => {
        //
      });
  button.className = button.className + " tiki-settings-terms-btn";
  return button;
}
