import * as functions from 'firebase-functions'
import * as dotenv from 'dotenv'
import * as conversations from './functions/slack/conversations'
import { WebClient } from '@slack/web-api'

dotenv.config()

export const channelNamesPost = functions.https.onRequest(async (_, res) => {
  const channels = await conversations.list()
  if (channels) {
    const client = new WebClient(process.env.SLACK_TOKEN)
    await client.chat.postMessage({
      channel: 'general',
      text: channels
        .map(v => {
          return v.name_normalized
        })
        .join('\n')
    })
  }

  // 200OKを返す
  res.status(200).end()
})
