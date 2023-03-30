/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqAll {
  String ptr;
  String? origin;

  ReqAll(this.ptr, {this.origin});

  static ReqAll fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqAll(map['ptr'], origin: map['origin']);
  }
}
