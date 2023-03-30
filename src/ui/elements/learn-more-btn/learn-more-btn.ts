/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more-btn.css";
import Html from "./learn-more-btn-html";
import { cssVar } from "../../utils/null-safe";

interface Style {
  color?: string;
}

export function create(onClick: () => void, style?: Style): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.innerHTML = Html();
  button.onclick = onClick;
  button.className = "tiki-learn-more-button";
  cssVar(button, [
    { property: "--tiki-learn-more-btn-fill", value: style?.color },
  ]);
  return button;
}
