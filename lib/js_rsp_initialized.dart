/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class JsRspInitialized {
  bool isInitialized;

  JsRspInitialized(this.isInitialized);

  String toJson() => jsonEncode({"isInitialized": isInitialized});

  @override
  String toString() {
    return 'JsRspInitialized{isInitialized: $isInitialized}';
  }
}
