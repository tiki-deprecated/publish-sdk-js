/**
 * @jest-environment jsdom
 */


import * as TikiSdk from "../../src/index";
import * as fs from 'fs';
import "fake-indexeddb/auto";
//import { IDBFactory } from "fake-indexeddb";
import {
    indexedDB,
    IDBCursor,
    IDBCursorWithValue,
    IDBDatabase,
    IDBFactory,
    IDBIndex,
    IDBKeyRange,
    IDBObjectStore,
    IDBOpenDBRequest,
    IDBRequest,
    IDBTransaction,
    IDBVersionChangeEvent,
} from "fake-indexeddb";

describe("api conformance", () => {

  beforeAll(() => {
    Object.defineProperty(globalThis.crypto, 'subtle', {
      value: {
        generateKey: () => Promise.resolve(42),
        digest: () => Promise.resolve("aaaaaabbbbbbbbccccccc")
      },
      writable: false
    });

  });
  beforeEach(() => {
    Object.defineProperty(globalThis, '___TikiSdk__isSecure', {
      value: () => true,
      writable: true
    });
    Object.defineProperty(globalThis, '___TikiSdk__sqliteVersion', {
      value: () => true,
      writable: true
    });
    Object.defineProperty(globalThis, '___TikiSdk__hasCrypto', {
      value: () => true,
      writable: true
    });
    Object.defineProperty(globalThis, '___TikiSdk__SdkInit', {
      value: () => (jest.fn(() => {})),
      writable: true
    });
    Object.defineProperty(globalThis, '___TikiSdk__SdkWithId', {
      value: () => (jest.fn(() => {})),
      writable: true
    });
    Object.defineProperty(globalThis, '___TikiSdk__KeyStorageRead', {
      value: () => (jest.fn((String) => {})),
      writable: true
    });

  });

  afterEach(() => {
    jest.resetModules();
  });

  test("called init method", () => {
    // Arrange
    let wallet_address = "111111111111111111";
    let origin_address = "com.examplecorp.app";
    globalThis.___TikiSdk__SdkInit = jest.fn((a, b) => {return wallet_address;});

    // Act
    TikiSdk.init(wallet_address, origin_address)

    // Assert
    expect(TikiSdk.platformReady()).toBe(true);
    expect(globalThis.___TikiSdk__SdkInit).toHaveBeenCalledTimes(1);
    expect(globalThis.___TikiSdk__SdkInit).toHaveBeenCalledWith(wallet_address, origin_address);
  });

  test("set wallet address", async () => {
    // Arrange
    let wallet_address = "111111111111111111";
    globalThis.___TikiSdk__SdkWithId = jest.fn((a) => {return wallet_address;});

    // Act
    let user_wallet = await TikiSdk.withId(wallet_address)

    // Assert
    expect(globalThis.___TikiSdk__SdkWithId).toHaveBeenCalledTimes(1);
    expect(globalThis.___TikiSdk__SdkWithId).toHaveBeenCalledWith(wallet_address);
    expect(user_wallet).toBe(wallet_address);
  });

  test("ensure we can read from keystore", async () => {
    // Arrange
    let wallet_address = "111111111111111111";

    globalThis.___TikiSdk__KeyStorageRead = jest.fn((a) => {return wallet_address;});

    // Act
    let user_wallet = await TikiSdk.withId(wallet_address)

    // Assert
    expect(globalThis.___TikiSdk__KeyStorageRead).toHaveBeenCalledTimes(1);
    expect(globalThis.___TikiSdk__KeyStorageRead).toHaveBeenCalledWith(wallet_address);
    expect(user_wallet).toBe(wallet_address);
  });

});
