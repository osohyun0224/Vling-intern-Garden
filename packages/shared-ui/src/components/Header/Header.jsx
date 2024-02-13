import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/svg/vling_new_logo.svg" alt="Logo" style={{ width: '60px', height: '60px' }} />
      </div>
    </div>
  );
};

export default Header;
