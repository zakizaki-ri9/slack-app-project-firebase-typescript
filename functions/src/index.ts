import * as functions from 'firebase-functions'
import * as dotenv from 'dotenv'
import * as conversations from './functions/slack/conversations'
import { WebClient } from '@slack/web-api'
import { App } from '@slack/bolt'

dotenv.config()

export const channelNamesPost = functions.https.onRequest(async (_, res) => {
  const channels = await conversations.list()

  if (channels) {
    const client = new WebClient(process.env.SLACK_BOT_TOKEN)
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

export const boltChannelNamesPost = functions.https.onRequest(
  async (_, res) => {
    const channels = await conversations.list()
    if (channels) {
      const app = new App({
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET
      })

      await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: 'general',
        text: channels
          .map(v => {
            return v.name_normalized
          })
          .join('\n')
      })

      res.status(200).end()
    }
  }
)
