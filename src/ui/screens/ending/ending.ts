/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ending.css";
import YourChoice from "../../elements/your-choice/your-choice";
import Overlay from "../overlay/overlay";

export default function (text: string, settings: HTMLSpanElement) {
  const ending: HTMLDivElement = document.createElement("div");
  ending.className = "tiki-ending";

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-ending-body";
  body.appendChild(YourChoice());

  const title: HTMLSpanElement = document.createElement("span");
  title.innerHTML = text;
  title.className = "tiki-ending-title";
  body.appendChild(title);
  body.appendChild(settings);

  ending.appendChild(body);
  Overlay(true, () => {
    document.body.removeChild(ending);
  });
  document.body.appendChild(ending);
}
