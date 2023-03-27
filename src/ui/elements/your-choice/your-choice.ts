/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./your-choice.css";
import Html from "./your-choice-html";

export default function (): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Html();
  span.className = "tiki-your-choice";
  return span;
}
