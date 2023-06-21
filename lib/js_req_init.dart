/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class JSReqInit {
  String id;
  String publishingId;
  String? origin;

  JSReqInit(this.id, this.publishingId, {this.origin});

  static JSReqInit fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return JSReqInit(map['id'], map['publishingId'], origin: map['origin']);
  }

  @override
  String toString() {
    return 'JSReqInit{id: $id, publishingId: $publishingId, origin: $origin}';
  }
}
