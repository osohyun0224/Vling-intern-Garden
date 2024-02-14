import React from 'react';
import styles from './IntroText.module.scss';

const IntroText = () => {
  return (
    <p className={styles.description}>
      블링에 등록된 광고주들을 확인하고, 자신에게 맞는 광고를 먼저 제안해보세요! <br />
      관심있는 회사와 분야를 검색해보세요 :)
    </p>
  );
};

export default IntroText;
