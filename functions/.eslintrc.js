module.exports = {
  // 共通の設定
  env: {
    es6: true,
    node: true
  },
  extends: ["eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    // 共通のルールを設定
    semi: ["error", "never"],
    quotes: ["error", "single"],
    indent: ["error", 2]
  },
  overrides: [
    // TypeScript系ファイルへのルールを設定
    {
      files: ["**/*.ts"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json"
      },
      plugins: ["@typescript-eslint"],
      rules: {
        // TypeScript系のファイルに対しての設定を行う
      }
    }
  ]
}
