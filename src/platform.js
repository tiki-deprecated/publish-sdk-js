import * as dart from './main.dart.js';

const getPlatformStatus = {
    hasCrypto: window.___TikiSdk__hasCrypto || false,
    secure: window.___TikiSdk__isSecure || false,
    hasWallet: window.___TikiSdk__hasWallet || false,
    sqliteVersion: window.___TikiSdk__sqliteVersion || null,
};

const isDefined = (entry) => !!(entry() !== false);


const isPlatformReady = () => {
  return Object.values(getPlatformStatus).every(isDefined);
};

module.exports = { getPlatformStatus, isPlatformReady };
