import { gql } from '@apollo/client'

export const getChannel = gql`
  query getChannel($channelId: String!) {
    channel(channelId: $channelId) {
      ##{채널의 헤더에서 사용하는 정보}
      # 채널 제목
      title
      # 채널의 이미지
      thumbnails
      # 알고리즘 스코어
      algosinLikesPerVideo
      # 구독자 수
      subscriberCount
      # 활성도 
      activePercentLevel
      # 참여도
      reactRatioLevel
    }
  }
`

// export const getVideo = gql`
// `