const getPlatformStatus = {
    hasCrypto: window.___TikiSdk__hasCrypto || false,
    secure: window.___TikiSdk__isSecure() || false,
};

const isPlatformReady = () => {
  return true;
};

module.exports = { getPlatformStatus, isPlatformReady };
