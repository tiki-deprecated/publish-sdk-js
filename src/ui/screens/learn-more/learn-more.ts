/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more.css";
import BackBtn from "../../elements/back-btn/back-btn";
import markdownHtml from "./learn-more.md";

const id = "tiki-learn-more";

export default function (): void {
  const page: HTMLDivElement = document.createElement("div");
  page.id = id;

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-learn-more-body";
  body.appendChild(heading());
  body.appendChild(content());

  page.appendChild(body);
  document.body.appendChild(page);
}

function heading(): HTMLDivElement {
  const div: HTMLDivElement = BackBtn("Learn More", () => {
    const element: HTMLElement = document.getElementById(id);
    if (element !== null) {
      document.body.removeChild(element);
    }
  });
  return div;
}

function content(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-learn-more-content";
  const markdown: HTMLDivElement = document.createElement("div");
  markdown.className = "tiki-learn-more-markdown";
  markdown.innerHTML = markdownHtml.html;
  div.appendChild(markdown);
  return div;
}
