/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./used-for.css";
import * as Html from "./used-for-html";
import { Bullet } from "../../bullet";

export function create(bullets: Array<Bullet>): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.appendChild(createTitle());
  div.appendChild(createList(bullets));
  return div;
}

function createTitle(): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = "HOW YOUR DATA WILL BE USED";
  span.className = "tiki-used-for-title";
  return span;
}

function createList(bullets: Array<Bullet>): HTMLUListElement {
  const ul: HTMLUListElement = document.createElement("ul");
  ul.className = "tiki-used-for-list";
  bullets.forEach((bullet) =>
    ul.appendChild(createBullet(bullet.text, bullet.isUsed))
  );
  return ul;
}

function createBullet(text: string, isUsed = true): HTMLLIElement {
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
