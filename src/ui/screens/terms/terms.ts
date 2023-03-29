/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./terms.css";
import * as BackBtn from "../../elements/back-btn/back-btn";
import * as TextBtn from "../../elements/text-btn/text-btn";
import { toHtml } from "../../utils/nano-md";
import { cssVar } from "../../utils/null-safe";

interface Style {
  backgroundColor: string;
  borderColor: string;
  fontFamily: string;
  textColor: string;
}

interface Terms {
  value: string;
  isHtml?: boolean;
}

export function create(
  terms: Terms,
  onAccept: () => void,
  onBack: () => void,
  style?: Style
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-terms-body";
  body.appendChild(createHeading(onBack));
  body.appendChild(createContent(terms.value, terms.isHtml));
  body.appendChild(TextBtn.create("I agree", onAccept));
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-terms-background-color",
      value: style?.backgroundColor,
    },
    {
      property: "--tiki-terms-font-family",
      value: style?.fontFamily,
    },
    {
      property: "--tiki-terms-border-color",
      value: style?.borderColor,
    },
    {
      property: "--tiki-terms-text-color",
      value: style?.textColor,
    },
  ]);
  return div;
}

function createHeading(onBack: () => void): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms-heading";
  div.appendChild(BackBtn.create("Terms and Conditions", onBack));
  const span: HTMLSpanElement = document.createElement("div");
  span.className = "tiki-terms-title";
  span.innerHTML = "Terms & Conditions";
  div.appendChild(span);
  return div;
}

function createContent(terms: string, isHtml = false): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms-content";
  const container: HTMLDivElement = document.createElement("div");
  container.className = "tiki-terms-legal";
  const html: HTMLDivElement = document.createElement("div");
  html.className = "tiki-terms-legal-md";
  if (isHtml) html.innerHTML = terms;
  else html.innerHTML = toHtml(terms);
  container.appendChild(html);
  div.appendChild(container);
  return div;
}
