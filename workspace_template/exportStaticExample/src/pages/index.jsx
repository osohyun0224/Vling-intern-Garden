import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';

export default function Main() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>가든의 개인 프로젝트</h1>
      <div className={styles.buttonContainer}>
        <Link href="/example" passHref>
          <button className={styles.mainButton}>메인 프로젝트</button>
        </Link>
        <button className={styles.subButton}>서브 프로젝트</button>
        <Link href="/example" passHref>
          <button className={styles.mainButton}>가든의 기술 보석함</button>
        </Link>
      </div>
    </div>
  );
}
