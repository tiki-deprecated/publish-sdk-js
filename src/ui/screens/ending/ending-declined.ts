/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as Settings from "./ending-settings-html";
import Ending from "./ending";

export default function (onSettings?: Function) {
  const settings: HTMLSpanElement = document.createElement("span");
  settings.innerHTML = Settings.declined();
  settings.className = "tiki-ending-subtitle";

  const link = settings.children.namedItem(
    "tiki-ending-settings"
  ) as HTMLLinkElement;
  if (onSettings !== undefined) link.onclick = () => onSettings();

  Ending("Backing Off", settings);
}
