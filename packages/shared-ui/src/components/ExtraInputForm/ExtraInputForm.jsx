import React, { useState, useEffect } from "react";
import styles from "./ExtraInputForm.module.scss";

const ExtraInputForm = () => {
  const [inputValue, setInputValue] = useState(""); // 사용자 입력을 관리할 state
  const [savedText, setSavedText] = useState([]); // 저장된 텍스트를 관리할 state

  // 사용자가 엔터를 누를 때 실행될 함수
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setSavedText([...savedText, inputValue]); // 현재 입력값을 저장된 텍스트 배열에 추가
      setInputValue(""); // 입력 필드 초기화
    }
  };

  // 입력 필드의 값이 변경될 때마다 실행될 함수
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.extraInputForm}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className={styles.inputField}
      />
      <div className={styles.savedTextContainer}>
        {savedText.map((text, index) => (
          <div key={index} className={styles.savedText}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraInputForm;
