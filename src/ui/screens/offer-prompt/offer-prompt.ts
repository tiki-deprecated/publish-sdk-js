/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-prompt.css";
import * as Overlay from "../overlay/overlay";
import tradeYourData from "../../elements/trade-your-data/trade-your-data";
import learnMoreBtn from "../../elements/learn-more-btn/learn-more-btn";

const id = "tiki-offer-prompt";

export default function () {
  const prompt = document.createElement("div");
  prompt.id = id;

  const body = document.createElement("div");
  body.className = "tiki-offer-prompt-body";

  const heading = document.createElement("div");
  heading.className = "tiki-offer-prompt-heading";
  heading.appendChild(tradeYourData());
  heading.appendChild(
    learnMoreBtn(() => {
      console.log("you clicked me!");
    })
  );

  body.appendChild(heading);
  prompt.appendChild(body);

  Overlay.display(true, () => {
    document.body.removeChild(prompt);
  });
  document.body.appendChild(prompt);
}
