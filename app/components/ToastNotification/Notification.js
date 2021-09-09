import React from 'react';
import toast from 'react-hot-toast';
import styles from '../../styles/toastnotification.css';
import SUCCESSFUL from '../../assets/successful.png';
import { createURLNetwork } from '../../utils/UtilFunc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const Notification = ({ hash, message }) => {
  const closeicon = () => (
    <FontAwesomeIcon
      icon={faTimes}
      onClick={() => toast.dismiss()}
      className={styles.cross}
      style={{
        color: '#fff',
        padding: '5px',
        cursor: 'pointer',
        border: 0,
        position: 'absolute',
        top: '5px',
        right: '10px',
        fontWeight: 'lighter',
      }}
      size="lg"
    />
  );
  return (
    <div className={styles.container}>
      {closeicon()}
      <div className={styles.content}>
        <img src={SUCCESSFUL} style={{ height: '35px', width: '35px' }} />
        <div className={styles.texts}>
          <b>{message}</b>
          <a href={createURLNetwork(hash)} target="_blank">
            View on Explorer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notification;
