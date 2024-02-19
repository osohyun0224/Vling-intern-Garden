import React, { useEffect } from 'react';
import styles from './ReportModal.module.scss';

const ReportModal = ({ show, onClose }) => {
  useEffect(() => {
    // 모달이 보여질 때 body의 overflow를 hidden으로 설정
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    // 클린업 함수에서는 모달이 닫힐 때 body의 overflow를 다시 원래대로 설정
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [show]); // 의존성 배열에 show를 추가하여 모달 상태가 변경될 때마다 효과가 실행되도록 함

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportModal;
