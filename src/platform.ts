import './main.dart.js';

export function getPlatformStatus(): object {
  return {
    hasCrypto: window.___TikiSdk__hasCrypto || false,
    secure: window.___TikiSdk__isSecure || false,
  };
}

const isDefined: () => boolean = (entry) => !!(entry !== false);


export function isPlatformReady(): boolean {
  return Object.values(getPlatformStatus()).every(isDefined);
}
