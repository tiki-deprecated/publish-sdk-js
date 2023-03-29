/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Settings from "./ending-settings-html";
import * as Ending from "./ending";

interface Style {
  backgroundColor: string;
  fontFamily: string;
  titleColor: string;
  textColor: string;
}

export function create(onSettings?: () => void, style?: Style): HTMLDivElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Settings.declined();
  span.className = "tiki-ending-subtitle";
  if (onSettings !== undefined) {
    const link = span.children.namedItem(
      "tiki-ending-settings"
    ) as HTMLLinkElement;
    link.onclick = () => onSettings();
  }
  return Ending.create("Backing Off", span, style);
}
