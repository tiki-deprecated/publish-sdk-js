/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more-btn.css";
import Html from "./learn-more-btn-html";

export default function (onClick: Function): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.innerHTML = Html();
  button.onclick = () => onClick();
  button.className = "tiki-learn-more-button";
  return button;
}
