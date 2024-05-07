import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Other Jest configuration options...

  moduleNameMapper: {
    '^@/database/(.*)$': '<rootDir>/src/database/$1',
    '^@/otherfolder/(.*)$': '<rootDir>/src/otherfolder/$1',
    // Add other mappings as needed for your project
  },

  // Other Jest configuration options...
};

export default config;
