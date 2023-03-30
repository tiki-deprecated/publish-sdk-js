/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./back-btn.css";
import Html from "./back-btn-html";
import { cssVar } from "../../utils/null-safe";

interface Style {
  color?: string;
}

export function create(
  text: string,
  onClick?: () => void,
  style?: Style
): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.className = "tiki-back-btn";
  button.innerHTML = Html();
  if (onClick !== undefined) button.onclick = onClick;
  cssVar(button, [{ property: "--tiki-back-btn-fill", value: style?.color }]);
  return button;
}
