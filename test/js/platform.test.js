/**
 * @jest-environment jsdom
 */


import { tikiApi, TikiSdkJSBuilder, TikiSdk } from "../../src/api";
import {jest, describe, test, beforeEach, afterEach} from '@jest/globals';
import fs from 'fs';

describe("platform capabilities", () => {

  beforeEach(() => {
   jest.spyOn(globalThis, "___TikiSdk__hasCrypto")
      .mockImplementation(() => {return true})
   jest.spyOn(globalThis, "___TikiSdk__isSecure")
      .mockImplementation(() => {return true})
   jest.spyOn(globalThis, "___TikiSdk__entryPoint")
      .mockImplementation(() => {return true})
   jest.spyOn(globalThis, "___TikiSdk__sqliteVersion")
      .mockImplementation(() => {return '2.32.2'})
  });

  afterEach(() => {
    jest.resetModules();
  });

  test("detect a secure context (HTTPS)", () => {
    expect(globalThis.___TikiSdk__isSecure).toBeDefined();
    expect(globalThis.___TikiSdk__isSecure()).toBe(true);
  });
  test("detect Web Crypto support", () => {
    let sdk = new TikiSdk();
    expect(globalThis.___TikiSdk__hasCrypto).toBeDefined();
    expect(globalThis.___TikiSdk__hasCrypto()).toBe(true);
    expect(sdk.platformReady()).toBeDefined();
    expect(sdk.platformReady()).toBe(true);
  });
  test("detect WASM Sqlite3 support", () => {
    let sdk = new TikiSdk();
    const wasm_exports = WebAssembly.Module.exports(new WebAssembly.Module(fs.readFileSync("./sqlite3.wasm")))
    expect(wasm_exports).toContainEqual({'kind': 'global', "name": "sqlite3_version"});
    expect(globalThis.___TikiSdk__sqliteVersion).toBeDefined();
    expect(globalThis.___TikiSdk__sqliteVersion()).toBe('2.32.2');
    expect(sdk.platformReady()).toBe(true);
  });

  test("detect existing wallet", () => {
    let sdk = new TikiSdk();
   jest.spyOn(globalThis, "___TikiSdk__hasCrypto")
      .mockImplementation(() => {return false})
   jest.spyOn(globalThis, "___TikiSdk__isSecure")
      .mockImplementation(() => {return false})
    expect(sdk.platformReady()).toBe(false);
  });

  test("SDK under unfavorable conditions", () => {
   jest.spyOn(globalThis, "___TikiSdk__hasCrypto")
      .mockImplementation(() => {return false})
   jest.spyOn(globalThis, "___TikiSdk__isSecure")
      .mockImplementation(() => {return false})
    let sdk = new TikiSdk();
    expect(sdk.platformReady()).toBe(false);
  });

});
