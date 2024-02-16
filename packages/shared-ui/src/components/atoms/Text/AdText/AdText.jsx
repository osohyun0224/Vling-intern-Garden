import React from 'react';
import styles from './AdText.module.scss';

const AdText = ({ children, type }) => {
  return <div className={`${styles.text} ${styles[type]}`}>{children}</div>;
};

export default AdText;
