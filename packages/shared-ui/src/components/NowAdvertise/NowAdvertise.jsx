import React, { useState } from 'react';
import styles from './NowAdvertise.module.scss';
import ImageContainer from '@bzznbyd/atom-advertise-image';
import Category from '@bzznbyd/atom-ad-category';
import Text from '@bzznbyd/atoms-ad-text';
import AuthorImage from '@bzznbyd/atom-ad-profile-image';

const NowAdvertise = () => {
  const [liked, setLiked] = useState(false);
  const toggleLike = () => setLiked(!liked);
  
  const NowAdList = [
    { 
        id: 1,
        adimage: "/images/advertise/cliemax_noni.png",
        category: ["뷰티", "화장품"],
        title: "[신제품] 보습영양 노니앰플 제품 리뷰 광고",
        info_date: "2023-02-25",
        info_money: 1000000,
        author_image: "/images/advertise/cliemax_noni.png",
        author_name: "셀리맥스"
    },
    { 
        id: 2,
        adimage: "/images/advertise/bitbucket_logo.jpeg",
        category: ["IT/기술", "개발"],
        title: "사내 신규 프로그램 Bitbucket 리뷰 광고",
        info_date: "2023-02-24",
        info_money: 2000000,
        author_image: "/images/advertise/bitbucket_logo.jpeg",
        author_name: "아틀라시안"
    },
    { 
        id: 3,
        adimage: "/images/advertise/hansung_keyboard.jpeg",
        category: ["전자기기", "키보드"],
        title: "한성 무접점 키보드 제품 협찬 광고",
        info_date: "2023-02-26",
        info_money: 300000,
        author_image: "/images/advertise/hansung_keyboard.jpeg",
        author_name: "한성컴퓨터"
    },
    { 
        id: 4,
        adimage: "/images/advertise/yuje_bag.png",
        category: ["패션", "가방"],
        title: "[신제품] 유제 블랙 숄더백 제품 리뷰 광고",
        info_date: "2023-02-29",
        info_money: 6000000,
        author_image: "/images/advertise/yuje_bag.png",
        author_name: "유제(Yuje)"
    },
    ]

  return (
    <div className={styles.container}>
      {NowAdList.map((ad, index) => (
        <div key={ad.id} className={styles.adItem} style={{ marginRight: index < NowAdList.length - 1 ? '20px' : '0' }}>
          <ImageContainer src={ad.adimage} alt="Ad" liked={liked} toggleLike={toggleLike} />
          <Category>{ad.category.join(', ')}</Category>
          <Text type="title">{ad.title}</Text>
          <Text type="info">{ad.info_date}</Text>
          <Text type="info">{ad.info_money.toLocaleString()}원</Text>
          <div className={styles.author}>
            <AuthorImage src={ad.author_image} alt="Author" />
            <Text type="authorName">{ad.author_name}</Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NowAdvertise;