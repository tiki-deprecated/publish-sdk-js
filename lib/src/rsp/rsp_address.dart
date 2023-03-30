/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class RspAddress {
  String address;

  RspAddress(this.address);

  String toJson() => jsonEncode({"address": address});
}
