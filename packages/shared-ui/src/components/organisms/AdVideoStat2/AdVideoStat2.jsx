import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './AdVideoStat2.module.scss';
import { getChannel } from '../../../../../shared-gql/channel/channel.gpl'

const AdVideoStat2 = () => {
  const videoId = "jKQPDDunY7s";

  const { data, loading, error } = useQuery(getChannel, {
    variables: { channelId: "UCZ3dxObRPEJzoryEyQqmhWg", videoIds: [videoId] },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const videoData = data.videos[0];
  if (!videoData) return <div>Video data not found</div>;

  const viewsPerSubscriber = ((videoData.viewCount / videoData.subscriberCount) * 100).toFixed(2);
  const commentEngagementRate = ((videoData.commentCount / videoData.subscriberCount) * 100).toFixed(2);
  const likeEngagementRate = ((videoData.likeCount / videoData.subscriberCount) * 100).toFixed(2);

  return (
    <div className={styles.container}>
      <img src={videoData.thumbnails} alt="Thumbnail" className={styles.thumbnail} />
      <div className={styles.title}>{videoData.title.length > 15 ? `${videoData.title.substring(0, 15)}...` : videoData.title}</div>
      <div className={styles.statRow}>
        <div className={styles.statItem}>조회 수</div>
        <div className={styles.statData}>{videoData.viewCount}</div>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statItem}>구독자 대비 조회수</div>
        <div className={styles.statData}>{viewsPerSubscriber}%</div>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statItem}>댓글 참여율</div>
        <div className={styles.statData}>{commentEngagementRate}%</div>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statItem}>좋아요 참여율</div>
        <div className={styles.statData}>{likeEngagementRate}%</div>
      </div>
      <div className={styles.statRow}>
        <div className={styles.statItem}>알고리즘 스코어</div>
        <div className={styles.statData}>{videoData.algosinLikePercentile}</div>
      </div>
    </div>
  );
};

export default AdVideoStat2;
