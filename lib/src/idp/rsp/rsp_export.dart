/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspExport {
  String key;

  RspExport(this.key);

  String toJson() => jsonEncode({"key": key});

  @override
  String toString() {
    return 'RspExport{key: $key}';
  }
}
