import { WebClient, WebAPICallResult } from '@slack/web-api'
import * as dotenv from 'dotenv'

dotenv.config()

export interface ConversationsListResult extends WebAPICallResult {
  channels?: Channel[]
}

export interface Channel {
  id: string
  name: string
  name_normalized: string
}

export async function list(): Promise<Channel[]> {
  const client = new WebClient(process.env.SLACK_OAUTH_TOKEN)
  const result: ConversationsListResult = await client.conversations.list()
  return result.channels || []
}
