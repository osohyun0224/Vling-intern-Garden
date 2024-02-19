import React from 'react';
import styles from './ChannelHeader.module.scss';

const ChannelHeader = ({ channelImage, channelName, channelCategory }) => {
  return (
    <div className={styles.channelHeader}>
      <img src={channelImage} alt="Channel" className={styles.channelImage} />
      <div className={styles.channelInfo}>
        <div className={styles.channelName}>{channelName}</div>
        <div className={styles.channelCategory}>{channelCategory}</div>
      </div>
    </div>
  );
};

export default ChannelHeader;
