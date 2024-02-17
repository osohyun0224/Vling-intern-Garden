import React from 'react';
import styles from './AdProfileImage.module.scss';

const AdProfileImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.authorImage} />;
};

export default AdProfileImage;
