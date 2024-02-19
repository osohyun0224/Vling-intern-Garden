import React from 'react';
import styles from './ReportModal.module.scss';

const ReportModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportModal;
