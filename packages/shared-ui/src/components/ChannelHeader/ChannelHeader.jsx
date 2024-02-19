import React from 'react';
import styles from './ChannelHeader.module.scss';

const ChannelHeader = () => {
  const channelImage = "https://yt3.googleusercontent.com/ytc/AIf8zZRsiaDKzz7z9MLYs3wnZ1o7-L-W9SPG9X6RQ0XM=s176-c-k-c0x00ffffff-no-rj";
  const channelName = "판교 뚜벅쵸";
  const channelCategories = ["Vlog/일상", "지식/정보", "IT/과학기술"];

  return (
    <div className={styles.channelHeader}>
      <img src={channelImage} alt="Channel" className={styles.channelImage} />
      <div className={styles.channelInfo}>
        <div className={styles.channelName}>{channelName}</div>
        <div className={styles.channelCategories}>
          {channelCategories.map((category, index) => (
            <div key={index} className={`${styles.channelCategory} ${index === channelCategories.length - 1 ? styles.lastCategory : ''}`}>
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
