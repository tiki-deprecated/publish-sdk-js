import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: false,
  testEnvironment: "jsdom",
  clearMocks: false,
  //setupFiles: ["./test/js/setupJestMock.ts"],
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
