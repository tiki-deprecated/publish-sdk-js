/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-prompt.css";
import html from "./offer-prompt-html";
import * as Overlay from "../overlay/overlay";

const id = "tiki-offer-prompt";

export default function () {
  const prompt = document.createElement("div");
  prompt.id = id;
  prompt.innerHTML = html();
  Overlay.display(true, () => {
    document.body.removeChild(prompt);
  });
  document.body.appendChild(prompt);
}
