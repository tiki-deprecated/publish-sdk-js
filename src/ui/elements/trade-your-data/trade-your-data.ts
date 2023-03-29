/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./trade-your-data.css";
import Html from "./trade-your-data-html";

export function create(): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Html();
  span.className = "tiki-trade-your-data";
  return span;
}
