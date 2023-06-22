/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqGetLicenseId {
  String id;

  ReqGetLicenseId(this.id);

  static ReqGetLicenseId fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGetLicenseId(map['id']);
  }

  @override
  String toString() {
    return 'ReqGetLicenseId{id: $id}';
  }
}
