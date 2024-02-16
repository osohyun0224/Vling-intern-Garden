import React from 'react';
import styles from './SubTitleText.module.scss';

const SubTitleText = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default SubTitleText;
