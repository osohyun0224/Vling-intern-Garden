import React from 'react';
import { useQuery } from '@apollo/client';
import styles from './AdvertisingPrice.module.scss';
import { getChannel } from '../../../../shared-gql/channel/channel.gpl';

const AdvertisingPrice = () => {
  const channelId = 'UCZ3dxObRPEJzoryEyQqmhWg';

  const { data, loading, error } = useQuery(getChannel, { variables: { channelId } });

  if (loading) return <div className={styles.loadingSpinner}></div>;
  if (error) return <div>Error: {error.message}</div>;

  const brandedPrice = data.channel.maxAdvertisingUnitPrice;
  const cpvBrand = data.channel.cpvInfo.cpvBrand;
  const pplPrice = data.channel.minAdvertisingUnitPrice;
  const cpv = data.channel.cpvInfo.cpv;

  const estimatedBrandedViews = (brandedPrice / cpvBrand) - 1474;
  const estimatedPplViews = (pplPrice / cpv) - 1474; 

  return (
    <div className={styles.AdvertisingPrice}>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>광고 종류</div>
          <div className={styles.headerCell}>광고 단가</div>
          <div className={styles.headerCell}>CPV</div>
          <div className={styles.headerCell}>예상 조회 수</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tableRow}>
          <div className={styles.rowCell}>브랜디드</div>
          <div className={styles.rowCell}>{brandedPrice.toLocaleString()}원</div>
          <div className={styles.rowCell}>{cpvBrand.toLocaleString()}원</div>
          <div className={styles.rowCell}>{estimatedBrandedViews.toLocaleString()}회</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tableRow}>
          <div className={styles.rowCell}>PPL</div>
          <div className={styles.rowCell}>{pplPrice.toLocaleString()}원</div>
          <div className={styles.rowCell}>{cpv.toLocaleString()}원</div>
          <div className={styles.rowCell}>{estimatedPplViews.toLocaleString()}회</div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingPrice;
