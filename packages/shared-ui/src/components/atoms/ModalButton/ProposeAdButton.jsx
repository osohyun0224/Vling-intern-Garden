import React from 'react';
import styles from './Button.module.scss';

const ProposeAdButton = ({ buttonText = '광고 제안하기', disabled = false, buttonColor = '#FF0045', textColor = '#FFFFFF' }) => {
  return (
    <button
      className={`${styles.button} ${styles.buttonProposeAd}`}
      style={{ backgroundColor: buttonColor, color: textColor, borderColor: buttonColor }}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default ProposeAdButton;
