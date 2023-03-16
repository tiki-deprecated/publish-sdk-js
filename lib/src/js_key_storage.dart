library js_key_storage;

import 'dart:html' as html;
import 'dart:indexed_db' as db;
import 'package:js/js.dart';
import '../tiki_sdk_dart/node/key/key_storage.dart';

class JSKeyStorage implements KeyStorage {

  final Future<Database> indexedDb = html.window.indexedDB.open('com.mytiki');
  Future<void> write({required String key, required String value}) async {
    ObjectStore ostore = indexedDB.createObjectStore('com.mytiki')
  }
  Future<String?> read({required String key}) async {
    Transaction transaction = indexedDb.transaction(["com.mytiki"], "readonly");

  }
}
