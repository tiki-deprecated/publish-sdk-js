/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_sdk_dart/cache/license/license_use.dart';
import 'package:tiki_sdk_dart/cache/title/title_tag.dart';

class ReqLicense {
  String ptr;
  List<LicenseUse> uses;
  String terms;
  List<TitleTag> tags;
  DateTime? expiry;
  String? licenseDescription;
  String? titleDescription;
  String? origin;

  ReqLicense(this.ptr, this.uses, this.terms, this.tags,
      {this.expiry,
      this.licenseDescription,
      this.titleDescription,
      this.origin});

  static ReqLicense fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    DateTime? expiry;
    if (map['expiry'] != null) {
      expiry = DateTime.fromMillisecondsSinceEpoch(map['expiry']);
    }
    return ReqLicense(
        map['ptr'],
        (map['uses'] as List).map((use) => LicenseUse.fromMap(use)).toList(),
        map['terms'],
        (map['tags'] as List?)?.map((tag) => TitleTag.from(tag)).toList() ?? [],
        expiry: expiry,
        origin: map['origin'],
        licenseDescription: map['licenseDescription'],
        titleDescription: map['titleDescription']);
  }

  @override
  String toString() {
    return 'ReqLicense{ptr: $ptr, uses: $uses, terms: $terms, tags: $tags, expiry: $expiry, licenseDescription: $licenseDescription, titleDescription: $titleDescription, origin: $origin}';
  }
}
