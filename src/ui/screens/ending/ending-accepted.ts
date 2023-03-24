/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import Ending from "./ending";
import * as Settings from "./ending-settings-html";

export default function (onSettings?: Function) {
  const settings: HTMLSpanElement = document.createElement("span");
  settings.innerHTML = Settings.accepted();
  settings.className = "tiki-ending-subtitle";

  const link = settings.children.namedItem(
    "tiki-ending-settings"
  ) as HTMLLinkElement;
  if (onSettings !== undefined) link.onclick = () => onSettings();

  Ending("Awesome! You're in", settings);
}
