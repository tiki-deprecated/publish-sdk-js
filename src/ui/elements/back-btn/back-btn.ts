/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./back-btn.css";
import Html from "./back-btn-html";

export default function (text: string, onClick?: Function): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.className = "tiki-back-btn";
  button.innerHTML = Html();
  if (onClick !== undefined) button.onclick = () => onClick();
  return button;
}
