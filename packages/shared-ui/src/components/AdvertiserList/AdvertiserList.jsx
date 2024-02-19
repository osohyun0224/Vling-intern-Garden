import React ,{useState} from 'react';
import styles from './AdvertiserList.module.scss';
import ReportModal from '../ReportModal/reportmodal';

const AdvertiserList = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const advertisers = [
    { id: 1, companyName: 'Logitech Korea', email: 'logitech@example.com', adRate: '500,000', imageUrl: '/images/adkeyboard/logitech.png' },
    { id: 2, companyName: 'ABKO Korea', email: 'abko@example.com', adRate: '600,000', imageUrl: '/images/adkeyboard/abko.png' },
    { id: 3, companyName: '한성 컴퓨터', email: 'hansung@example.com', adRate: '700,000', imageUrl: '/images/adkeyboard/hansung.png' },
    { id: 4, companyName: '삼성 SAMSUNG', email: 'samsung@example.com', adRate: '900,000', imageUrl: '/images/adkeyboard/samsung.png' },
    { id: 5, companyName: 'Corsair', email: 'corsair@example.com', adRate: '400,000', imageUrl: '/images/adkeyboard/corsair.png' },
    { id: 6, companyName: 'RAZUR', email: 'razur@example.com', adRate: '700,000', imageUrl: '/images/adkeyboard/razur.png' },
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
        <ReportModal show={showModal} onClose={toggleModal} />
      </div>
      <hr className={styles.divider} />

      {advertisers.map((advertiser, index) => (
        <React.Fragment key={advertiser.id}>
          <div className={styles.contentRow}>
            <span className={styles.listNumber}>{index + 1}</span>
            <img src={advertiser.imageUrl} alt="Advertiser" className={styles.advertiserImage} />
            <span className={styles.companyName}>{advertiser.companyName}</span>
            <span className={styles.email}>{advertiser.email}</span>
            <span className={styles.adRate}>{advertiser.adRate}</span>
            <div className={styles.buttonGroup}>
              <button className={styles.homeButton}>회사 Home</button>
              <button className={styles.detailButton}>회사 상세 소개</button>
            </div>
            <button className={styles.proposalButton} onClick={toggleModal}>광고 제안서 작성하기</button>
          </div>
          {index < advertisers.length - 1 && <hr className={styles.divider} />}
        </React.Fragment>
      ))}
      <hr className={styles.divider} />
    </div>
  );
};

export default AdvertiserList;
