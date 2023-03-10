
import 'dart:html' as html;
import 'package:js/js.dart';
import 'dart:typed_data';


import 'package:http/http.dart' as http;
import 'package:sqlite3/wasm.dart';

import 'package:tiki_sdk_js/tiki_sdk_js.dart';
import 'package:tiki_sdk_dart/tiki_sdk.dart';
import 'package:tiki_sdk_dart/node/key/key_service.dart';
import 'package:tiki_sdk_dart/node/key/key_storage.dart';
import 'package:tiki_sdk_dart/node/key/key_model.dart';
import 'package:tiki_sdk_dart/node/key/key_repository.dart';

@JS('___TikiSdk__hasCrypto') // Name of the function in JS
external set _hasCryptoSupport(bool Function() f);

@JS('___TikiSdk__sqliteVersion')
external set _sqliteVersion(String Function(WasmSqlite3) f);

@JS('___TikiSdk__hasWallet')
external set _hasWallet(bool Function(String) f);

@JS('___TikiSdk__SdkInit')
external set _sdkInit(Future<String> Function(String, String) f);

void _initializeDatabase(VersionChangeEvent e) {
 print("Initializing DB!");
}

Future<String> __sdkInit(String publishingId, String _address) async {
  InMemKeyStorage mem = new InMemKeyStorage();
  //WasmSqlite3 s = await loadSqlite();
  Future cdb = html.window.indexedDB.open("mydb",
    version: 1,
      onUpgradeNeeded: _initializeDatabase);
  KeyService kservice = new KeyService(mem);
  return await TikiSdk.withAddress(mem, address: _address);
}

bool _internalCrypto() {
  return html.Crypto.supported;
}

bool _internalHasWallet(String _address) {
  InMemKeyStorage mem = new InMemKeyStorage();
  KeyService kservice = new KeyService(mem);
  Future<KeyModel?> model = kservice.get(_address);
  return false;
}

String _internalSqliteVersion(WasmSqlite3 db) {
  return db.version.libVersion;
}

class InMemKeyStorage extends KeyStorage {
  Map<String, String> storage = {};

  @override
  Future<String?> read({required String key}) async => storage[key];

  @override
  Future<void> write({required String key, required String value}) async =>
      storage[key] = value;
}

Future<WasmSqlite3> loadSqlite() async {
  final response = await http.get(Uri.parse('sqlite3.wasm'));
  final fs = FileSystem.inMemory();

  return await WasmSqlite3.load(
      response.bodyBytes, SqliteEnvironment(fileSystem: fs));
}


void main() async {
  var sql = await loadSqlite();
  print('is Crypto enabled: ${_internalCrypto()}');
  print('sqlite 3 version: ${_internalSqliteVersion(sql)}');

  _hasCryptoSupport = allowInterop(_internalCrypto);
  _sqliteVersion = allowInterop(_internalSqliteVersion);
  _hasWallet = allowInterop(_internalHasWallet);
  _sdkInit = allowInterop(__sdkInit);


}
