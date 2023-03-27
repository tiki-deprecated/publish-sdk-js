/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:tiki_sdk_dart/node/key/key_storage.dart';

class JSKeyStorage implements KeyStorage {
  @override
  Future<String?> read(String key) {
    // TODO: implement read
    throw UnimplementedError();
  }

  @override
  Future<void> write(String key, String value) {
    // TODO: implement write
    throw UnimplementedError();
  }
}
