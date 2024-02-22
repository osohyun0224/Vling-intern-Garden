import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './AdVideoStat2.module.scss';
import { getChannel } from '../../../../../shared-gql/channel/channel.gpl'

const AdVideoStat2 = () => {
  const videoId = "jKQPDDunY7s";

  const { data, loading, error } = useQuery(getChannel, {
    variables: { channelId: "UCZ3dxObRPEJzoryEyQqmhWg", videoIds: [videoId] },
  });

  if (loading) return <div className={styles.loadingSpinner}></div>;
  if (error) return <div>Error: {error.message}</div>;

  const videoData = data.videos[0];
  if (!videoData) return <div>Video data not found</div>;

  const viewsPerSubscriber = ((videoData.viewCount / videoData.subscriberCount) * 100).toFixed(2);
  const commentEngagementRate = ((videoData.commentCount / videoData.subscriberCount) * 100).toFixed(2);
  const likeEngagementRate = ((videoData.likeCount / videoData.subscriberCount) * 100).toFixed(2);

  return (
    <div className={styles.container}>
      <img src={videoData.thumbnails} alt="Thumbnail" className={styles.thumbnail} />
      <div className={styles.title}>{videoData.title.length > 30 ? `${videoData.title.substring(0, 30)}...` : videoData.title}</div>
      <div className={styles.statRow}>
        <span className={styles.statItem}>조회 수</span>
        <span className={styles.statData}>{videoData.viewCount}</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.statItem}>구독자 대비 조회수</span>
        <span className={styles.statData}>{viewsPerSubscriber}%</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.statItem}>댓글 참여율</span>
        <span className={styles.statData}>{commentEngagementRate}%</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.statItem}>좋아요 참여율</span>
        <span className={styles.statData}>{likeEngagementRate}%</span>
      </div>
      <div className={styles.statRow}>
        <span className={styles.statItem}>알고리즘 스코어</span>
        <span className={styles.statData}>{videoData.algosinLikePercentile}</span>
      </div>
    </div>
  );
};

export default AdVideoStat2;
