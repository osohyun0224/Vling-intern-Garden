import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './RecentVideoStat.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

//데이터 계산하는 로직 추가
const classifyAverageViews = (views) => {
  const viewsInTenThousands = views / 10000;
  if (viewsInTenThousands >= 1) return "높음";
  if (viewsInTenThousands >= 0.7 && viewsInTenThousands < 1) return "보통";
  return "낮음";
};

const classifyVideoCount = (count) => {
  if (count > 14) return "높음";
  if (count >= 10 && count <= 14) return "보통";
  return "낮음";
};

const classifyAverageComments = (comments) => {
  if (comments > 199) return "높음";
  if (comments >= 100 && comments <= 199) return "보통";
  return "낮음";
};

const classifyAverageLikes = (likes) => {
  if (likes > 99) return "높음";
  if (likes >= 50 && likes <= 99) return "보통";
  return "낮음";
};

const calculateUploadFrequency = (videoYearCount) => {
  const totalVideos = videoYearCount.reduce((acc, { count }) => acc + count, 0);
  const daysInYear = 365;
  const averageFrequency = daysInYear / totalVideos;
  return averageFrequency.toFixed(1);
};


const RecentVideoStat = () => {
  const channelId = "UCZ3dxObRPEJzoryEyQqmhWg";

  const { data, loading, error } = useQuery(getChannel, {
    variables: { channelId },
  });

  if (loading) return <div className={styles.loadingSpinner}></div>;
  if (error) return <p>Error: {error.message}</p>;

  const formatAverageViews = (views) => {
    const viewsInTenThousands = views / 10000;
    return viewsInTenThousands >= 1 ? `${Math.floor(viewsInTenThousands)}만` : `${viewsInTenThousands.toFixed(1)}만`;
  };

  const formatAverageCounts = (count) => Math.floor(count);

  const averageViews = formatAverageViews(data.channel.videoStatIn90Days.avgViewCountPerVideo);
  const videoCount = data.channel.videoStatIn90Days.sumVideoCount;
  const averageComments = formatAverageCounts(data.channel.videoStatIn90Days.avgCommentCountPerVideo);
  const averageLikes = formatAverageCounts(data.channel.videoStatIn90Days.avgLikeCountPerVideo);


  const viewsClassification = classifyAverageViews(data.channel.videoStatIn90Days.avgViewCountPerVideo);
  const videoCountClassification = classifyVideoCount(data.channel.videoStatIn90Days.sumVideoCount);
  const commentsClassification = classifyAverageComments(data.channel.videoStatIn90Days.avgCommentCountPerVideo);
  const likesClassification = classifyAverageLikes(data.channel.videoStatIn90Days.avgLikeCountPerVideo);
  const uploadFrequency = calculateUploadFrequency(data.channel.videoCountInfo.videoYearCount);

  return (
    <div className={styles.recentVideoStat}>
      <div className={styles.title}>최근 3개월 영상 통계 데이터</div>
      <div className={styles.divider}></div>
      <div className={styles.subtitle}>* 동일 카테고리 및 구독자 수 채널 통계 기반</div>
      <div className={styles.content}>
        <div className={`${styles.quadrant} ${styles.q1}`}>
          <div className={styles.title}>평균 조회수</div>
          <div className={styles.data}>{averageViews}</div>
          <div className={styles.data}>{viewsClassification}</div>
        </div>
        <div className={`${styles.quadrant} ${styles.q2}`}>
          <div className={styles.title}>영상 수</div>
          <div className={styles.data}>{videoCount}</div>
          <div className={styles.data}>{videoCountClassification}</div>
          
        </div>
        <div className={`${styles.quadrant} ${styles.q3}`}>
          <div className={styles.title}>평균 댓글 수</div>
          <div className={styles.data}>{averageComments}</div>
          <div className={styles.data}>{commentsClassification}</div>
        </div>
        <div className={`${styles.quadrant} ${styles.q4}`}>
          <div className={styles.title}>평균 좋아요 수</div>
          <div className={styles.data}>{averageLikes}</div>
          <div className={styles.data}>{likesClassification}</div>
        </div>
        <div className={styles.secondtitle}>평균 영상 업로드 주기</div>
        <div className={styles.yeardata}>{uploadFrequency}일/ 1년</div>
      </div>
    </div>
  );
};

export default RecentVideoStat;
