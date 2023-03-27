/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ending.css";
import YourChoice from "../../elements/your-choice/your-choice";
import Overlay from "../overlay/overlay";

export default function (text: string, settings: HTMLSpanElement): void {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-ending";

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-ending-body";
  body.appendChild(YourChoice());
  body.appendChild(title(text));
  body.appendChild(settings);

  div.appendChild(body);
  Overlay(true, () => document.body.removeChild(div));
  document.body.appendChild(div);
}

function title(text: string): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = text;
  span.className = "tiki-ending-title";
  return span;
}
