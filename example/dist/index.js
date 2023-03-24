(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TikiSdk = {}));
})(this, (function (exports) { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$2 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap\");\n\n:root {\n  --tiki-font-family: \"Space Grotesk\", sans-serif;\n  --tiki-primary-text-color: rgb(28, 0, 0);\n  --tiki-secondary-text-color: rgba(28, 0, 0, 0.6);\n  --tiki-primary-background-color: rgb(255, 255, 255);\n  --tiki-secondary-background-color: rgb(246, 246, 246);\n  --tiki-accent-color: rgb(0, 178, 114);\n}\n";
  styleInject(css_248z$2);

  var css_248z$1 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.offer-prompt {\n  height: 300px;\n  width: 300px;\n  background-color: var(--tiki-primary-background-color);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-family: var(--tiki-font-family);\n}\n";
  styleInject(css_248z$1);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  var template = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n\n<div class=\"offer-prompt\">SUCKIT NERD.</div>\n";
  function html () {
    return template;
  }

  var css_248z = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n#tiki-background-overlay {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100vw;\n  height: 100vh;\n}\n";
  styleInject(css_248z);

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  const id$1 = "tiki-background-overlay";
  function display(show, onDismiss) {
      if (show) {
          const overlay = document.createElement("div");
          overlay.id = id$1;
          overlay.onclick = () => display(false, onDismiss);
          document.body.appendChild(overlay);
      }
      else {
          const overlay = document.getElementById(id$1);
          if (overlay !== null) {
              document.body.removeChild(overlay);
              if (onDismiss !== undefined)
                  onDismiss();
          }
      }
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  const id = "tiki-offer-prompt";
  function OfferPrompt () {
      const prompt = document.createElement("div");
      prompt.id = id;
      prompt.innerHTML = html();
      display(true, () => {
          document.body.removeChild(prompt);
      });
      document.body.appendChild(prompt);
  }

  /*
   * Copyright (c) TIKI Inc.
   * MIT license. See LICENSE file in root directory.
   */
  function present() {
      OfferPrompt();
  }

  exports.present = present;

}));
