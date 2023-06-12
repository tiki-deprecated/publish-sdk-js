/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./back-btn.css";
import Html from "./back-btn-html";
import { cssVar } from "../../utils/null-safe";

export interface Style {
  /**
   * The button color
   */
  color?: string;
}

/**
 * Create the pre-built UI element for the back button
 *
 * @param text - The button text
 * @param onClick - Callback fired on button click
 * @param style - The {@link Style} to apply to the element
 */
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
