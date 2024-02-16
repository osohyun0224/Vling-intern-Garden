import React from 'react';
import styles from './AdCategory.module.scss';

const AdCategory = ({ children }) => {
  return <div className={styles.category}>{children}</div>;
};

export default AdCategory;
