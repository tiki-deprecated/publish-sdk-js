/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ending.css";
import * as YourChoice from "../../elements/your-choice/your-choice";

export function create(
  text: string,
  settings: HTMLSpanElement
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-ending";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-ending-body";
  body.appendChild(YourChoice.create());
  body.appendChild(createTitle(text));
  body.appendChild(settings);
  div.appendChild(body);
  return div;
}

function createTitle(text: string): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = text;
  span.className = "tiki-ending-title";
  return span;
}
