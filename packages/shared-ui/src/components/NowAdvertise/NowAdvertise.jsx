import React, { useState } from 'react';
import styles from './NowAdvertise.module.scss';
import ImageContainer from '@bzznbyd/atom-advertise-image';
import Category from '@bzznbyd/atom-ad-category';
import Text from '@bzznbyd/atoms-ad-text';
import AuthorImage from '@bzznbyd/atom-ad-profile-image';

const NowAdvertise = () => {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked(!liked);

  return (
    <div className={styles.container}>
      <ImageContainer src="https://via.placeholder.com/313x213" alt="Ad" liked={liked} toggleLike={toggleLike} />
      <Category>카테고리</Category>
      <Text type="title">광고 제목</Text>
      <Text type="info">모집 기간 정보</Text>
      <Text type="info">광고 예산 정보</Text>
      <div className={styles.author}>
        <AuthorImage src="https://via.placeholder.com/30" alt="Author" />
        <Text type="authorName">작성자 이름</Text>
      </div>
    </div>
  );
};

export default NowAdvertise;
