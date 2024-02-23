import styles from './ContactInput.module.scss';
import React from 'react';

const ContactInput = ({ contact, onContactChange }) => {
    return (
      <div className={styles.contactInput}>
        <input
          type="text"
          placeholder="이메일 혹은 전화번호를 입력하세요"
          value={contact}
          onChange={onContactChange}
        />
      </div>
    );
  };

export default ContactInput;