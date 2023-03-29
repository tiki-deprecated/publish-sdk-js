/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ending.css";
import * as YourChoice from "../../elements/your-choice/your-choice";
import { cssVar } from "../../utils/null-safe";

interface Style {
  backgroundColor: string;
  fontFamily: string;
  titleColor: string;
  textColor: string;
}

export function create(
  text: string,
  settings: HTMLSpanElement,
  style?: Style
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-ending";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-ending-body";
  body.appendChild(YourChoice.create());
  body.appendChild(createTitle(text));
  body.appendChild(settings);
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-ending-background-color",
      value: style?.backgroundColor,
    },
    {
      property: "--tiki-ending-font-family",
      value: style?.fontFamily,
    },
    { property: "--tiki-ending-title-color", value: style?.titleColor },
    {
      property: "--tiki-ending-text-color",
      value: style?.textColor,
    },
  ]);
  return div;
}

function createTitle(text: string): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = text;
  span.className = "tiki-ending-title";
  return span;
}
