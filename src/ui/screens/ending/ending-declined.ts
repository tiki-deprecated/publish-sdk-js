/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Settings from "./ending-settings-html";
import Ending from "./ending";

export default function (onSettings?: Function): void {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Settings.declined();
  span.className = "tiki-ending-subtitle";

  if (onSettings !== undefined) {
    const link = span.children.namedItem(
      "tiki-ending-settings"
    ) as HTMLLinkElement;
    link.onclick = () => onSettings();
  }

  Ending("Backing Off", span);
}
