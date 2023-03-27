/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./used-for.css";
import * as Html from "./used-for-html";

export default function (bullets: Map<string, boolean>): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.appendChild(title());
  div.appendChild(bulletList(bullets));
  return div;
}

function title(): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = "HOW YOUR DATA WILL BE USED";
  span.className = "tiki-used-for-title";
  return span;
}

function bulletList(bullets: Map<string, boolean>): HTMLUListElement {
  const ul: HTMLUListElement = document.createElement("ul");
  ul.className = "tiki-used-for-list";
  bullets.forEach((value: boolean, key: string) =>
    ul.appendChild(bullet(key, value))
  );
  return ul;
}

function bullet(text: string, isUsed: boolean = true): HTMLLIElement {
  const li: HTMLLIElement = document.createElement("li");
  li.className = "tiki-used-for-list-item";
  const template: HTMLTemplateElement = document.createElement("template");
  if (isUsed) template.innerHTML = Html.yes();
  else template.innerHTML = Html.no();
  li.appendChild(template.content);
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = text;
  li.appendChild(span);
  return li;
}
