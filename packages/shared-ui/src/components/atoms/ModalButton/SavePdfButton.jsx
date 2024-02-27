import React from 'react';
import styles from './Button.module.scss';

const SavePdfButton = ({ buttonText = 'pdf로 저장하기', disabled = false, buttonColor = '#4CAF50', textColor = '#FFFFFF', onClick }) => {
  const handleClick = () => {
    // 사용자 정의 onClick 로직 실행
    if (onClick) onClick();

    // 알림 메시지 표시
    alert('pdf가 저장되었습니다!');
  };

  return (
    <button
      className={`${styles.button} ${styles.buttonSavePdf}`}
      style={{ backgroundColor: buttonColor, color: textColor, borderColor: buttonColor }}
      disabled={disabled}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default SavePdfButton;
