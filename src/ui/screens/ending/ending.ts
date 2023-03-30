/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./ending.css";
import * as YourChoice from "../../elements/your-choice/your-choice";
import { cssVar } from "../../utils/null-safe";
import { Theme } from "../../theme";

export function create(
  text: string,
  settings: HTMLSpanElement,
  theme: Theme = new Theme()
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-ending";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-ending-body";
  body.appendChild(
    YourChoice.create({
      textColor: theme._primaryTextColor,
      accentColor: theme._accentColor,
      fontFamily: theme._fontFamily,
    })
  );
  body.appendChild(createTitle(text));
  body.appendChild(settings);
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-ending-background-color",
      value: theme._primaryBackgroundColor,
    },
    { property: "--tiki-ending-font-family", value: theme._fontFamily },
    { property: "--tiki-ending-title-color", value: theme._primaryTextColor },
    { property: "--tiki-ending-text-color", value: theme._secondaryTextColor },
  ]);
  return div;
}

function createTitle(text: string): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = text;
  span.className = "tiki-ending-title";
  return span;
}
