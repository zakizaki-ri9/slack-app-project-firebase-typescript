// base64文字列に変換する対象のjsonファイルを配置する
const raw = JSON.stringify(require('./target.json'))

console.log({
  raw: raw,
  base64String: new Buffer(raw).toString('base64')
})
