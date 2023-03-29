/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./text-btn.css";
import { cssVar } from "../../utils/null-safe";

interface Style {
  outlineColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
}

export function create(
  text: string,
  onClick: () => void,
  style?: Style
): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.className = "tiki-text-btn";
  button.onclick = onClick;
  button.innerHTML = text;
  cssVar(button, [
    { property: "--tiki-text-btn-outline-color", value: style?.outlineColor },
    {
      property: "--tiki-text-btn-background-color",
      value: style?.backgroundColor,
    },
    { property: "--tiki-text-btn-text-color", value: style?.textColor },
    { property: "--tiki-text-btn-font-family", value: style?.fontFamily },
  ]);
  return button;
}
