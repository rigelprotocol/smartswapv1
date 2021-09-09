import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from '../../styles/toastnotification.css';
import FontAwesome from 'react-fontawesome';
import { useMediaQuery } from '@chakra-ui/react';
import SUCCESSFUL from '../../assets/successful.png';
import { createURLNetwork } from '../../utils/UtilFunc';

const Notification = ({ hash, message }) => {
  const [isMobileDevice] = useMediaQuery('(max-width: 750px)');
  const closeicon = () => (
    <FontAwesome
      name="times"
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
    />
  );
  return (
    <div
      // style={{
      //   marginTop: isMobileDevice ? '50px' : '',
      // }}
      className={styles.container}
    >
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
