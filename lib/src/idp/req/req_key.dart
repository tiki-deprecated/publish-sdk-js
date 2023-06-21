/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqKey {
  String keyId;
  bool overwrite;

  ReqKey(this.keyId, {this.overwrite = false});

  static ReqKey fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqKey(map['keyId'], overwrite: map['overwrite'] ?? false);
  }

  @override
  String toString() {
    return 'ReqKey{keyId: $keyId, overwrite: $overwrite}';
  }
}
