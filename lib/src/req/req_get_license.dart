/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetLicense {
  String id;

  ReqGetLicense(this.id);

  static ReqGetLicense fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetLicense(map['id']);
  }
}
