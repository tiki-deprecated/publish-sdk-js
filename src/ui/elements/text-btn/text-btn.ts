/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./text-btn.css";
import { cssVar } from "../../utils/null-safe";

export interface Style {
  /**
   * The button outline color
   */
  outlineColor?: string;

  /**
   * The button background color
   */
  backgroundColor?: string;

  /**
   * The text color
   */
  textColor?: string;

  /**
   * The text font family
   */
  fontFamily?: string;
}

/**
 * Create the pre-built UI element for the text button
 *
 * @param text - The button text
 * @param onClick - The callback fired on button press
 * @param style - The {@link Style} to apply to the element
 */
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
