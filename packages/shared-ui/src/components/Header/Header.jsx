import React from 'react';
import styles from './Header.module.scss';
import Logo from '../../../../public/images/svg/vling_logo.svg';
import Image from 'next/image'; // Image 컴포넌트를 불러옵니다.

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        {/* span 대신 Image 컴포넌트를 사용하여 로고 이미지를 표시합니다. */}
        <Image src={Logo} alt="Logo" width={60} height={60} />
      </div>
    </div>
  );
};

export default Header;
