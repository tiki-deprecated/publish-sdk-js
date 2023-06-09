/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetTitle {
  String ptr;
  String? origin;

  ReqGetTitle(this.ptr, {this.origin});

  static ReqGetTitle fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetTitle(map['id'], origin: map['origin']);
  }

  @override
  String toString() {
    return 'ReqGetTitle{ptr: $ptr}';
  }
}
