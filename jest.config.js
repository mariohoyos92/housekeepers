module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/*.(ts|tsx)", "**/*.test.(ts|tsx)"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  globals: {
    "ts-jest": {
      tsConfig: "jest.tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect", "./jest-setup"],
};
