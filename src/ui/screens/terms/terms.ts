/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./terms.css";
import BackBtn from "../../elements/back-btn/back-btn";
import TextBtn from "../../elements/text-btn/text-btn";
import NanoMd from "../../nano-md";

const id = "tiki-terms";

export default function (terms: string, html?: string) {
  const page: HTMLDivElement = document.createElement("div");
  page.id = id;

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-terms-body";

  const back: HTMLDivElement = BackBtn("Terms and Conditions", () => {
    const element: HTMLElement = document.getElementById(id);
    if (element !== null) {
      document.body.removeChild(element);
    }
  });
  body.appendChild(back);

  const content: HTMLDivElement = document.createElement("div");
  content.className = "tiki-terms-content";
  const legal: HTMLDivElement = document.createElement("div");
  legal.className = "tiki-terms-legal";

  if (html !== undefined) legal.innerHTML = terms;
  else legal.innerHTML = NanoMd(terms);
  content.appendChild(legal);
  body.appendChild(content);

  const agree: HTMLButtonElement = TextBtn("I agree", () => {}, true);
  body.appendChild(agree);
  page.appendChild(body);
  document.body.appendChild(page);
}
