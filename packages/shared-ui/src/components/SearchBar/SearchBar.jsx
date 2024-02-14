import React from 'react';
import styles from './SearchBar.module.scss';
import SearchIcon from '../../../../../workspace_template/exportStaticExample/public/images/svg/icons/SearchIcon.svg';

const SearchBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchContainer}>
        <SearchIcon className={styles.searchIcon}/>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="관심있는 분야 / 회사를 입력하세요."
        />
      </div>
      <button className={styles.searchButton}>검색</button>
    </div>
  );
};

export default SearchBar;
