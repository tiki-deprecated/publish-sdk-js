/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./text-btn.css";

export default function (
  text: string,
  onClick: Function,
  isSolid: boolean = false
): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  if (isSolid) button.className = "tiki-text-btn tiki-text-btn-solid";
  else button.className = "tiki-text-btn tiki-text-btn-outline";
  button.onclick = () => onClick();
  button.innerHTML = text;
  return button;
}
