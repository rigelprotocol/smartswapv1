/* eslint-disable no-unused-vars */
import React from 'react';
import styles from '../../styles/spinner.css';

const Spinner = ({ }) => (
  <div className={styles.body}>
    <div className={styles.spinningLoader} />
  </div>
);
Spinner.propTypes = {};

export default Spinner;
