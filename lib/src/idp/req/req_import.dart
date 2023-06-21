/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqImport {
  String keyId;
  String key;
  bool public;

  ReqImport(this.keyId, this.key, {this.public = true});

  static ReqImport fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqImport(map['keyId'], map['key'], public: map['public'] ?? true);
  }

  @override
  String toString() {
    return 'ReqImport{keyId: $keyId, key: $key, public: $public}';
  }
}
