import React from 'react';
import styles from './AdvertiserList.module.scss';

const AdvertiserList = () => {
  const advertisers = [
    { id: 1, companyName: '회사명 1', email: 'email1@example.com', adRate: '100,000', imageUrl: '/path/to/image1.png' },
    { id: 2, companyName: '회사명 2', email: 'email2@example.com', adRate: '200,000', imageUrl: '/path/to/image2.png' },
  ];

  return (
    <div className={styles.container}>
      <hr className={styles.divider} />
      <div className={styles.titleRow}>
        <span>목록</span>
        <span>광고주 상세 정보</span>
        <span>이메일</span>
        <span>평균 광고 단가</span>
        <span>회사 상세 정보</span>
        <span>광고 제안 바로가기</span>
      </div>
      <hr className={styles.divider} style={{ top: '850.96px' }} />

      {advertisers.map((advertiser, index) => (
        <div key={advertiser.id} className={styles.contentRow} style={{ top: `${860.96 + 100 * index}px` }}>
          <span className={styles.listNumber}>{index + 1}</span>
          <img src={advertiser.imageUrl} alt="Advertiser" className={styles.advertiserImage} />
          <span className={styles.companyName}>{advertiser.companyName}</span>
          <span className={styles.email}>{advertiser.email}</span>
          <span className={styles.adRate}>{advertiser.adRate}</span>
          <div className={styles.buttonGroup}>
            <button>회사 Home</button>
            <button>회사 상세 소개</button>
          </div>
          <button className={styles.proposalButton}>광고 제안서 작성하기</button>
        </div>
      ))}
    </div>
  );
};

export default AdvertiserList;
