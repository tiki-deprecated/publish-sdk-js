/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

library js_wrapper;

import 'package:js/js.dart';

import 'js_req_init.dart';
import 'js_rsp_initialized.dart';
import 'src/idp/idp.dart';
import 'src/trail/trail.dart';

@JS('___TikiWrapper__initialize')
external set _initialize(
    void Function(String json, Future<String> Function() keyGen,
            Function()? onComplete, Function(String)? onError)
        f);

@JS('___TikiWrapper__isInitialized')
external set _isInitialized(String Function() f);

class JSWrapper {
  final List<String> _scope = ['storage', 'registry'];
  final Idp _idp = Idp();
  final Trail _trail = Trail();

  JSWrapper() {
    _initialize = allowInterop(initialize);
    _isInitialized = allowInterop(isInitialized);
  }

  void initialize(String json, Future<String> Function() keyGen,
      Function()? onComplete, Function(String)? onError) async {
    JSReqInit req = JSReqInit.fromJson(json);
    await _idp.initialize(_scope, req.publishingId, keyGen);
    await _trail.initialize(req.id, req.publishingId, _idp.idp,
        origin: req.origin, onError: (e) {
      onError != null ? onError(e) : null;
      print("onError $e");
    });
    if (onComplete != null) onComplete();
  }

  String isInitialized() =>
      JsRspInitialized(_idp.isInitialized() && _trail.isInitialized()).toJson();
}
