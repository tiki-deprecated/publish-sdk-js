/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./back-btn.css";
import Html from "./back-btn-html";

export default function (text: string, onClick?: Function): HTMLDivElement {
  const container: HTMLDivElement = document.createElement("div");
  container.className = "tiki-back-btn";

  const button: HTMLButtonElement = document.createElement("button");
  button.className = "tiki-back-btn-btn";
  button.innerHTML = Html();
  if (onClick !== undefined) button.onclick = () => onClick();
  container.appendChild(button);

  const title: HTMLSpanElement = document.createElement("span");
  title.className = "tiki-back-btn-title";
  title.innerHTML = text;
  container.appendChild(title);

  return container;
}
