const getPlatformStatus = () => {
  return {
    secure: window.isSecureContext
  }
};

module.exports = { getPlatformStatus };
