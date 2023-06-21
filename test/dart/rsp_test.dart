/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:test/test.dart';
import 'package:tiki_sdk_js/src/trail/rsp/rsp_license.dart';
import 'package:tiki_sdk_js/src/trail/rsp/rsp_title.dart';
import 'package:tiki_trail/tiki_trail.dart';

void main() {
  group('Rsp Marshall Tests', () {
    test('RspLicense.toJson', () {
      RspLicense rsp = RspLicense(LicenseRecord(
          "testId",
          TitleRecord("testId2", "testPtr"),
          [
            LicenseUse([LicenseUsecase.custom("test usecase")])
          ],
          "terms"));
      String json = rsp.toJson();
      expect(json,
          '{"id":"testId","title":{"id":"testId2","hashedPtr":"testPtr","tags":[],"origin":null,"description":null},"uses":[{"usecases":["custom:test usecase"],"destinations":null}],"terms":"terms","description":null,"expiry":null}');
    });

    test('RspTitle.fromJson', () {
      RspTitle rsp = RspTitle(TitleRecord("testId", "testPtr"));
      String json = rsp.toJson();
      expect(json,
          '{"id":"testId","hashedPtr":"testPtr","tags":[],"origin":null,"description":null}');
    });
  });
}
