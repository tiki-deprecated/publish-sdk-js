// exports the library to JS
@JS()
library tiki_sdk_js;

import 'package:js/js.dart';

// Defines the funcion "say" in JavaScript
@JS('say')
external set _say(void Function(String) f);

// Defines the funcion "say" in JavaScript
@JS('sum')
external set _sum(int Function(int, int) f);

void _internalSay(String msg) {
  print(msg);
}

int _internalSum(int a, int b) => a + b;

void main() {
  // Implements the say() function in JS
  _say = allowInterop(_internalSay);
  _sum = allowInterop(_internalSum);
}
