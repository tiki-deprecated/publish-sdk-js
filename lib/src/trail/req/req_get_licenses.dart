/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetLicenses {
  String titleId;

  ReqGetLicenses(this.titleId);

  static ReqGetLicenses fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetLicenses(map['titleId']);
  }

  @override
  String toString() {
    return 'ReqGetLicenses{titleId: $titleId}';
  }
}
