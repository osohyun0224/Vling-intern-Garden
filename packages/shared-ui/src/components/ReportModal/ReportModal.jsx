import React, { useEffect } from 'react';
import styles from './ReportModal.module.scss';

const ReportModal = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>광고 제안서</div>
          <img src={'/images/png/Close.png'} alt="Close" className={styles.closeButton} onClick={onClose} />
        </div>
        <hr className={styles.divider} />
      </div>
    </div>
  );
};

export default ReportModal;
