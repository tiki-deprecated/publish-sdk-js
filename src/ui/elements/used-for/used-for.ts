/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./used-for.css";
import * as Html from "./used-for-html";

export default function (bullets: Map<string, boolean>): HTMLDivElement {
  const usedFor: HTMLDivElement = document.createElement("div");

  const title: HTMLSpanElement = document.createElement("span");
  title.innerHTML = "HOW YOUR DATA WILL BE USED";
  title.className = "tiki-used-for-title";
  usedFor.appendChild(title);

  const list: HTMLUListElement = document.createElement("ul");
  list.className = "tiki-used-for-list";

  bullets.forEach((value: boolean, key: string) => {
    const element: HTMLLIElement = document.createElement("li");
    element.className = "tiki-used-for-list-item";
    const icon: HTMLTemplateElement = document.createElement("template");
    if (value) icon.innerHTML = Html.yes();
    else icon.innerHTML = Html.no();
    element.appendChild(icon.content);
    const text: HTMLSpanElement = document.createElement("span");
    text.innerHTML = key;
    element.appendChild(text);
    list.appendChild(element);
  });

  usedFor.appendChild(list);
  return usedFor;
}
