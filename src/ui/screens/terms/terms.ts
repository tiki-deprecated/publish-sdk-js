/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./terms.css";
import * as BackBtn from "../../elements/back-btn/back-btn";
import * as TextBtn from "../../elements/text-btn/text-btn";
import { toHtml } from "../../utils/nano-md";
import { cssVar } from "../../utils/null-safe";
import { Theme } from "../../theme";

interface Terms {
  value: string;
  isHtml?: boolean;
}

export function create(
  terms: Terms,
  onAccept: () => void,
  onBack: () => void,
  theme: Theme = new Theme()
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-terms-body";
  body.appendChild(createHeading(onBack, theme._primaryTextColor));
  body.appendChild(createContent(terms.value, terms.isHtml));
  body.appendChild(
    TextBtn.create("I agree", onAccept, {
      outlineColor: theme._accentColor,
      backgroundColor: theme._accentColor,
      textColor: theme._primaryBackgroundColor,
      fontFamily: theme._fontFamily,
    })
  );
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-terms-background-color",
      value: theme._primaryBackgroundColor,
    },
    { property: "--tiki-terms-font-family", value: theme._fontFamily },
    { property: "--tiki-terms-border-color", value: theme._accentColor },
    { property: "--tiki-terms-text-color", value: theme._primaryTextColor },
  ]);
  return div;
}

function createHeading(onBack: () => void, color: string): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms-heading";
  div.appendChild(
    BackBtn.create("Terms and Conditions", onBack, { color: color })
  );
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
