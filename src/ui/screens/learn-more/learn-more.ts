/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more.css";
import BackBtn from "../../elements/back-btn/back-btn";
import markdownHtml from "./learn-more.md";

const id = "tiki-learn-more";

export default function () {
  const page: HTMLDivElement = document.createElement("div");
  page.id = id;

  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-learn-more-body";

  const back: HTMLDivElement = BackBtn("Learn More", () => {
    const element: HTMLElement = document.getElementById(id);
    if (element !== null) {
      document.body.removeChild(element);
    }
  });
  body.appendChild(back);

  const content: HTMLDivElement = document.createElement("div");
  content.className = "tiki-learn-more-content";
  const markdown: HTMLDivElement = document.createElement("div");
  markdown.className = "tiki-learn-more-markdown";
  markdown.innerHTML = markdownHtml.html;
  content.appendChild(markdown);
  body.appendChild(content);

  page.appendChild(body);
  document.body.appendChild(page);
}
