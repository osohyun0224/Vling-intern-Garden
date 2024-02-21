import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './RecentVideoStat.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

const RecentVideoStat = () => {
  const channelId = "UCZ3dxObRPEJzoryEyQqmhWg";

  const { data, loading, error } = useQuery(getChannel, {
    variables: { channelId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 평균 조회수를 만 단위로 변환
  const formatAverageViews = (views) => {
    const viewsInTenThousands = views / 10000;
    return viewsInTenThousands >= 1 ? `${Math.floor(viewsInTenThousands)}만` : `${viewsInTenThousands.toFixed(1)}만`;
  };

  // 평균 댓글 수와 평균 좋아요 수를 소수점 없이 표시
  const formatAverageCounts = (count) => Math.floor(count);

  const averageViews = formatAverageViews(data.channel.videoStatIn90Days.avgViewCountPerVideo);
  const videoCount = data.channel.videoStatIn90Days.sumVideoCount;
  const averageComments = formatAverageCounts(data.channel.videoStatIn90Days.avgCommentCountPerVideo);
  const averageLikes = formatAverageCounts(data.channel.videoStatIn90Days.avgLikeCountPerVideo);

  return (
    <div className={styles.recentVideoStat}>
      <div className={styles.title}>최근 3개월 영상 통계 데이터</div>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <div className={`${styles.quadrant} ${styles.q1}`}>
          <div className={styles.title}>평균 조회수</div>
          <div className={styles.data}>{averageViews}</div>
        </div>
        <div className={`${styles.quadrant} ${styles.q2}`}>
          <div className={styles.title}>영상 수</div>
          <div className={styles.data}>{videoCount}</div>
        </div>
        <div className={`${styles.quadrant} ${styles.q3}`}>
          <div className={styles.title}>평균 댓글 수</div>
          <div className={styles.data}>{averageComments}</div>
        </div>
        <div className={`${styles.quadrant} ${styles.q4}`}>
          <div className={styles.title}>평균 좋아요 수</div>
          <div className={styles.data}>{averageLikes}</div>
        </div>
      </div>
    </div>
  );
};

export default RecentVideoStat;
