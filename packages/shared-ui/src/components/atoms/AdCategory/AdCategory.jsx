import React from 'react';
import PropTypes from 'prop-types';
import styles from './AdCategory.module.scss';

const AdCategory = ({ children }) => {
  return <div className={styles.category}>{children}</div>;
};

AdCategory.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdCategory;
