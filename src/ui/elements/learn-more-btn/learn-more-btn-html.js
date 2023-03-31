/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import template from "./learn-more-btn.html";

export default function () {
  return template.replace(/<!--(.|\n)*-->/g, "");
}
