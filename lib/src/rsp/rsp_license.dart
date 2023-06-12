/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_trail/license_record.dart';

import 'rsp_title.dart';

class RspLicense extends LicenseRecord {
  RspLicense(LicenseRecord license)
      : super(license.id, license.title, license.uses, license.terms,
            description: license.description, expiry: license.expiry);

  String toJson() => jsonEncode(toMap());

  Map toMap() => {
        "id": id,
        "title": RspTitle(title).toMap(),
        "uses": uses.map((use) => use.toMap()).toList(),
        "terms": terms,
        "description": description,
        "expiry": expiry?.millisecondsSinceEpoch
      };

  @override
  String toString() {
    return 'RspLicense{id: $id, title: $title, uses: $uses, terms: $terms, description: $description, expiry: $expiry}';
  }
}
