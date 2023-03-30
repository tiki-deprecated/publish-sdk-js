/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqLatest {
  String ptr;
  String? origin;

  ReqLatest(this.ptr, {this.origin});

  static ReqLatest fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqLatest(map['ptr'], origin: map['origin']);
  }
}
