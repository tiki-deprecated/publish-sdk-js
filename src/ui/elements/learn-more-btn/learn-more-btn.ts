/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more-btn.css";
import Html from "./learn-more-btn-html";
import { cssVar } from "../../utils/null-safe";

export interface Style {
  /**
   * The button color
   */
  color?: string;
}

/**
 * Create the pre-built UI element for the learn more button
 *
 * @param onClick - The callback fired when clicked
 * @param style - The {@link Style} to apply to the element
 */
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
