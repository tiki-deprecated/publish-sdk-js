/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Ending from "./ending";
import * as Settings from "./ending-settings-html";

export default function (onSettings?: Function): void {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Settings.accepted();
  span.className = "tiki-ending-subtitle";

  if (onSettings !== undefined) {
    const link: HTMLLinkElement = span.children.namedItem(
      "tiki-ending-settings"
    ) as HTMLLinkElement;
    link.onclick = () => onSettings();
  }

  Ending("Awesome! You're in", span);
}
