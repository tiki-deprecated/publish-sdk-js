/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./trade-your-data.css";
import Html from "./trade-your-data-html";
import { cssVar } from "../../utils/null-safe";

interface Style {
  textColor?: string;
  accentColor?: string;
}

export function create(style?: Style): HTMLSpanElement {
  const span: HTMLSpanElement = document.createElement("span");
  span.innerHTML = Html();
  span.className = "tiki-trade-your-data";
  cssVar(span, [
    {
      property: "--tiki-trade-your-data-text-color",
      value: style?.textColor,
    },
    {
      property: "--tiki-trade-your-data-accent-color",
      value: style?.accentColor,
    },
  ]);
  return span;
}
