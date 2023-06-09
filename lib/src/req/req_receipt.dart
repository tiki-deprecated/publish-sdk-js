/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

class ReqReceipt {
  String payableId;
  String amount;
  String? description;
  String? reference;

  ReqReceipt(this.payableId, this.amount, {this.description, this.reference});

  static ReqReceipt fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqReceipt(map['payableId'], map['amount'],
        reference: map['reference'], description: map['description']);
  }

  @override
  String toString() {
    return 'ReqReceipt{payableId: $payableId, amount: $amount, description: $description, reference: $reference}';
  }
}
