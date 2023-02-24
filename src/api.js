const { getPlatformStatus } = require('./platform');

const tikiApi = () => {
  return getPlatformStatus();
};

module.exports = { tikiApi };
