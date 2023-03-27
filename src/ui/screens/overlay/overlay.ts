/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./overlay.css";

const id = "tiki-background-overlay";

export default function display(show: boolean, onDismiss?: Function): void {
  if (show) {
    const div: HTMLDivElement = document.createElement("div");
    div.id = id;
    div.onclick = () => display(false, onDismiss);
    document.body.appendChild(div);
  } else {
    const element: HTMLElement = document.getElementById(id);
    if (element !== null) {
      document.body.removeChild(element);
      if (onDismiss !== undefined) onDismiss();
    }
  }
}
