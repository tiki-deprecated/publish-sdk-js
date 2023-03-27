library js_key_storage;

import 'dart:html' as html;
import 'dart:indexed_db';
import 'package:js/js.dart';
import 'package:tiki_sdk_dart/node/key/key_storage.dart';

import 'dart:js_util';

class IndexedDBKeyStorage implements KeyStorage {
  static const String KEY_STORE = 'com.mytiki';
  static const String DB_NAME = 'TikiDB';

  final IdbFactory? _store = html.window.indexedDB;
  ObjectStore? ostore;
  Database? __database;

  Future? openDB() async {
    return await _store?.open(DB_NAME,
      onUpgradeNeeded: _initializeDatabase)
    .then(_loadFromDB);
  }

  set database(Database value) => __database = value;

  void _initializeDatabase(VersionChangeEvent e) {
    print("Initializing DB!");
    Database __db = (e.target as Request).result;
    try {
      final store = __db.transaction(KEY_STORE, 'readwrite').objectStore(KEY_STORE);
    } on Exception {
      __db.createObjectStore(KEY_STORE, autoIncrement: true);
    }
  }

  Future _loadFromDB(Database db) {
    __database = db;
    return new Future.value(db);
  }


  Future<void> write(String key, String value) async {
    database = await openDB();
    Transaction? transaction = __database?.transaction(KEY_STORE, "readwrite");
    transaction?.objectStore(KEY_STORE).add(value, key);
  }

  Future<String?> read(String key) async {
    __database = await openDB();
    Transaction? transaction = __database?.transaction(KEY_STORE, "readonly");
    var store = transaction?.objectStore(KEY_STORE);
    return await store?.getObject(key);

  }
}
