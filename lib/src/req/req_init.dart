/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqInit {
  String id;
  String publishingId;
  String? origin;

  ReqInit(this.id, this.publishingId, {this.origin});

  static ReqInit fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqInit(map['id'], map['publishingId'], origin: map['origin']);
  }

  @override
  String toString() {
    return 'ReqInit{publishingId: $publishingId}';
  }
}
