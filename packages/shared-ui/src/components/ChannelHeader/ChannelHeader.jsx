import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './ChannelHeader.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

const ChannelHeader = () => {
  const channelId = "UCZ3dxObRPEJzoryEyQqmhWg"; 

  const { data, loading, error } = useQuery(getChannel, {
    variables: { channelId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>; 
  }

  const { title: channelName, thumbnails: channelImage } = data.channel;
  const channelCategories = ['Vlog/일상', '지식/정보', 'IT/과학기술']

  return (
    <div className={styles.channelHeader}>
      <img src={channelImage} alt="Channel" className={styles.channelImage} />
      <div className={styles.channelInfo}>
        <div className={styles.channelName}>{channelName}</div>
        <div className={styles.channelCategories}>
          {channelCategories.map((category, index) => (
            <div
              key={index}
              className={`${styles.channelCategory} ${index === channelCategories.length - 1 ? styles.lastCategory : ''}`}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.leftStats}>
        <div className={styles.subscribers}>
          <img src="/images/png/People.png" alt="Subscribers" className={styles.statIcon} />
          <span className={styles.statTitle}>채널의 구독자 수 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className={styles.statValue}>4만</span>
        </div>
        <div className={styles.algorithmScore}>
          <img src="/images/png/Ratings.png" alt="Algorithm Score" className={styles.statIcon} />
          <span className={styles.statTitle}>알고리즘 스코어</span>
          <span className={styles.statValue}>58 높음</span>
        </div>
      </div>
      <div className={styles.rightStats}>
        <div className={styles.viewerEngagement}>
          <img src="/images/png/Volunteering.png" alt="Viewer Engagement" className={styles.statIcon} />
          <span className={styles.statTitle}>시청자 참여도</span>
          <span className={styles.statValue}>높음</span>
        </div>
        <div className={styles.subscriberActivity}>
          <img src="/images/png/Radioactive.png" alt="Subscriber Activity" className={styles.statIcon} />
          <span className={styles.statTitle}>구독자 활성도</span>
          <span className={styles.statValue}>낮음</span>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.vlingDetailButton}>vling 채널 상세</button>
        <button className={styles.goYouTubeButton}>
          <img src="/images/png/YouTube.png" className={styles.statYIcon} /> 채널 바로가기
        </button>
      </div>
    </div>
  )
}

export default ChannelHeader
