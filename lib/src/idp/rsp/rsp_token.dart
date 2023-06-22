/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import 'dart:convert';

import 'package:tiki_idp/auth/jwt.dart';

class RspToken extends JWT {
  RspToken(JWT jwt)
      : super(jwt.accessToken, jwt.tokenType, jwt.expires,
            refreshToken: jwt.refreshToken, scope: jwt.scope);

  String toJson() => jsonEncode({
        "accessToken": accessToken,
        "tokenType": tokenType,
        "expires": expires.millisecondsSinceEpoch,
        "refreshToken": refreshToken,
        "scope": scope
      });

  @override
  String toString() {
    return 'RspToken{accessToken: $accessToken, tokenType: $tokenType, expires: $expires, refreshToken: $refreshToken, scope: $scope}';
  }
}
