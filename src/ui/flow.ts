/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./theme.css";
import * as Overlay from "./elements/overlay/overlay";
import * as OfferPrompt from "./screens/offer-prompt/offer-prompt";
import * as LearnMore from "./screens/learn-more/learn-more";
import * as Terms from "./screens/terms/terms";
import * as EndingAccepted from "./screens/ending/ending-accepted";
import * as EndingDeclined from "./screens/ending/ending-declined";
import * as Settings from "./screens/settings/settings";
import { FlowStep } from "./flow-step";
import { Config } from "../config";
import { LicenseRecord } from "../license-record";
import { latest, license } from "../core/core";
import { Offer } from "./offer";

const id = "tiki-offer";
const overlayId = "tiki-offer-overlay";

export function flow(start: FlowStep = FlowStep.prompt, config?: Config): void {
  if (document.getElementById(id) == null) {
    const div: HTMLDivElement = document.createElement("div");
    div.id = id;
    div.appendChild(createOverlay());
    document.body.appendChild(div);
    goTo(start, config);
  }
}

async function goTo(
  step: FlowStep,
  config?: Config,
  from?: FlowStep
): Promise<void> {
  switch (step) {
    case FlowStep.none: {
      const element: HTMLElement = document.getElementById(id);
      if (element != null) element.remove();
      break;
    }
    case FlowStep.prompt: {
      const offerPrompt = OfferPrompt.create(
        config._offers[0],
        (offer) => {
          offerPrompt.remove();
          goTo(FlowStep.terms, config);
        },
        (offer) => {
          offerPrompt.remove();
          if (config._onDecline != undefined) config._onDecline(offer);
          if (config._isDeclineEndingDisabled) goTo(FlowStep.none);
          else goTo(FlowStep.endingDeclined, config);
        },
        () => {
          offerPrompt.remove();
          goTo(FlowStep.learnMore, config, FlowStep.prompt);
        },
        config.activeTheme
      );
      showScreen(offerPrompt);
      break;
    }
    case FlowStep.learnMore: {
      const learnMore = LearnMore.create(() => {
        learnMore.remove();
        if (from === FlowStep.settings) goTo(FlowStep.settings, config);
        else goTo(FlowStep.prompt, config);
      }, config.activeTheme);
      showScreen(learnMore);
      break;
    }
    case FlowStep.terms: {
      const terms = await Terms.create(
        {
          src: config._offers[0]._terms,
        },
        async () => {
          const offer = config._offers[0];
          const record: LicenseRecord = await license(
            offer._ptr,
            offer._uses,
            offer._terms,
            offer._tags,
            offer._description,
            offer._expiry
          );
          terms.remove();
          if (config._onAccept != undefined)
            config._onAccept(config._offers[0], record);
          if (config._isAcceptEndingDisabled) goTo(FlowStep.none);
          else goTo(FlowStep.endingAccepted, config);
        },
        () => {
          terms.remove();
          goTo(FlowStep.prompt, config);
        },
        config.activeTheme
      );
      showScreen(terms);
      break;
    }
    case FlowStep.endingAccepted: {
      const endingAccepted = EndingAccepted.create(() => {
        endingAccepted.remove();
        if (config._onSettings != undefined) {
          config._onSettings();
          goTo(FlowStep.none);
        } else goTo(FlowStep.settings, config);
      }, config.activeTheme);
      showScreen(endingAccepted);
      break;
    }
    case FlowStep.endingDeclined: {
      const endingDeclined = EndingDeclined.create(() => {
        endingDeclined.remove();
        if (config._onSettings != undefined) {
          config._onSettings();
          goTo(FlowStep.none);
        } else goTo(FlowStep.settings, config);
      }, config.activeTheme);
      showScreen(endingDeclined);
      break;
    }
    case FlowStep.settings: {
      const offer: Offer = config._offers[0];
      const optIn: boolean = isOptIn(offer);
      const settings = Settings.create(
        config._offers[0],
        optIn,
        () => {
          settings.remove();
          goTo(FlowStep.none);
        },
        () => {
          settings.remove();
          goTo(FlowStep.learnMore, config, FlowStep.settings);
        },
        async () => {
          if (optIn) {
            const record: LicenseRecord = await license(
              offer._ptr,
              [],
              offer._terms,
              offer._tags,
              offer._description,
              offer._expiry
            );
            if (config._onDecline != undefined)
              config._onDecline(offer, record);
            settings.remove();
            goTo(FlowStep.settings, config);
          } else {
            const record: LicenseRecord = await license(
              offer._ptr,
              offer._uses,
              offer._terms,
              offer._tags,
              offer._description,
              offer._expiry
            );
            if (config._onAccept != undefined) config._onAccept(offer, record);
            settings.remove();
            goTo(FlowStep.settings, config);
          }
        },
        config.activeTheme
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

function isOptIn(offer: Offer): boolean {
  const license: LicenseRecord | undefined = latest(offer._ptr);
  return (
    license != undefined &&
    license.uses.length > 0 &&
    license.uses[0].usecases.length > 0
  );
}
