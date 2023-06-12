/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./learn-more.css";
import * as BackBtn from "../../elements/back-btn/back-btn";
import markdownHtml from "./learn-more.md";
import { cssVar } from "../../utils/null-safe";
import { Theme } from "../../theme";

/**
 * Create the pre-built UI for the learn more screen.
 *
 * @param onBack - Callback fired when the user backs away from the screen
 * @param theme - {@link Theme} used to style the UI
 */
export function create(
  onBack: () => void,
  theme: Theme = new Theme()
): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-learn-more";
  const body: HTMLDivElement = document.createElement("div");
  body.className = "tiki-learn-more-body";
  body.appendChild(createHeading(onBack, theme._primaryTextColor));
  body.appendChild(createContent());
  div.appendChild(body);
  cssVar(div, [
    {
      property: "--tiki-learn-more-background-color",
      value: theme._primaryBackgroundColor,
    },
    {
      property: "--tiki-learn-more-font-family",
      value: theme._fontFamily,
    },
    {
      property: "--tiki-learn-more-title-color",
      value: theme._primaryTextColor,
    },
    {
      property: "--tiki-learn-more-text-color",
      value: theme._secondaryTextColor,
    },
    {
      property: "--tiki-learn-more-accent-color",
      value: theme._accentColor,
    },
  ]);
  return div;
}

function createHeading(onBack: () => void, color: string): HTMLDivElement {
  const div: HTMLDivElement = document.createElement("div");
  div.className = "tiki-learn-more-heading";
  div.appendChild(BackBtn.create("Learn More", onBack, { color: color }));
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
