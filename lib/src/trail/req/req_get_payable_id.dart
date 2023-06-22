/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetPayableId {
  String id;

  ReqGetPayableId(this.id);

  static ReqGetPayableId fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetPayableId(map['id']);
  }

  @override
  String toString() {
    return 'ReqGetPayableId{id: $id}';
  }
}
