/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_trail/cache/license/license_usecase.dart';

class ReqGuard {
  String ptr;
  List<LicenseUsecase> usecases;
  List<String>? destinations;
  String? origin;

  ReqGuard(this.ptr, this.usecases, {this.destinations, this.origin});

  static ReqGuard fromJson(String json) {
    Map<String, dynamic> map = jsonDecode(json);
    return ReqGuard(
        map['ptr'],
        (map['usecases'] as List)
            .map((usecase) => LicenseUsecase.from(usecase))
            .toList(),
        destinations: (map['destinations'] as List?)
            ?.map((destination) => destination as String)
            .toList(),
        origin: map['origin']);
  }

  @override
  String toString() {
    return 'ReqGuard{ptr: $ptr}';
  }
}
