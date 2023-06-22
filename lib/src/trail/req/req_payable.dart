/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqPayable {
  String licenseId;
  String amount;
  String type;
  DateTime? expiry;
  String? description;
  String? reference;

  ReqPayable(this.licenseId, this.amount, this.type,
      {this.expiry, this.description, this.reference});

  static ReqPayable fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    DateTime? expiry;
    if (map['expiry'] != null) {
      expiry = DateTime.fromMillisecondsSinceEpoch(map['expiry']);
    }
    return ReqPayable(map['licenseId'], map['amount'], map['type'],
        reference: map['reference'],
        expiry: expiry,
        description: map['description']);
  }

  @override
  String toString() {
    return 'ReqPayable{licenseId: $licenseId, amount: $amount, type: $type, expiry: $expiry, description: $description, reference: $reference}';
  }
}
