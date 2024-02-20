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
      videoCountInfo {
        #영상을 며칠에 한번씩 올리는지 평균을 계산하기 위한 것 > 5.83일
        videoYearCount
      }
      videoStatIn90Days {
        #총 영상의 개수
        sumVideoCount
        #평균 조회수
        avgViewCountPerVideo
        #평균 좋아요 수
        avgLikeCountPerVideo
        #평균 댓글 수
        avgCommentCountPerVideo
      }
    }
  }
`