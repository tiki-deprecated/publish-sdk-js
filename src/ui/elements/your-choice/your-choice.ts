/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./your-choice.css";
import Html from "./your-choice-html";
import { cssVar } from "../../utils/null-safe";

interface Style {
  textColor: string;
  accentColor: string;
  fontFamily: string;
}

export function create(style?: Style): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Html();
  span.className = "tiki-your-choice";
  cssVar(span, [
    {
      property: "--tiki-your-choice-text-color",
      value: style?.textColor,
    },
    {
      property: "--tiki-your-choice-accent-color",
      value: style?.accentColor,
    },
    {
      property: "--tiki-your-choice-font-family",
      value: style?.fontFamily,
    },
  ]);
  return span;
}
