/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_sdk_dart/license_record.dart';

import 'rsp_title.dart';

class RspLicense extends LicenseRecord {
  RspLicense(LicenseRecord license)
      : super(license.id, license.title, license.uses, license.terms,
            description: license.description, expiry: license.expiry);

  String toJson() => jsonEncode({
        "id": id,
        "title": RspTitle(title).toMap(),
        "uses": uses.map((use) => use.toMap()).toList(),
        "terms": terms,
        "description": description,
        "expiry": expiry?.millisecondsSinceEpoch
      });
}
