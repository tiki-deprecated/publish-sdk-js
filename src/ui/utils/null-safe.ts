/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface Prop {
  property: string;
  value?: string;
}

export function cssVar(element: HTMLElement, properties: Array<Prop>) {
  properties.forEach((prop) => {
    if (prop.value !== undefined)
      element.style.setProperty(prop.property, prop.value);
  });
}
