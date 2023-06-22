/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspVerify {
  bool isVerified;

  RspVerify(this.isVerified);

  String toJson() => jsonEncode({"isVerified": isVerified});

  @override
  String toString() {
    return 'RspVerify{isVerified: $isVerified}';
  }
}
