TypeScript x CloudFunctionsによるSlackApp

# Firebase、Slack系のメモ

## 動作手順

```bash
cd ./functions

# envファイルの設定
cp base.env .env
vi .env

# インストール
npm install

# CloudFunctionsローカル起動
npm run start
```

## CloundFunctionsをTypeScriptで書く

### `tsc --watch`

**package.json**に以下のnpmスクリプトを追加した。

```json
{
  "scripts": {
    "watch": "tsc --watch"
  }
}
```

`yarn watch`を起動することで、保存と同時に`tsc`によるコンパイル、エラー検出が行える。

開発時は`yarn watch`を常に起動しておくことをオススメする。

### `firebase functions:shell`

記述したfunctionsは、

```json
{
  "scripts": {
    "build": "tsc",
    "shell": "yarn build && firebase functions:shell"
  }
}
```

`yarn shell`で、ローカル上でテストすることができる。

やっていることは、コンパイル→firebase cliを使ってローカル上で動作させている。

### 参考文献

- [Qiita - Cloud Functions を TypeScript で書く](https://qiita.com/star__hoshi/items/7dcf5970d28a7ff239fb)

## Slack系

### Bolt

- [Bolt入門ガイド](https://slack.dev/bolt/ja-jp/tutorial/getting-started)

Boltはリスニングを前提に作られたSlackApp作成のためのフレームワーク（という解釈）。  
[node-slack-sdk](https://github.com/slackapi/node-slack-sdk)も包括されているっぽいので、  
今後、基本的にはBoltを入れておけば良さそう。

> WebAPI・EventAPIだけ使いたい場合は、それぞれ導入してもOK。

# その他

## prettierの導入

導入手順をメモ

```bash
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

### `.prettierrc.js`

```js
module.exports = {
  semi: false,
  tabWidth: 2,
  singleQuote: true
}
```

### `.eslintrc.js`

セミコロン等のフォーマットはすべてprettierに任せる

```diff
module.exports = {
  // 省略
- extends: ['eslint:recommended'],
+ extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  // 省略
+ plugins: ['prettier'],
  rules: {
    // 共通のルールを設定
-   semi: ["error", "never"],
-   quotes: ["error", "single"],
-   indent: ["error", 2]
+   'prettier/prettier': 'error'
  },
  // 省略
  overrides: [
    {
      // 省略
      rules: {
        // interface等のメンバーを定義する際、複数行にまたがる場合はデミリタ無しとする (prettierとの競合解消)
+       '@typescript-eslint/member-delimiter-style': [
+         'error',
+         {
+           multiline: {
+             delimiter: 'none',
+             requireLast: false
+           },
+           singleline: {
+             delimiter: 'comma',
+             requireLast: false
+           }
+         }
+       ]
      }
    }
  ]
}
```

### `package.json`

lint用コマンドを追加  
glob指定だと、該当するファイルが1つもない場合にエラーとなるため、extオプションで指定する  

```json
{
  "scripts": {
    "lint-fix": "eslint --ext .ts,.js --fix src/**"
  },
}
```

### 参考文献

- [Prettier - Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html#eslint)
  - eslintやstylelintとの連携方法が記載されている
- [Prettier - Options](https://prettier.io/docs/en/options.html#semicolons)
  - `.prettierrc.js`に指定するkey-valueを確認できる
- [Qiita - typescript-eslintの拡張子設定](https://qiita.com/karak/items/12811d235b0d8bc8ad00)
  - extオプションを参考にした
