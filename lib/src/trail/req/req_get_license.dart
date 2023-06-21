/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetLicense {
  String titleId;

  ReqGetLicense(this.titleId);

  static ReqGetLicense fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetLicense(map['titleId']);
  }

  @override
  String toString() {
    return 'ReqGetLicense{titleId: $titleId}';
  }
}
