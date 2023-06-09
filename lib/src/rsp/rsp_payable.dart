/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_sdk_dart/payable_record.dart';
import 'package:tiki_sdk_js/src/rsp/rsp_license.dart';

class RspPayable extends PayableRecord {
  RspPayable(PayableRecord payable)
      : super(payable.id, payable.license, payable.amount, payable.type,
            description: payable.description,
            expiry: payable.expiry,
            reference: payable.reference);

  String toJson() => jsonEncode(toMap());

  Map toMap() => {
        "id": id,
        "license": RspLicense(license).toMap(),
        "amount": amount,
        "type": type,
        "description": description,
        "expiry": expiry?.millisecondsSinceEpoch,
        "reference": reference
      };

  @override
  String toString() {
    return 'RspPayable{id: $id, license: $license, amount: $amount, type: $type, description: $description, expiry: $expiry, reference: $reference}';
  }
}
