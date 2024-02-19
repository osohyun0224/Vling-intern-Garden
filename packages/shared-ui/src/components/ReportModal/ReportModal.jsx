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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportModal;
