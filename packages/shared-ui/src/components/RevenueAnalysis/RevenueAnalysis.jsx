import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './RevenueAnalysis.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

const RevenueAnalysis = () => {
  const channelId = 'UCZ3dxObRPEJzoryEyQqmhWg';

  // 채널 데이터 및 환율 정보를 불러오는 쿼리 실행
  const { data, loading, error } = useQuery(getChannel, {
    variables: { channelId},
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // 조회수 수익 계산
  const generalMinViewRevenue = data.channel.dailyAverageViewCount * data.channel.viewCountRatioInVideo30.normal * 40 * 2;
  const generalMaxViewRevenue = data.channel.dailyAverageViewCount * data.channel.viewCountRatioInVideo30.normal * 40 * 4.5;
  
  const shortsMinViewRevenue = data.channel.dailyAverageViewCount * data.channel.viewCountRatioInVideo30.shorts * 40 * 0.06;
  const shortsMaxViewRevenue = data.channel.dailyAverageViewCount * data.channel.viewCountRatioInVideo30.shorts * 40 * 0.4;

  const totalMinRevenue = generalMinViewRevenue + shortsMinViewRevenue;
  const totalMaxRevenue = generalMaxViewRevenue + shortsMaxViewRevenue;

  // 광고 수익 (현재 0원으로 가정)
  const generalAdRevenue = 0;
  const shortsAdRevenue = 0;

  return (
    <div className={styles.RevenueAnalysis}>
      <div className={styles.title}>최근 30일 조회수 수익</div>
      <div className={styles.divider}></div>
      <div className={styles.revenueGroup}>
        <div className={styles.generalVideoGroup}>
          <div className={styles.viewTitleText}>일반 영상 조회수 수익</div>
          <div className={styles.viewRevenueText}>{generalMinViewRevenue.toLocaleString()}원 ~ {generalMaxViewRevenue.toLocaleString()}원</div>
        </div>
        <div className={styles.generalVideoGroup}>
          <div className={styles.viewTitleText}>Shorts 영상 조회수 수익</div>
          <div className={styles.viewRevenueText}>{shortsMinViewRevenue.toLocaleString()}원 ~ {shortsMaxViewRevenue.toLocaleString()}원</div>
        </div>
      </div>
      <div className={styles.title}>최근 30일 광고 수익</div>
      <div className={styles.divider}></div>
      <div className={styles.revenueGroup}>
        <div className={styles.generalVideoGroup}>
          <div className={styles.viewTitleText}>일반 영상 광고 수익</div>
          <div className={styles.viewRevenueText}>{generalAdRevenue.toLocaleString()}원</div>
        </div>
        <div className={styles.generalVideoGroup}>
          <div className={styles.viewTitleText}>Shorts 영상 광고 수익</div>
          <div className={styles.viewRevenueText}>{shortsAdRevenue.toLocaleString()}원</div>
        </div>
      </div>
      <div className={styles.title}>최근 30일 총 수익</div>
      <div className={styles.divider}></div>
      <div className={styles.revenueText}>{totalMinRevenue.toLocaleString()}원 ~ {totalMaxRevenue.toLocaleString()}원</div>
    </div>
  );
};

export default RevenueAnalysis;