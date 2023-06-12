/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./offer-card.css";
import { cssVar } from "../../utils/null-safe";

export interface Style {
  /**
   * The background color of the card
   */
  backgroundColor?: string;

  /**
   * The text color
   */
  textColor?: string;

  /**
   * The text font family
   */
  fontFamily?: string;
}

export interface Img {
  /**
   * The src (URL) for the image to display
   */
  src: string;

  /**
   * The alt text for the image
   */
  alt?: string;
}

/**
 * Create the pre-built UI element for the offer card
 *
 * @param img - The offer {@link Img} to display
 * @param text - The offer text to display
 * @param style - The {@link Style} to apply to the element
 */
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
    { property: "--tiki-offer-card-text-color", value: style?.textColor },
    { property: "--tiki-offer-card-font-family", value: style?.fontFamily },
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
