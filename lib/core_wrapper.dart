/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:http/http.dart' as http;
import 'package:js/js.dart';
import 'package:sqlite3/wasm.dart';
import 'package:tiki_sdk_dart/tiki_sdk.dart';
import 'package:tiki_sdk_js/src/js_key_storage.dart';

@JS('___TikiSdk__initialize')
external set _initialize(
    Future<CoreWrapper> Function(String publishingId, String id,
            {String? origin})
        f);

class CoreWrapper {
  late final TikiSdk _tikiSdk;

  CoreWrapper() {
    _initialize = allowInterop(initialize);
  }

  Future<CoreWrapper> initialize(String publishingId, String id,
      {String? origin}) async {
    origin ??= Uri.base.authority;
    KeyStorage keyStorage = JSKeyStorage();
    String address = await TikiSdk.withId(id, keyStorage);

    final http.Response response = await http.get(Uri.parse('sqlite3.wasm'));
    final IndexedDbFileSystem fs =
        await IndexedDbFileSystem.open(dbName: "TikiSdk.db");
    WasmSqlite3 database = await WasmSqlite3.load(
        response.bodyBytes, SqliteEnvironment(fileSystem: fs));

    _tikiSdk = await TikiSdk.init(
        publishingId, origin, keyStorage, id, database.open("$address.db"));
    return this;
  }
}
