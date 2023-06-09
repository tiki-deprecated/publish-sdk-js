/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_sdk_dart/title_record.dart';

class RspTitle extends TitleRecord {
  RspTitle(TitleRecord title)
      : super(title.id, title.hashedPtr,
            tags: title.tags,
            origin: title.origin,
            description: title.description);

  String toJson() => jsonEncode(toMap());

  Map toMap() => {
        "id": id,
        "hashedPtr": hashedPtr,
        "tags": tags.map((tag) => tag.value).toList(),
        "origin": origin,
        "description": description
      };

  @override
  String toString() {
    return 'RspTitle{id: $id, hashedPtr: $hashedPtr, origin: $origin, tags: $tags, description: $description}';
  }
}
