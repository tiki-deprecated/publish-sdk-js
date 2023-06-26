/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:typed_data';

import 'package:js/js.dart';
import 'package:tiki_idp/tiki_idp.dart';

import 'js_key_platform.dart';
import 'req/req_export.dart';
import 'req/req_import.dart';
import 'req/req_key.dart';
import 'req/req_sign.dart';
import 'req/req_verify.dart';
import 'rsp/rsp_export.dart';
import 'rsp/rsp_sign.dart';
import 'rsp/rsp_token.dart';
import 'rsp/rsp_verify.dart';

@JS('___TikiIdp__key')
external set _key(void Function(String json, Function() onComplete) f);

@JS('___TikiIdp__export')
external set _export(void Function(String json, Function(String) onComplete) f);

@JS('___TikiIdp__import')
external set _import(void Function(String json, Function() onComplete) f);

@JS('___TikiIdp__sign')
external set _sign(void Function(String json, Function(String) onComplete) f);

@JS('___TikiIdp__verify')
external set _verify(void Function(String json, Function(String) onComplete) f);

@JS('___TikiIdp__token')
external set _token(void Function(Function(String) onComplete) f);

class Idp {
  TikiIdp? _tikiIdp;

  Idp() {
    _key = allowInterop(key);
    _export = allowInterop(export);
    _import = allowInterop(import);
    _sign = allowInterop(sign);
    _verify = allowInterop(verify);
    _token = allowInterop(token);
  }

  Future<void> initialize(
      List<String> scope, String clientId, Future<String> Function() keyGen,
      {String? clientSecret}) async {
    KeyPlatform platform = await JSKeyPlatform(keyGen).init();
    _tikiIdp = TikiIdp(scope, clientId, platform, clientSecret: clientSecret);
  }

  TikiIdp get idp => _tikiIdp!;

  bool isInitialized() => _tikiIdp != null;

  void key(String json, Function() onComplete) async {
    ReqKey req = ReqKey.fromJson(json);
    await _tikiIdp!.key(req.keyId, overwrite: req.overwrite);
    onComplete();
  }

  void export(String json, Function(String) onComplete) async {
    ReqExport req = ReqExport.fromJson(json);
    String key = await _tikiIdp!.export(req.keyId, public: req.public);
    onComplete(RspExport(key).toJson());
  }

  void import(String json, Function() onComplete) async {
    ReqImport req = ReqImport.fromJson(json);
    await _tikiIdp!.import(req.keyId, req.key, public: req.public);
    onComplete();
  }

  void sign(String json, Function(String) onComplete) async {
    ReqSign req = ReqSign.fromJson(json);
    Uint8List signature = await _tikiIdp!.sign(req.keyId, req.message);
    onComplete(RspSign(signature).toJson());
  }

  void verify(String json, Function(String) onComplete) async {
    ReqVerify req = ReqVerify.fromJson(json);
    bool isVerified =
        await _tikiIdp!.verify(req.keyId, req.message, req.signature);
    onComplete(RspVerify(isVerified).toJson());
  }

  void token(Function(String) onComplete) async {
    JWT jwt = await _tikiIdp!.token;
    onComplete(RspToken(jwt).toJson());
  }
}
