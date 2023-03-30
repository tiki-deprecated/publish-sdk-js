/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetTitle {
  String id;

  ReqGetTitle(this.id);

  static ReqGetTitle fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetTitle(map['id']);
  }
}
