/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./used-for.css";
import * as Html from "./used-for-html";
import { Bullet } from "../../bullet";
import { cssVar } from "../../utils/null-safe";

interface Style {
  titleColor?: string;
  textColor?: string;
  fontFamily?: string;
}

export function create(bullets: Array<Bullet>, style?: Style): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.appendChild(createTitle());
  div.appendChild(createList(bullets));
  div.className = "tiki-used-for";
  cssVar(div, [
    { property: "--tiki-used-for-title-color", value: style?.titleColor },
    { property: "--tiki-used-for-text-color", value: style?.textColor },
    { property: "--tiki-used-for-font-family", value: style?.fontFamily },
  ]);
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
