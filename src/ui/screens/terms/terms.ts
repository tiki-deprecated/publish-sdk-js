/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./terms.css";
import * as BackBtn from "../../elements/back-btn/back-btn";
import * as TextBtn from "../../elements/text-btn/text-btn";
import { toHtml } from "../../nano-md";

export function create(
  terms: string,
  onAccept: () => void,
  onBack: () => void,
  isHtml = false
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-terms-body";
  body.appendChild(createHeading(onBack));
  body.appendChild(createContent(terms, isHtml));
  body.appendChild(TextBtn.create("I agree", onAccept, true));
  div.appendChild(body);
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
