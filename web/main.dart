
import 'dart:html' as html;
import 'package:js/js.dart';

import 'package:http/http.dart' as http;
import 'package:sqlite3/wasm.dart';

import 'package:tiki_sdk_js/tiki_sdk_js.dart';
import 'package:tiki_sdk_dart/tiki_sdk.dart';

import 'package:tiki_sdk_dart/cache/consent/consent_service.dart';
import 'package:tiki_sdk_dart/cache/ownership/ownership_service.dart';
import 'package:tiki_sdk_dart/l0/storage/storage_service.dart';
import 'package:tiki_sdk_dart/node/backup/backup_service.dart';
import 'package:tiki_sdk_dart/node/block/block_service.dart';
import 'package:tiki_sdk_dart/node/key/key_service.dart';
import 'package:tiki_sdk_dart/node/node_service.dart';
import 'package:tiki_sdk_dart/node/transaction/transaction_service.dart';
import 'package:tiki_sdk_dart/node/key/key_storage.dart';

@JS('___TikiSdk__hasCrypto') // Name of the function in JS
external set _hasCryptoSupport(bool Function() f);

@JS('___TikiSdk__sqliteVersion')
external set _sqliteVersion(String Function(WasmSqlite3) f);

@JS('___TikiSdk__hasWallet')
external set _hasWallet(bool Function() f);

bool _internalCrypto() {
  return html.Crypto.supported;
}

bool _internalHasWallet() {
  return false;
}

String _internalSqliteVersion(WasmSqlite3 db) {
  return db.version.libVersion;
}


/// A ephemeral key-value storage.
class InMemKeyStorage extends KeyStorage {
  Map<String, String> storage = {};

  @override
  Future<String?> read({required String key}) async => storage[key];

  @override
  Future<void> write({required String key, required String value}) async =>
      storage[key] = value;
}

class TikiSdkJsBuilder implements SdkBuilder {
  String? _origin;
  KeyStorage? _keyStorage;
  String? _databaseDir;
  String? _publishingId;
  String? _address;

  @override
  void origin(String origin) => _origin = origin;

  @override
  void keyStorage(KeyStorage keyStorage) => _keyStorage = keyStorage;
  @override
  void databaseDir(String databaseDir) => _databaseDir = databaseDir;
  @override
  void publishingId(String? publishingId) => _publishingId = publishingId;
  @override
  void address(String? address) => _address = address;

  Future<TikiSdk> build() async {
    KeyModel primaryKey = await _loadPrimaryKey();
    WasmSqlite3 sqlite3 = await loadSqlite();
    CommonDatabase database = sqlite3
        .open("$_databaseDir/${Bytes.base64UrlEncode(primaryKey.address)}.db");

    StorageService l0Storage =
        StorageService.publishingId(primaryKey.privateKey, _publishingId!);

    NodeService nodeService = NodeService()
      ..blockInterval = const Duration(minutes: 1)
      ..maxTransactions = 200
      ..transactionService = TransactionService(database)
      ..blockService = BlockService(database)
      ..primaryKey = primaryKey;
    nodeService.backupService =
        BackupService(l0Storage, database, primaryKey, nodeService.getBlock);
    await nodeService.init();

    OwnershipService ownershipService =
        OwnershipService(_origin!, nodeService, nodeService.database);
    ConsentService consentService =
        ConsentService(nodeService.database, nodeService);
    return TikiSdk(ownershipService, consentService, nodeService);
  }

  Future<KeyModel> _loadPrimaryKey() async {
    if (_keyStorage == null) {
      throw Exception('Keystore must be set to build NodeService');
    }
    KeyService keyService = KeyService(_keyStorage!);
    if (_address != null) {
      KeyModel? key = await keyService.get(_address!);
      if (key != null) {
        return key;
      }
    }
    return await keyService.create();
  }
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

  TikiSdkJsBuilder builder = TikiSdkJsBuilder();
  builder.origin('com.exaammple.myproduct');
  builder.databaseDir('path/to/database');
  builder.keyStorage(InMemKeyStorage());

  builder.publishingId("api_key_from_mytiki.com");
  builder.address('<user_address>');

  TikiSdk sdk = await builder.build();

}
