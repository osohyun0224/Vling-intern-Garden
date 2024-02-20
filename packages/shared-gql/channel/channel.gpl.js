import { gql } from '@apollo/client'

export const getChannel=gql`
query getChannel($channelId: String!) {
    channel(channelId: $channelId) {
      title
    }
  }
`