/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:http/http.dart' as http;
import 'package:js/js.dart';
import 'package:sqlite3/wasm.dart';
import 'package:tiki_sdk_dart/tiki_sdk.dart';

import 'src/js_key_storage.dart';
import 'src/req/req_all.dart';
import 'src/req/req_get_license.dart';
import 'src/req/req_get_title.dart';
import 'src/req/req_guard.dart';
import 'src/req/req_init.dart';
import 'src/req/req_latest.dart';
import 'src/req/req_license.dart';
import 'src/req/req_title.dart';
import 'src/rsp/rsp_address.dart';
import 'src/rsp/rsp_guard.dart';
import 'src/rsp/rsp_id.dart';
import 'src/rsp/rsp_is_initialized.dart';
import 'src/rsp/rsp_license.dart';
import 'src/rsp/rsp_title.dart';

@JS('___TikiSdk__initialize')
external set _initialize(
    void Function(String json, Future<String> Function() keyGen,
            Function()? onComplete)
        f);

@JS('___TikiSdk__title')
external set _title(void Function(String json, Function(String)? onComplete) f);

@JS('___TikiSdk__license')
external set _license(
    void Function(String json, Function(String)? onComplete) f);

@JS('___TikiSdk__getTitle')
external set _getTitle(String? Function(String id) f);

@JS('___TikiSdk__getLicense')
external set _getLicense(String? Function(String id) f);

@JS('___TikiSdk__all')
external set _all(List<String> Function(String json) f);

@JS('___TikiSdk__latest')
external set _latest(String? Function(String json) f);

@JS('___TikiSdk__guard')
external set _guard(
    String Function(String json, Function()? onPass, Function(String)? onFail)
        f);

@JS('___TikiSdk__address')
external set _address(String Function() f);

@JS('___TikiSdk__id')
external set _id(String Function() f);

@JS('___TikiSdk__isInitialized')
external set _isInitialized(String Function() f);

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
    _isInitialized = allowInterop(isInitialized);
  }

  void initialize(String json, Future<String> Function() keyGen,
      Function()? onComplete) async {
    ReqInit req = ReqInit.fromJson(json);
    KeyStorage keyStorage = await JSKeyStorage(keyGen).init();
    String address = await TikiSdk.withId(req.id, keyStorage);
    final http.Response response = await http
        .get(Uri.parse('https://cdn.mytiki.com/sqlite/1.10.0/sqlite3.wasm'));
    final IndexedDbFileSystem fs =
        await IndexedDbFileSystem.open(dbName: "TikiSdk.sqlite");
    WasmSqlite3 sqlite3 = await WasmSqlite3.load(
        response.bodyBytes, SqliteEnvironment(fileSystem: fs));
    _tikiSdk = await TikiSdk.init(req.publishingId, req.origin ?? Uri.base.host,
        keyStorage, req.id, sqlite3.open("$address.db"));
    if (onComplete != null) onComplete();
  }

  String get address => RspAddress(_tikiSdk!.address).toJson();

  String get id => RspId(_tikiSdk!.id).toJson();

  String isInitialized() => RspIsInitialized(_tikiSdk != null).toJson();

  void title(String json, Function(String)? onComplete) async {
    ReqTitle req = ReqTitle.fromJson(json);
    TitleRecord title = await _tikiSdk!.title(req.ptr,
        origin: req.origin, tags: req.tags, description: req.description);
    if (onComplete != null) onComplete(RspTitle(title).toJson());
  }

  void license(String json, Function(String)? onComplete) async {
    ReqLicense req = ReqLicense.fromJson(json);
    LicenseRecord license = await _tikiSdk!.license(
        req.ptr, req.uses, req.terms,
        tags: req.tags,
        expiry: req.expiry,
        licenseDescription: req.licenseDescription,
        titleDescription: req.titleDescription);
    print("license succeeded. callback time");
    if (onComplete != null) onComplete(RspLicense(license).toJson());
  }

  String? latest(String json) {
    ReqLatest req = ReqLatest.fromJson(json);
    LicenseRecord? license = _tikiSdk!.latest(req.ptr, origin: req.origin);
    return license == null ? null : RspLicense(license).toJson();
  }

  List<String> all(String json) {
    ReqAll req = ReqAll.fromJson(json);
    List<LicenseRecord> licenses = _tikiSdk!.all(req.ptr, origin: req.origin);
    return licenses.map((license) => RspLicense(license).toJson()).toList();
  }

  String? getLicense(String json) {
    ReqGetLicense req = ReqGetLicense.fromJson(json);
    LicenseRecord? license = _tikiSdk!.getLicense(req.id);
    return license == null ? null : RspLicense(license).toJson();
  }

  String? getTitle(String json) {
    ReqGetTitle req = ReqGetTitle.fromJson(json);
    TitleRecord? title = _tikiSdk!.getTitle(req.id);
    return title == null ? null : RspTitle(title).toJson();
  }

  String guard(String json, Function()? onPass, Function(String)? onFail) {
    ReqGuard req = ReqGuard.fromJson(json);
    bool success = _tikiSdk!.guard(req.ptr, req.usecases,
        destinations: req.destinations,
        origin: req.origin,
        onFail: onFail,
        onPass: onPass);
    return RspGuard(success).toJson();
  }
}
