/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Settings from "./ending-settings-html";
import * as Ending from "./ending";
import { Theme } from "../../theme";

/**
 * Create the pre-built UI for an offer declined ending.
 *
 * @param onSettings - Callback fired when the user selects the settings link
 * @param theme - {@link Theme} used to style the UI
 */
export function create(
  onSettings?: () => void,
  theme: Theme = new Theme()
): HTMLDivElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Settings.declined();
  span.className = "tiki-ending-subtitle";
  if (onSettings !== undefined) {
    const link = span.children.namedItem(
      "tiki-ending-settings"
    ) as HTMLLinkElement;
    link.onclick = () => onSettings();
  }
  return Ending.create("Backing Off", span, theme);
}
