import * as functions from 'firebase-functions'
import axios from 'axios'
import * as dotenv from 'dotenv'
import * as channelRanking from './functions/channel-ranking'

dotenv.config()

export const test = functions.https.onRequest(async (_, res) => {
  await axios({
    method: 'POST',
    url: 'https://slack.com/api/chat.postMessage',
    params: {
      token: process.env.SLACK_TOKEN,
      channel: 'general',
      text: 'Hello TypeScript Slack App'
    }
  })
  res.status(200).end()
  channelRanking.run()
})
