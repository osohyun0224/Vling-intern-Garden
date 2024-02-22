import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './ViewerStat.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

const ViewerStat = () => {
  const channelId = 'UCZ3dxObRPEJzoryEyQqmhWg';
  const { data, loading, error } = useQuery(getChannel, { variables: { channelId } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { F: femalePercent, M: malePercent } = data.channel.genderPercent;

  return (
    <div className={styles.viewerStat}>
      <div className={styles.title}>시청자 성별</div>
      <div className={styles.divider}></div>
      <div className={styles.genderGraph}>
        <div className={styles.male} style={{ width: `${malePercent}%` }}>남자</div>
        <div className={styles.female} style={{ width: `${femalePercent}%` }}>여자</div>
      </div>
    </div>
  );
};

export default ViewerStat;
