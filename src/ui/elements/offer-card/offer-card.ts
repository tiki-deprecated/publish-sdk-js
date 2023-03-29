/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-card.css";

export function create(
  src: string,
  text: string,
  alt?: string
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-card";
  div.appendChild(createImg(src, alt));
  div.appendChild(createDescription(text));
  return div;
}

function createImg(src: string, alt?: string): HTMLImageElement {
  const image: HTMLImageElement = document.createElement("img");
  image.className = "tiki-offer-card-img";
  image.src = src;
  image.alt = alt;
  return image;
}

function createDescription(text: string): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.className = "tiki-offer-card-text";
  const cell: HTMLDivElement = document.createElement("div");
  cell.innerHTML = text;
  cell.className = "tiki-offer-card-text-cell";
  span.appendChild(cell);
  return span;
}
