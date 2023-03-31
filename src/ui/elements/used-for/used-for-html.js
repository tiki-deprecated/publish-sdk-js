/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import yesHtml from "./used-for-yes.html";
import noHtml from "./used-for-no.html";

function yes() {
  return yesHtml;
}

function no() {
  return noHtml;
}

export { yes, no };
