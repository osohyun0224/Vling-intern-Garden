import React from 'react';
import styles from './TitleText.module.scss';

const TitleText = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default TitleText;
