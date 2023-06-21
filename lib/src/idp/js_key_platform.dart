/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:html' as html;
import 'dart:indexed_db';

import 'package:tiki_idp/key/key_platform.dart';

class JSKeyPlatform implements KeyPlatform {
  static const int _dbVersion = 1;
  static const String _dbName = "TikiSdk.store";
  static const String _storeName = "key_store";
  final Future<String> Function() _keyGen;
  late final Database _db;

  JSKeyPlatform(this._keyGen);

  Future<JSKeyPlatform> init() async {
    IdbFactory? factory = html.window.indexedDB;
    if (factory != null) {
      _db = await factory.open(_dbName, version: _dbVersion,
          onUpgradeNeeded: (VersionChangeEvent event) {
        Database db = event.target.result;
        if (db.objectStoreNames?.contains(_storeName) != true) {
          db.createObjectStore(_storeName);
        }
      });
    } else {
      throw UnsupportedError("Web platform requires IndexedDB.");
    }
    return this;
  }

  @override
  Future<String> generate() async {
    if (html.Crypto.supported) {
      return html.promiseToFuture(_keyGen());
    } else {
      throw UnsupportedError("Web platform requires Web Crypto.");
    }
  }

  @override
  Future<String?> read(String key) async {
    ObjectStore store =
        _db.transaction(_storeName, 'readonly').objectStore(_storeName);
    String? value = await store.getObject(key);
    return value;
  }

  @override
  Future<void> write(String key, String value) async {
    ObjectStore store =
        _db.transaction(_storeName, 'readwrite').objectStore(_storeName);
    return store.add(value, key);
  }
}
