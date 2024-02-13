import React from 'react';
import styles from './Header.module.scss';
import LogoImage from '@bzznbyd/atoms-logoimage';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <LogoImage src="/images/svg/vling_new_logo.svg" alt="Logo" width="60px" height="60px" />
      </div>
      안녕하세요
    </div>
  );
};

export default Header;
