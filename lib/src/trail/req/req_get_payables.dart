/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetPayables {
  String licenseId;

  ReqGetPayables(this.licenseId);

  static ReqGetPayables fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetPayables(map['licenseId']);
  }

  @override
  String toString() {
    return 'ReqGetPayables{licenseId: $licenseId}';
  }
}
