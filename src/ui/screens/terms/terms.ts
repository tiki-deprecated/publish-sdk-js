/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./terms.css";
import BackBtn from "../../elements/back-btn/back-btn";
import TextBtn from "../../elements/text-btn/text-btn";
import NanoMd from "../../nano-md";

const id = "tiki-terms";

export default function (terms: string, isHtml: boolean = false): void {
  const page: HTMLDivElement = document.createElement("div");
  page.id = id;

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-terms-body";
  body.appendChild(heading());
  body.appendChild(content(terms, isHtml));
  body.appendChild(TextBtn("I agree", () => {}, true));

  page.appendChild(body);
  document.body.appendChild(page);
}

function heading(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms-heading";

  div.appendChild(
    BackBtn("Terms and Conditions", () => {
      const element: HTMLElement = document.getElementById(id);
      if (element !== null) {
        document.body.removeChild(element);
      }
    })
  );

  const span: HTMLSpanElement = document.createElement("div");
  span.className = "tiki-terms-title";
  span.innerHTML = "Terms & Conditions";
  div.appendChild(span);

  return div;
}

function content(terms: string, isHtml: boolean = false): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-terms-content";
  const container: HTMLDivElement = document.createElement("div");
  container.className = "tiki-terms-legal";
  const html: HTMLDivElement = document.createElement("div");
  html.className = "tiki-terms-legal-md";
  if (isHtml) html.innerHTML = terms;
  else html.innerHTML = NanoMd(terms);
  container.appendChild(html);
  div.appendChild(container);
  return div;
}
