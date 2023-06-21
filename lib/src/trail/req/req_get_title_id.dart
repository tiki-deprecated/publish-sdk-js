/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetTitleId {
  String id;

  ReqGetTitleId(this.id);

  static ReqGetTitleId fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetTitleId(map['id']);
  }

  @override
  String toString() {
    return 'ReqGetTitleId{id: $id}';
  }
}
