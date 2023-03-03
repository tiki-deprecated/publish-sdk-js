library tiki_sdk_js;

import 'dart:html' as html;
import 'package:js/js.dart';

export 'package:tiki_sdk_dart/node/key/key_storage.dart';
export 'package:tiki_sdk_dart/helpers/sdk_builder.dart';

@JS('cryptosupported')
external set _hasCryptoSupport(bool Function() f);

bool _internalCrypto() {
  return html.Crypto.supported;
}
