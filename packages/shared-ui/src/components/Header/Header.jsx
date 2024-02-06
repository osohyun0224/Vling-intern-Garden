import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../../../public/images/svg/vling_logo_svg';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Header;
