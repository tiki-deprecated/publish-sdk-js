/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import yesHtml from "./used-for-yes.html";
import noHtml from "./used-for-no.html";

function yes() {
  return yesHtml.replace(/<!--(.|\n)*-->/g, "");
}

function no() {
  return noHtml.replace(/<!--(.|\n)*-->/g, "");
}

export { yes, no };
