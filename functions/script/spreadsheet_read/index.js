const dotenv = require('dotenv')

dotenv.config()

// サービスアカウントを設定、jsonをbase64化した文字列から読み取り - https://cloud.google.com/natural-language/docs/common/auth?hl=ja
const key = JSON.parse(
  new Buffer(process.env.GOOGLE_DRIVE_KEY, 'base64').toString()
)

const SpreadsheetAccess = require('google-spreadsheet')
const book = new SpreadsheetAccess(process.env.SPREADSHEET_ID)

// https://developers.google.com/sheets/api/guides/values
book.useServiceAccountAuth(key, error => {
  if (error) {
    throw new Error(error)
  }

  book.getInfo((error, data) => {
    if (error) {
      throw new Error(error)
    }
    data.worksheets.forEach(sheet => {
      sheet.getRows({}, (error, rows) => {
        if (error) {
          throw new Error(error)
        }

        // output ex. { row: 'type: connpass, url: https://〜.connpass.com/〜/' }
        rows.forEach(row => {
          console.log({
            row: `type: ${row.type}, url: ${row.url}`
          })
        })
      })
    })
  })
})
