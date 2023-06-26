/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspGuard {
  bool success;
  String? error;

  RspGuard(this.success, {this.error});

  String toJson() => jsonEncode({"success": success, "error": error});

  @override
  String toString() {
    return 'RspGuard{success: $success, error: $error}';
  }
}
