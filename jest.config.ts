const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom", // jsdomを使ったブラウザ環境をシミュレート
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // カスタムマッチャーをセットアップ
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // エイリアスの設定
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // TypeScript ファイルを ts-jest で変換
  },
};

module.exports = createJestConfig(customJestConfig);
