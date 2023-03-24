/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import acceptHtml from "./ending-settings-accepted.html";
import declineHtml from "./ending-settings-declined.html";

function accepted() {
  return acceptHtml.replace(/<!--[\s\S]*?-->/g, "");
}

function declined() {
  return declineHtml.replace(/<!--[\s\S]*?-->/g, "");
}

export { accepted, declined };
