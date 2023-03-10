/**
 * @jest-environment jsdom
 */


import * as TikiSdk from "../../src/index";
import {jest, expect, describe, test, beforeAll, afterEach} from '@jest/globals';
import * as fs from 'fs';



describe("platform capabilities", () => {

  beforeAll(() => {
    //global.___TikiSdk__isSecure = jest.fn(() => {});
    Object.defineProperty(globalThis, '___TikiSdk__isSecure', {
    value: () => true,
    writable: true
   })
    Object.defineProperty(globalThis, '___TikiSdk__sqliteVersion', {
    value: () => true,
    writable: true
   })
    Object.defineProperty(globalThis, '___TikiSdk__hasCrypto', {
    value: () => true,
    writable: true
   })

  });

  afterEach(() => {
    jest.resetModules();
  });

  test("detect a secure context (HTTPS)", () => {
    expect(globalThis.___TikiSdk__isSecure).toBeDefined();
  });
  test("detect Web Crypto support", () => {
    expect(globalThis.___TikiSdk__hasCrypto).toBeDefined();
  });
  test("detect WASM Sqlite3 support", () => {
    const wasm_exports = WebAssembly.Module.exports(new WebAssembly.Module(fs.readFileSync("./sqlite3.wasm")))
    expect(wasm_exports).toContainEqual({'kind': 'global', "name": "sqlite3_version"});
    expect(globalThis.___TikiSdk__sqliteVersion).toBeDefined();
  });

  test("detect existing wallet", () => {
    expect(TikiSdk.platformReady()).toBe(true);
  });

  test("unfavorable conditions", () => {
    globalThis.___TikiSdk__hasCrypto = false;
    expect(TikiSdk.platformReady()).toBe(false);
  });

});
