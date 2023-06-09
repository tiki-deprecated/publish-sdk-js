/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetReceiptId {
  String id;

  ReqGetReceiptId(this.id);

  static ReqGetReceiptId fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetReceiptId(map['id']);
  }

  @override
  String toString() {
    return 'ReqGetReceiptId{id: $id}';
  }
}
