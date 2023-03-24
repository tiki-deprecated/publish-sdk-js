'use strict';

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

var css_248z$4 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap\");\n\n:root {\n  --tiki-font-family: \"Space Grotesk\", sans-serif;\n  --tiki-primary-text-color: rgb(28, 0, 0);\n  --tiki-secondary-text-color: rgba(28, 0, 0, 0.6);\n  --tiki-primary-background-color: rgb(255, 255, 255);\n  --tiki-secondary-background-color: rgb(246, 246, 246);\n  --tiki-accent-color: rgb(0, 178, 114);\n  --tiki-font-size-sm: 0.875rem;\n  --tiki-line-height-sm: 1.25rem;\n  --tiki-font-size: 1rem;\n  --tiki-line-height: 1.5rem;\n  --tiki-font-size-lg: 1.125rem;\n  --tiki-line-height-lg: 1.75rem;\n  --tiki-font-size-xl: 1.25rem;\n  --tiki-line-height-xl: 1.75rem;\n}\n";
styleInject(css_248z$4);

var css_248z$3 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n#tiki-offer-prompt {\n  height: 67vh;\n  width: 100vw;\n  background-color: var(--tiki-secondary-background-color);\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  transform: translate(-50%, 0);\n  font-family: var(--tiki-font-family);\n  border-radius: 2.5em 2.5em 0 0;\n}\n\n.tiki-offer-prompt-body {\n  width: 100%;\n  padding: 2em 0.9375em;\n  box-sizing: border-box;\n}\n\n.tiki-offer-prompt-heading {\n  width: 100%;\n  padding: 0 0.9375em;\n  display: flex;\n  justify-content: space-between;\n  box-sizing: border-box;\n}\n\n@media (min-width: 1024px) {\n  #tiki-offer-prompt {\n    height: 300px;\n    width: 600px;\n  }\n}\n";
styleInject(css_248z$3);

var css_248z$2 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n#tiki-background-overlay {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 100vw;\n  height: 100vh;\n}\n";
styleInject(css_248z$2);

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

var css_248z$1 = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.trade-your-data {\n  color: var(--tiki-primary-text-color);\n  font-family: var(--tiki-font-family);\n  font-size: var(--tiki-font-size-xl);\n  line-height: var(--tiki-line-height-xl);\n  font-weight: 700;\n}\n\n.trade-your-data-accent {\n  color: var(--tiki-accent-color);\n}\n";
styleInject(css_248z$1);

/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
var template$1 = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n\n<span class=\"trade-your-data\">\n  TRADE\n  <strong class=\"trade-your-data-accent\">YOUR</strong>\n  DATA\n</span>\n";
function html$1 () {
  return template$1;
}

/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
function tradeYourData () {
    const template = document.createElement("template");
    template.innerHTML = html$1().replace(/<!--[\s\S]*?-->/g, "");
    return template.content;
}

var css_248z = "/*\n * Copyright (c) TIKI Inc.\n * MIT license. See LICENSE file in root directory.\n */\n\n.tiki-learn-more-button-icon {\n  fill: var(--tiki-secondary-text-color);\n  height: 100%;\n  width: auto;\n}\n\n.tiki-learn-more-button {\n  height: var(--tiki-line-height-xl);\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  padding: 1px;\n}\n";
styleInject(css_248z);

/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
var template = "<!--\n  ~ Copyright (c) TIKI Inc.\n  ~ MIT license. See LICENSE file in root directory.\n  -->\n<button class=\"tiki-learn-more-button\">\n  <svg\n    viewBox=\"0 0 24 24\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    class=\"tiki-learn-more-button-icon\"\n  >\n    <path\n      d=\"M12 24C8.81712 24 5.7648 22.7353 3.5148 20.4852C1.2648 18.2351 0 15.1826 0 12C0 8.81736 1.26468 5.7648 3.5148 3.5148C5.76492 1.2648 8.81736 0 12 0C15.1826 0 18.2352 1.26468 20.4852 3.5148C22.7352 5.76492 24 8.81736 24 12C23.9963 15.1819 22.7306 18.2316 20.4816 20.4816C18.2316 22.7307 15.1819 23.9964 12 24ZM12 1.84584C9.30744 1.84584 6.7248 2.91552 4.81968 4.81968C2.91562 6.72468 1.84584 9.30744 1.84584 12C1.84584 14.6926 2.91552 17.2752 4.81968 19.1803C6.72468 21.0844 9.30744 22.1542 12 22.1542C14.6926 22.1542 17.2752 21.0845 19.1803 19.1803C21.0844 17.2753 22.1542 14.6926 22.1542 12C22.1504 9.3084 21.0798 6.72744 19.1767 4.82352C17.2727 2.92039 14.6916 1.84968 12.0002 1.84608L12 1.84584Z\"\n    />\n    <path\n      d=\"M12 15.7001C11.49 15.7001 11.0766 15.2874 11.0766 14.7771C11.1966 13.6037 11.7956 12.5316 12.7322 11.8149C13.305 11.2418 13.8459 10.7006 13.8459 10.1594C13.8459 9.13886 13.02 8.3125 12 8.3125C10.98 8.3125 10.1541 9.13886 10.1541 10.1594C10.1541 10.6697 9.74062 11.0824 9.23062 11.0824C8.72062 11.0824 8.30811 10.6697 8.30811 10.1594C8.30811 8.83964 9.01123 7.61935 10.154 6.95997C11.2959 6.29962 12.704 6.29962 13.846 6.95997C14.9888 7.61937 15.6919 8.83969 15.6919 10.1594C15.5728 11.3328 14.9738 12.404 14.0372 13.1206C13.4644 13.6947 12.9235 14.2359 12.9235 14.7771C12.9235 15.0219 12.826 15.2564 12.6525 15.43C12.48 15.6035 12.2447 15.7001 12 15.7001Z\"\n    />\n    <path\n      d=\"M12.9245 17.5484C12.9245 18.7806 11.0767 18.7806 11.0767 17.5484C11.0767 16.3162 12.9245 16.3162 12.9245 17.5484Z\"\n    />\n  </svg>\n</button>\n";
function html () {
  return template;
}

/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
function learnMoreBtn (onClick) {
    const button = document.createElement("button");
    button.innerHTML = html().replace(/<!--[\s\S]*?-->/g, "");
    button.onclick = () => onClick();
    button.className = "tiki-learn-more-button";
    return button;
}

/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */
const id = "tiki-offer-prompt";
function OfferPrompt () {
    const prompt = document.createElement("div");
    prompt.id = id;
    const body = document.createElement("div");
    body.className = "tiki-offer-prompt-body";
    const heading = document.createElement("div");
    heading.className = "tiki-offer-prompt-heading";
    heading.appendChild(tradeYourData());
    heading.appendChild(learnMoreBtn(() => {
        console.log("you clicked me!");
    }));
    body.appendChild(heading);
    prompt.appendChild(body);
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
