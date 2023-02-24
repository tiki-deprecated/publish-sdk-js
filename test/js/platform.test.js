const { tikiApi } = require("../../src/api");
const { getPlatformStatus} = require("../../src/platform");

jest.mock("../../src/platform");


test("ensure platform is running in a secure context", () => {
  expect(globalThis.isSecureContext).toBeFalsy();
  jest.resetModules();
});

test("ensure platform is running in a secure context", () => {
  getPlatformStatus.mockImplementation(() => {secure: true});
  const platformStatus = tikiApi();
  expect(platformStatus).toMatchObject({
      secure: true
  });
  jest.resetModules();
});
