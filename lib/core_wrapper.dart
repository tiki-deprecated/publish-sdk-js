/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'package:js/js.dart';

@JS('___TikiSdk__initialize')
external set _initialize(
    Future<CoreWrapper> Function(String publishingId, String id,
            {String? origin})
        f);

class CoreWrapper {
  //late final TikiSdk _tikiSdk;

  //wrap a dart function and give it a JS interface
  CoreWrapper() {
    _initialize = allowInterop(initialize);
  }

  Future<CoreWrapper> initialize(String publishingId, String id,
      {String? origin}) async {
    origin ??= Uri.base.authority;
    // String address = await TikiSdk.withId(id, keyStorage);
    // _tikiSdk =
    //     await TikiSdk.init(publishingId, origin, keyStorage, id, database);

    print('suck it nerd');
    return this;
  }
}
