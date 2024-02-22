import React from 'react'
import { useQuery } from '@apollo/client'
import styles from './ViewerStat.module.scss'
import { getChannel } from '../../../../shared-gql/channel/channel.gpl'

const ViewerStat = () => {
  const channelId = 'UCZ3dxObRPEJzoryEyQqmhWg'
  const { data, loading, error } = useQuery(getChannel, { variables: { channelId } })

  if (loading) return <div className={styles.loadingSpinner}></div>
  if (error) return <div>Error: {error.message}</div>

  const { F: femalePercent, M: malePercent } = data.channel.genderPercent

  const sortedAges = [...data.channel.age].sort((a, b) => b.percent - a.percent).slice(0, 3)

  return (
    <div className={styles.viewerStat}>
      <div className={styles.title}>시청자 성별</div>
      <div className={styles.divider}></div>
      <div className={styles.genderGraph}>
        <div className={styles.male} style={{ width: `${malePercent}%` }}>
          남자
        </div>
        <div className={styles.female} style={{ width: `${femalePercent}%` }}>
          여자
        </div>
      </div>
      <div className={styles.title}>시청자 나이대 Top 3</div>
      <div className={styles.divider}></div>
      <div className={styles.ageStats}>
        {sortedAges.map((age, index) => (
          <div key={index} className={styles.ageGroup}>
            <div className={styles.rank}>{`${index + 1}위`}</div>
            <div className={styles.ageRange}>{`${age.min}-${age.max ? age.max : '+'}`}</div>
          </div>
        ))}
      </div>
      <div className={styles.title}>시청자 관심 카테고리 Top 3</div>
      <div className={styles.divider}></div>
      <div className={styles.categoryGroup}>
          <div className={styles.categoryRank}>1위</div>
          <div className={styles.categoryText}>IT/과학기술</div>
        </div>
        <div className={styles.categoryGroup}>
          <div className={styles.categoryRank}>2위</div>
          <div className={styles.categoryText}>지식/정보</div>
        </div>
        <div className={styles.categoryGroup}>
          <div className={styles.categoryRank}>3위</div>
          <div className={styles.categoryText}>자동차</div>
        </div>
      </div>
  );
};

export default ViewerStat;
