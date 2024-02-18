import React from 'react';
import styles from './AdvertiseImage.module.scss';

const AdvertiseImage = ({ src, alt, liked, toggleLike }) => {
  return (
    <div className={styles.container}>
      <img src={src} alt={alt} className={styles.adImage} />
      <img 
        src={liked ? "/images/png/Love.png" : "/images/png/Favorite.png"} 
        alt="Like" 
        className={`${styles.likeIcon} ${liked ? styles.liked : ''}`}
        onClick={toggleLike} 
      />
    </div>
  );
};

export default AdvertiseImage;
