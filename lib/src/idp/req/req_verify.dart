/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';
import 'dart:typed_data';

class ReqVerify {
  String keyId;
  Uint8List message;
  Uint8List signature;

  ReqVerify(this.keyId, this.message, this.signature);

  static ReqVerify fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqVerify(map['keyId'], base64.decode(map['message']),
        base64.decode(map['signature']));
  }

  @override
  String toString() {
    return 'ReqVerify{keyId: $keyId, message: ${base64.encode(message)}, signature: ${base64.encode(signature)}}';
  }
}
