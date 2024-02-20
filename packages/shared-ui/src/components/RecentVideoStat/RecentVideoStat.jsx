import React from 'react';
import styles from './RecentVideoStat.module.scss';

const RecentVideoStat = () => {
  return (
    <div className={styles.recentVideoStat}>
      <div className={styles.title}>최근 3개월 영상 통계 데이터</div>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        {/* 내용 정보 구현 부분 (영상 수, 조회수, 댓글수, 좋아요수) */}
      </div>
    </div>
  );
};

export default RecentVideoStat;
