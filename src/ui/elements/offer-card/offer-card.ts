/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-card.css";

export default function (
  img: string,
  text: string,
  alt?: string
): HTMLDivElement {
  const card: HTMLDivElement = document.createElement("div");
  card.className = "tiki-offer-card";

  const imageElement: HTMLImageElement = document.createElement("img");
  imageElement.className = "tiki-offer-card-img";
  imageElement.src = img;
  imageElement.alt = alt;
  card.appendChild(imageElement);

  const textElement: HTMLSpanElement = document.createElement("span");
  textElement.className = "tiki-offer-card-text";
  const cell: HTMLDivElement = document.createElement("div");
  cell.innerHTML = text;
  cell.className = "tiki-offer-card-text-cell";
  textElement.appendChild(cell);
  card.appendChild(textElement);

  return card;
}
