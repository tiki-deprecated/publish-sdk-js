/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_sdk_dart/cache/title/title_tag.dart';

class ReqTitle {
  String ptr;
  String? origin;
  List<TitleTag> tags;
  String? description;

  ReqTitle(this.ptr, this.tags, {this.origin, this.description});

  static ReqTitle fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqTitle(map['ptr'],
        (map['tags'] as List?)?.map((tag) => TitleTag.from(tag)).toList() ?? [],
        origin: map['origin'], description: map['description']);
  }

  @override
  String toString() {
    return 'ReqTitle{ptr: $ptr, origin: $origin, tags: $tags, description: $description}';
  }
}
