/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';
import 'dart:typed_data';

class RspSign {
  Uint8List signature;

  RspSign(this.signature);

  String toJson() => jsonEncode({"signature": base64.encode(signature)});

  @override
  String toString() {
    return 'RspSign{signature: ${base64.encode(signature)}}';
  }
}
