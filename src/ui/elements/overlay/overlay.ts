/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./overlay.css";
import { cssVar } from "../../utils/null-safe";

export interface Style {
  /**
   * The color of the overlay
   */
  color?: string;
}

/**
 * Create the pre-built UI element for the full-screen overlay
 *
 * @param onClick - The callback fired when selected
 * @param style - The {@link Style} to apply to the element
 */
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
