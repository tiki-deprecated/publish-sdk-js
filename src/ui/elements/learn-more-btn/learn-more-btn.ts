/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more-btn.css";
import html from "./learn-more-btn-html";

export default function (onClick: Function): Node {
  const button: HTMLButtonElement = document.createElement("button");
  button.innerHTML = html().replace(/<!--[\s\S]*?-->/g, "");
  button.onclick = () => onClick();
  button.className = "tiki-learn-more-button";
  return button;
}
