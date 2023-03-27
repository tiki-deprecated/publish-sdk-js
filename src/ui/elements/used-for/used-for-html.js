/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import yesHtml from "./used-for-yes.html";
import noHtml from "./used-for-no.html";

function yes() {
  return yesHtml.replace(/<!--[\s\S]*?-->/g, "");
}

function no() {
  return noHtml.replace(/<!--[\s\S]*?-->/g, "");
}

export { yes, no };
