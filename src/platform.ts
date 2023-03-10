import './main.dart.cjs';

export function getPlatformStatus(): object {
  return {
    hasCrypto: window.___TikiSdk__hasCrypto || false,
    secure: window.___TikiSdk__isSecure || false,
  };
}

export function isDefined(entry: any): boolean {
  return !!(entry !== false);
}


export function isPlatformReady(): boolean {
  return Object.values(getPlatformStatus()).every(isDefined);
}
