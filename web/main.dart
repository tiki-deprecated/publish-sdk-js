
import 'dart:html' as html;
import 'dart:indexed_db';
import 'package:js/js.dart';
import 'package:js/js_util.dart';
//import 'dart:js_interop';
import 'dart:typed_data';

//import 'dart:js_util';

import 'package:http/http.dart' as http;
import 'package:sqlite3/wasm.dart';

import 'package:tiki_sdk_js/tiki_sdk_js.dart';
import 'package:tiki_sdk_dart/tiki_sdk.dart';
import 'package:tiki_sdk_dart/node/key/key_service.dart';
import 'package:tiki_sdk_dart/node/key/key_storage.dart';
import 'package:tiki_sdk_dart/node/key/key_model.dart';
import 'package:tiki_sdk_dart/node/key/key_repository.dart';
import 'package:tiki_sdk_dart/node/block/block_repository.dart';
import 'package:tiki_sdk_dart/node/transaction/transaction_repository.dart';
import 'package:tiki_sdk_dart/node/xchain/xchain_repository.dart';
import 'package:tiki_sdk_dart/node/backup/backup_repository.dart';

@JS('___TikiSdk__hasCrypto') // Name of the function in JS
external set _hasCryptoSupport(bool Function() f);

@JS('___TikiSdk__sqliteVersion')
external set _sqliteVersion(String Function(WasmSqlite3) f);

@JS('___TikiSdk__hasWallet')
external set _hasWallet(bool Function(String) f);

@JS('___TikiSdk__SdkInit')
external set _sdkInit(Future<String> Function(String, String) f);

@JS('___TikiSdk__SdkWithId')
external set _sdkWithId(Future<String> Function(String) f);

@JS('___TikiSdk__plusOne')
external set _plusOne(int Function(int) f);

@JS('___TikiSdk__KeyStorageRead')
external set _keyStorageRead(Future<String?> Function(String) f);

@JS('___TikiSdk__KeyStorageWrite')
external set _keyStorageWrite(void Function(String, String) f);

Future<String?> __keystorageread(String _address) async {
  KeyStorage kstore = new IndexedDBKeyStorage();
  var result = await kstore.read(_address);
  return new Future.value(result);
}

void __keystoragewrite(String _address, String value) async {
  var kstore = new IndexedDBKeyStorage();
  var db = await kstore.openDB();
  //print("DB: ${db}");
  print("Hey DB");
  //await kstore.write(_address, "yaaay");
}

Future<String> __sdkInit(String publishingId, String _address) async {
  //InMemKeyStorage mem = new InMemKeyStorage();
  KeyStorage kstore = new IndexedDBKeyStorage();
  KeyService kservice = new KeyService(kstore);
  //KeyModel? kmodel = await kservice.get(_address);
  return new Future.value("vallyval");
}

Future<String> __sdkWithId(String _address) async {
  KeyStorage kstore = IndexedDBKeyStorage();
  //return await TikiSdk.withId(_address, kstore);
  return new Future.value(_address);
}

int _internalPlusOne(int x) {
  return x+1;
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

void _internalCreateTable(WasmSqlite3 wasmdb) {
  final db = wasmdb.open('mydb1');
  BlockRepository block = new BlockRepository(db);
  BackupRepository backup = new BackupRepository(db);
  XChainRepository xchain = new XChainRepository(db);
  TransactionRepository transaction = new TransactionRepository(db);
  var rows = db.select("SELECT name FROM sqlite_master WHERE type='table';");
  print("got rows: ${rows}");
  db.dispose();
}

class InMemKeyStorage extends KeyStorage {
  Map<String, String> storage = {};

  @override
  Future<String?> read(String key) async => storage[key];

  @override
  Future<void> write(String key, String value) async =>
      storage[key] = value;
}

Future<WasmSqlite3> loadSqlite() async {
  final response = await http.get(Uri.parse('sqlite3.wasm'));
  //final fs = FileSystem.inMemory();
  final fs = await IndexedDbFileSystem.open(dbName: "TikiDB");

  return await WasmSqlite3.load(
      response.bodyBytes, SqliteEnvironment(fileSystem: fs));
}

@JS()
@staticInterop
class JSKeyStorage {}

extension on JSKeyStorage {
  external Future<String?> read;
}

void main() async {
  var sql = await loadSqlite();
  print('is Crypto enabled: ${_internalCrypto()}');
  print('sqlite 3 version: ${_internalSqliteVersion(sql)}');
  _internalCreateTable(sql);

  _hasCryptoSupport = allowInterop(_internalCrypto);
  _sqliteVersion = allowInterop(_internalSqliteVersion);
  _hasWallet = allowInterop(_internalHasWallet);
  _sdkInit = allowInterop(__sdkInit);
  _sdkWithId = allowInterop(__sdkWithId);
  _plusOne = allowInterop(_internalPlusOne);
  //var dartKstore = new IndexedDBKeyStorage();
  _keyStorageRead = allowInterop(__keystorageread);
  _keyStorageWrite = allowInterop(__keystoragewrite);
}
