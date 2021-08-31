import React from 'react';
import styles from '../../styles/intro.css';

const Step = ({
  title,
  description,
  desc2,
  desc1,
  desc3,
  desc4,
  desc5,
  desc6,
  desc7,
  children,
  mobile,
}) => {
  return (
    <div className="step">
      <p style={{ fontWeight: 'bold' }} className="step__title">
        {title}
      </p>
      <p
        style={{ fontWeight: 'light', fontSize: 'small', lineHeight: '1.2rem' }}
        className="step__description"
      >
        {!desc2 ? (
          description
        ) : (
          <p
            style={{
              fontWeight: 'light',
              fontSize: 'small',
              lineHeight: '1.2rem',
            }}
          >
            Click here to view the <b>name</b>, <b>circulation supply</b> and{' '}
            <b>description</b> about the tokens being swapped
          </p>
        )}
      </p>
      <div className={styles.cell}>
        {mobile ? (
          <ul className={styles.dots}>
            <li className={styles.dotli}>
              <a className={desc1 && styles.active} href="#">
                Home
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc2 && styles.active} href="#">
                About
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc3 && styles.active} href="#">
                Home
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc4 && styles.active} href="#">
                About
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc5 && styles.active} href="#">
                Home
              </a>
            </li>
          </ul>
        ) : (
          <ul className={styles.dots}>
            <li className={styles.dotli}>
              <a className={desc1 && styles.active} href="#">
                Home
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc2 && styles.active} href="#">
                About
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc3 && styles.active} href="#">
                Products
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc4 && styles.active} href="#">
                Home
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc5 && styles.active} href="#">
                About
              </a>
            </li>
            <li className={styles.dotli}>
              <a className={desc6 && styles.active} href="#">
                Products
              </a>
            </li>
          </ul>
        )}
      </div>

      <div className={styles.button__container}>{children}</div>
    </div>
  );
};

export default Step;
