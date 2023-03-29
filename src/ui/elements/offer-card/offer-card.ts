/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-card.css";
import { cssVar } from "../../utils/null-safe";

interface Style {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
}

interface Img {
  src: string;
  alt?: string;
}

export function create(img: Img, text: string, style?: Style): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-offer-card";
  div.appendChild(createImg(img.src, img.alt));
  div.appendChild(createDescription(text));
  cssVar(div, [
    {
      property: "--tiki-offer-card-background-color",
      value: style?.backgroundColor,
    },
    {
      property: "--tiki-offer-card-text-color",
      value: style?.textColor,
    },
    {
      property: "--tiki-offer-card-font-family",
      value: style?.fontFamily,
    },
  ]);
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
