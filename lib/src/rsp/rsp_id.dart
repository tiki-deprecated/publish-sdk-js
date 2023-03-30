/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspId {
  String id;

  RspId(this.id);

  String toJson() => jsonEncode({"id": id});
}
