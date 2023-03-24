/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import html from "./trade-your-data-html";

export default function (): Node {
  const template: HTMLTemplateElement = document.createElement("template");
  template.innerHTML = html().replace(/<!--[\s\S]*?-->/g, "");
  return template.content;
}
