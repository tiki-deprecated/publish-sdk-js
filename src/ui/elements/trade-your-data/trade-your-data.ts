/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import html from "./trade-your-data-html";

export default function (): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = html();
  span.className = "tiki-trade-your-data";
  return span;
}
