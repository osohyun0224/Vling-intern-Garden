import React from 'react';
import styles from './ReportTitleGroup.module.scss';

const ReportTitleGroup = ({ currentDate }) => {
  return (
    <div className={styles.reporttitlegroup}>
      <div className={styles.reporttitle}>채널 정보</div>
      <div className={styles.reportdategroup}>
        <div className={styles.reportdatetitle}>제안서 작성 날짜</div>
        <div className={styles.reportdate}>{currentDate}</div>
      </div>
    </div>
  );
};

export default ReportTitleGroup;
