/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';
import 'dart:typed_data';

class ReqSign {
  String keyId;
  Uint8List message;

  ReqSign(this.keyId, this.message);

  static ReqSign fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqSign(map['keyId'], base64Decode(map['message']));
  }

  @override
  String toString() {
    return 'ReqSign{keyId: $keyId, message: $message}';
  }
}
