/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "../theme.css";
import * as Overlay from "../elements/overlay/overlay";
import * as OfferPrompt from "./offer-prompt/offer-prompt";
import * as LearnMore from "./learn-more/learn-more";
import * as Terms from "./terms/terms";
import * as EndingAccepted from "./ending/ending-accepted";
import * as EndingDeclined from "./ending/ending-declined";
import * as Settings from "./settings/settings";
import { FlowStep } from "./flow-step";
import { Offer } from "./offer";

const id = "tiki-offer";
const overlayId = "tiki-offer-overlay";

const offer: Offer = {
  id: "1",
  description:
    "Trade your IDFA (kind of like a serial # for your phone) for a discount.",
  terms: "# TERMS in md.",
  reward:
    "https://static.vecteezy.com/system/resources/previews/011/765/527/original/smiley-face-seamless-pattern-design-cute-colorful-retro-doodle-emoji-smile-background-free-vector.jpg",
  bullets: [
    {
      text: "Learn how our ads perform",
      isUsed: true,
    },
    {
      text: "Reach you on other platforms",
      isUsed: false,
    },
    {
      text: "Sold to other companies",
      isUsed: false,
    },
  ],
};

export function flow(start: FlowStep = FlowStep.prompt): void {
  if (document.getElementById(id) == null) {
    const div: HTMLDivElement = document.createElement("div");
    div.id = id;
    div.appendChild(createOverlay());
    document.body.appendChild(div);
    goTo(start);
  }
}

function goTo(step: FlowStep, from?: FlowStep): void {
  switch (step) {
    case FlowStep.none: {
      const element: HTMLElement = document.getElementById(id);
      if (element != null) element.remove();
      break;
    }
    case FlowStep.prompt: {
      const offerPrompt = OfferPrompt.create(
        offer,
        (offer) => {
          offerPrompt.remove();
          goTo(FlowStep.terms);
        },
        (offer) => {
          // callback
          offerPrompt.remove();
          //if ending enabled
          //if not, and callback
          goTo(FlowStep.endingDeclined);
        },
        () => {
          offerPrompt.remove();
          goTo(FlowStep.learnMore, FlowStep.prompt);
        }
      );
      showScreen(offerPrompt);
      break;
    }
    case FlowStep.learnMore: {
      const learnMore = LearnMore.create(() => {
        learnMore.remove();
        if (from === FlowStep.settings) goTo(FlowStep.settings);
        else goTo(FlowStep.prompt);
      });
      showScreen(learnMore);
      break;
    }
    case FlowStep.terms: {
      const terms = Terms.create(
        offer.terms,
        () => {
          terms.remove();
          goTo(FlowStep.endingAccepted);
        },
        () => {
          terms.remove();
          goTo(FlowStep.prompt);
        }
      );
      showScreen(terms);
      break;
    }
    case FlowStep.endingAccepted: {
      const endingAccepted = EndingAccepted.create(() => {
        endingAccepted.remove();
        goTo(FlowStep.settings);
      });
      showScreen(endingAccepted);
      break;
    }
    case FlowStep.endingDeclined: {
      const endingDeclined = EndingDeclined.create(() => {
        endingDeclined.remove();
        goTo(FlowStep.settings);
      });
      showScreen(endingDeclined);
      break;
    }
    case FlowStep.settings: {
      const settings = Settings.create(
        offer,
        () => {
          settings.remove();
          goTo(FlowStep.none);
        },
        () => {
          settings.remove();
          goTo(FlowStep.learnMore, FlowStep.settings);
        }
      );
      showScreen(settings);
      break;
    }
  }
}

function showScreen(screen: HTMLDivElement): void {
  const div: HTMLElement = document.getElementById(id);
  if (div != null) {
    div.appendChild(screen);
  }
}

function createOverlay(): HTMLDivElement {
  const overlay: HTMLDivElement = Overlay.create(() => goTo(FlowStep.none));
  overlay.id = overlayId;
  return overlay;
}
