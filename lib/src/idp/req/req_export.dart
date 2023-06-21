/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqExport {
  String keyId;
  bool public;

  ReqExport(this.keyId, {this.public = true});

  static ReqExport fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqExport(map['keyId'], public: map['public'] ?? true);
  }

  @override
  String toString() {
    return 'ReqExport{keyId: $keyId, public: $public}';
  }
}
