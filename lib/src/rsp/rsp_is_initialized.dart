/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspIsInitialized {
  bool isInitialized;

  RspIsInitialized(this.isInitialized);

  String toJson() => jsonEncode({"isInitialized": isInitialized});
}
