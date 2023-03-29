/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more.css";
import * as BackBtn from "../../elements/back-btn/back-btn";
import markdownHtml from "./learn-more.md";

export function create(onBack: () => void): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-learn-more";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-learn-more-body";
  body.appendChild(createHeading(onBack));
  body.appendChild(createContent());
  div.appendChild(body);
  return div;
}

function createHeading(onBack: () => void): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-learn-more-heading";
  div.appendChild(BackBtn.create("Learn More", onBack));
  const span: HTMLSpanElement = document.createElement("div");
  span.className = "tiki-learn-more-title";
  span.innerHTML = "Learn More";
  div.appendChild(span);
  return div;
}

function createContent(): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-learn-more-content";
  const markdown: HTMLDivElement = document.createElement("div");
  markdown.className = "tiki-learn-more-markdown";
  markdown.innerHTML = markdownHtml.html;
  div.appendChild(markdown);
  return div;
}
