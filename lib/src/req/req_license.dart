/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_trail/cache/license/license_use.dart';

class ReqLicense {
  String titleId;
  List<LicenseUse> uses;
  String terms;
  DateTime? expiry;
  String? description;

  ReqLicense(this.titleId, this.uses, this.terms,
      {this.expiry, this.description});

  static ReqLicense fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    DateTime? expiry;
    if (map['expiry'] != null) {
      expiry = DateTime.fromMillisecondsSinceEpoch(map['expiry']);
    }
    return ReqLicense(
        map['titleId'],
        (map['uses'] as List).map((use) => LicenseUse.fromMap(use)).toList(),
        map['terms'],
        expiry: expiry,
        description: map['description']);
  }

  @override
  String toString() {
    return 'ReqLicense{titleId: $titleId, uses: $uses, terms: $terms, expiry: $expiry, description: $description}';
  }
}
