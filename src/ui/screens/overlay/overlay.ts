/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import "./overlay.css";

const id = "tiki-background-overlay";

export default function display(show: boolean, onDismiss?: Function): void {
  if (show) {
    const overlay: HTMLDivElement = document.createElement("div");
    overlay.id = id;
    overlay.onclick = () => display(false, onDismiss);
    document.body.appendChild(overlay);
  } else {
    const overlay: HTMLElement = document.getElementById(id);
    if (overlay !== null) {
      document.body.removeChild(overlay);
      if (onDismiss !== undefined) onDismiss();
    }
  }
}
