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
    Future<void> Function(
            String publishingId, String id, Future<String> Function(),
            {String? origin})
        f);

@JS('___TikiSdk__title')
external set _title(
    Future<TitleRecord> Function(String ptr,
            {List<TitleTag> tags, String? description, String? origin})
        f);

@JS('___TikiSdk__license')
external set _license(
    Future<LicenseRecord> Function(
            String ptr, List<LicenseUse> uses, String terms,
            {List<TitleTag> tags,
            DateTime? expiry,
            String? licenseDescription,
            String? titleDescription,
            String? origin})
        f);

@JS('___TikiSdk__getTitle')
external set _getTitle(TitleRecord? Function(String id) f);

@JS('___TikiSdk__getLicense')
external set _getLicense(LicenseRecord? Function(String id) f);

@JS('___TikiSdk__all')
external set _all(List<LicenseRecord> Function(String ptr, {String? origin}) f);

@JS('___TikiSdk__latest')
external set _latest(LicenseRecord? Function(String ptr, {String? origin}) f);

@JS('___TikiSdk__guard')
external set _guard(
    bool Function(String ptr, List<LicenseUsecase> usecases,
            {List<String>? destinations,
            Function()? onPass,
            Function(String)? onFail,
            String? origin})
        f);

@JS('___TikiSdk__address')
external set _address(String Function() f);

@JS('___TikiSdk__id')
external set _id(String Function() f);

class CoreWrapper {
  TikiSdk? _tikiSdk;

  CoreWrapper() {
    _initialize = allowInterop(initialize);
    _title = allowInterop(title);
    _license = allowInterop(license);
    _getTitle = allowInterop(getTitle);
    _getLicense = allowInterop(getLicense);
    _all = allowInterop(all);
    _latest = allowInterop(latest);
    _guard = allowInterop(guard);
    _address = allowInterop(() => address);
    _id = allowInterop(() => id);
  }

  Future<void> initialize(
      String publishingId, String id, Future<String> Function() keyGen,
      {String? origin}) async {
    origin ??= Uri.base.authority;
    KeyStorage keyStorage = await JSKeyStorage(keyGen).init();
    String address = await TikiSdk.withId(id, keyStorage);
    final http.Response response = await http
        .get(Uri.parse('https://cdn.mytiki.com/sqlite/1.10.0/sqlite3.wasm'));
    final IndexedDbFileSystem fs =
        await IndexedDbFileSystem.open(dbName: "TikiSdk.sqlite");
    WasmSqlite3 sqlite3 = await WasmSqlite3.load(
        response.bodyBytes, SqliteEnvironment(fileSystem: fs));
    _tikiSdk = await TikiSdk.init(
        publishingId, origin, keyStorage, id, sqlite3.open("$address.db"));
  }

  String get address => _tikiSdk!.address;

  String get id => _tikiSdk!.id;

  bool isInitialized() => _tikiSdk != null;

  Future<TitleRecord> title(String ptr,
          {String? origin,
          List<TitleTag> tags = const [],
          String? description}) =>
      _tikiSdk!
          .title(ptr, origin: origin, tags: tags, description: description);

  Future<LicenseRecord> license(String ptr, List<LicenseUse> uses, String terms,
          {String? origin,
          List<TitleTag> tags = const [],
          String? titleDescription,
          String? licenseDescription,
          DateTime? expiry}) =>
      _tikiSdk!.license(ptr, uses, terms,
          origin: origin,
          tags: tags,
          titleDescription: titleDescription,
          licenseDescription: licenseDescription,
          expiry: expiry);

  LicenseRecord? latest(String ptr, {String? origin}) =>
      _tikiSdk!.latest(ptr, origin: origin);

  List<LicenseRecord> all(String ptr, {String? origin}) =>
      _tikiSdk!.all(ptr, origin: origin);

  LicenseRecord? getLicense(String id) => _tikiSdk!.getLicense(id);

  TitleRecord? getTitle(String id) => _tikiSdk!.getTitle(id);

  bool guard(String ptr, List<LicenseUsecase> usecases,
          {String? origin,
          List<String>? destinations,
          Function()? onPass,
          Function(String)? onFail}) =>
      _tikiSdk!.guard(ptr, usecases,
          origin: origin,
          destinations: destinations,
          onPass: onPass,
          onFail: onFail);
}
