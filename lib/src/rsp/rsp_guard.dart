/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspGuard {
  bool success;

  RspGuard(this.success);

  String toJson() => jsonEncode({"success": success});
}
