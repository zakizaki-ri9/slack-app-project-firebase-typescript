TypeScript x CloudFunctionsによるSlackApp

# メモ

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

# その他

## 参考文献

- [Qiita - Cloud Functions を TypeScript で書く](https://qiita.com/star__hoshi/items/7dcf5970d28a7ff239fb)
