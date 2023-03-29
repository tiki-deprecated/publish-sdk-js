/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./overlay.css";

export function create(onClick?: () => void): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-background-overlay";
  if (onClick != undefined) {
    div.onclick = onClick;
  }
  return div;
}
