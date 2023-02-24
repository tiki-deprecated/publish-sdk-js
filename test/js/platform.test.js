/**
 * @jest-environment jsdom
 */


import { tikiApi } from "../../src/api";
import {jest, describe, test, beforeEach, afterEach} from '@jest/globals';

describe("platform capabilities", () => {
  beforeEach(() => {
   jest.spyOn(globalThis, "___TikiSdk__hasCrypto")
      .mockImplementation(() => {return true})
   jest.spyOn(globalThis, "___TikiSdk__isSecure")
      .mockImplementation(() => {return true})
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("detect a secure context (HTTPS)", () => {
    let platformStatus = tikiApi();
    expect(globalThis.___TikiSdk__isSecure).toBeDefined();
    expect(globalThis.___TikiSdk__isSecure()).toBe(true);
  });
  test("detect Web Crypto", () => {
    expect(globalThis.___TikiSdk__hasCrypto).toBeDefined();
    expect(globalThis.___TikiSdk__hasCrypto()).toBe(true);
  });
});


describe("platform capabilities", () => {
  beforeEach(() => {
   jest.spyOn(globalThis, "___TikiSdk__hasCrypto")
      .mockImplementation(() => {return true})
   jest.spyOn(globalThis, "___TikiSdk__isSecure")
      .mockImplementation(() => {return true})
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("SDK under unfavorable conditions", () => {
    let platformStatus = tikiApi();
    expect(globalThis.___TikiSdk__isSecure).toBeDefined();
    expect(globalThis.___TikiSdk__isSecure()).toBe(true);
  });
  test("detect Web Crypto", () => {
    expect(globalThis.___TikiSdk__hasCrypto).toBeDefined();
    expect(globalThis.___TikiSdk__hasCrypto()).toBe(true);
  });
});
