import React, { useState } from 'react';
import styles from './NowAdvertise.module.scss';
import likeIcon from '../../../../../workspace_template/exportStaticExample/public/images/png/Favorite.png';
import likedIcon from '../../../../../workspace_template/exportStaticExample/public/images/png/Love.png';

const NowAdvertise = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="https://via.placeholder.com/313x213" alt="Ad" className={styles.adImage} />
        <img src={liked ? likedIcon : likeIcon} alt="Like" className={styles.likeIcon} onClick={toggleLike} />
      </div>
      <div className={styles.category}>카테고리</div>
      <h2 className={styles.title}>광고 제목</h2>
      <p className={styles.info}>모집 기간 정보</p>
      <p className={styles.info}>광고 예산 정보</p>
      <div className={styles.author}>
        <img src="https://via.placeholder.com/30" alt="Author" className={styles.authorImage} />
        <span className={styles.authorName}>작성자 이름</span>
      </div>
    </div>
  );
};

export default NowAdvertise;
