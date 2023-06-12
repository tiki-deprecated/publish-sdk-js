/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_trail/receipt_record.dart';

import 'rsp_payable.dart';

class RspReceipt extends ReceiptRecord {
  RspReceipt(ReceiptRecord receipt)
      : super(receipt.id, receipt.payable, receipt.amount,
            description: receipt.description, reference: receipt.reference);

  String toJson() => jsonEncode(toMap());

  Map toMap() => {
        "id": id,
        "payable": RspPayable(payable).toMap(),
        "amount": amount,
        "description": description,
        "reference": reference
      };

  @override
  String toString() {
    return 'RspReceipt{id: $id, payable: $payable, amount: $amount, description: $description, reference: $reference}';
  }
}
