import React from 'react';
//import { useQuery } from '@apollo/client';
import styles from './RecentAdVideoStat.module.scss';
//import { getChannel } from '../../../../shared-gql/channel/channel.gpl';
import AdVideoStat1 from '../organisms/AdVideoStat1/AdVideoStat1';
import AdVideoStat2 from '../organisms/AdVideoStat2/AdVideoStat2';
const RecentAdVideoStat = () => {
  const channelId = "UCZ3dxObRPEJzoryEyQqmhWg";

  return (
    <div className={styles.recentAdVideoStat}>
      <div className={styles.title}>최근 3개월 광고 진행 영상</div>
      <div className={styles.divider}></div>
      <div className={styles.subtitle}>* 조회수 순</div>
      <AdVideoStat1/>
      <AdVideoStat2/>
    </div>
  );
};

export default RecentAdVideoStat;
