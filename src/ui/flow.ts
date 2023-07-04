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
import { Title, License } from "../trail/trail";
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
      const offer = config._offers[0];
      const terms = await Terms.create(
        {
          src: config._offers[0]._terms,
          isHtml: offer._termsIsHtml
        },
        async () => {
          const offer = config._offers[0];
          let titleRecord: Title.TitleRecord | undefined = Title.getByPtr(
            offer._ptr
          );
          if (titleRecord === undefined) {
            titleRecord = await Title.create(offer._ptr, offer._tags);
          }
          const licenseRecord: License.LicenseRecord = await License.create(
            titleRecord.id,
            offer._uses,
            offer._terms,
            offer._description,
            offer._expiry
          );
          terms.remove();
          if (config._onAccept != undefined)
            config._onAccept(config._offers[0], licenseRecord);
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
      console.log("trying to create settings.");
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
          let titleRecord: Title.TitleRecord | undefined = Title.getByPtr(
            offer._ptr
          );
          if (titleRecord === undefined) {
            titleRecord = await Title.create(offer._ptr, offer._tags);
          }
          if (optIn) {
            const record: License.LicenseRecord = await License.create(
              titleRecord.id,
              [],
              offer._terms,
              offer._description,
              offer._expiry
            );
            if (config._onDecline != undefined)
              config._onDecline(offer, record);
            settings.remove();
            goTo(FlowStep.settings, config);
          } else {
            const record: License.LicenseRecord = await License.create(
              titleRecord.id,
              offer._uses,
              offer._terms,
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
  console.log("in isOptIn");
  const titleRecord: Title.TitleRecord | undefined = Title.getByPtr(offer._ptr);
  let licenseRecord: License.LicenseRecord | undefined = undefined;
  if (titleRecord !== undefined) {
    licenseRecord = License.getLatest(titleRecord.id);
  }
  return (
    licenseRecord != undefined &&
    licenseRecord.uses.length > 0 &&
    licenseRecord.uses[0].usecases.length > 0
  );
}
