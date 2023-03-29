/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./overlay.css";
import { cssVar } from "../../utils/null-safe";

interface Style {
  color?: string;
}

export function create(onClick?: () => void, style?: Style): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-background-overlay";
  if (onClick != undefined) div.onclick = onClick;
  cssVar(div, [
    {
      property: "--tiki-background-overlay-background-color",
      value: style?.color,
    },
  ]);
  return div;
}
