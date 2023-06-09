/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetReceipts {
  String payableId;

  ReqGetReceipts(this.payableId);

  static ReqGetReceipts fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetReceipts(map['payableId']);
  }

  @override
  String toString() {
    return 'ReqGetReceipts{payableId: $payableId}';
  }
}
