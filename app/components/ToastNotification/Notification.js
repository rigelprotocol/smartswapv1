import React from 'react';
import toast from 'react-hot-toast';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton, Progress } from '@chakra-ui/react';
import styles from '../../styles/toastnotification.css';
import SUCCESSFUL from '../../assets/successful.png';
import { createURLNetwork } from '../../utils/UtilFunc';
const Notification = ({ hash, message }) => (
  <div className={styles.container}>
    <IconButton
      icon={<CloseIcon />}
      onClick={() => toast.dismiss()}
      style={{
        color: '#fff',
        cursor: 'pointer',
        position: 'absolute',
        top: '2px',
        right: '8px',
        fontSize: 'x-small',
        border: 'none',
      }}
      backgroundColor="transparent"
      _focus={{
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#fff',
      }}
      _hover={{ backgroundColor: 'transparen', color: '#fff' }}
      _active={{ backgroundColor: 'transparen', color: '#fff' }}
    />
    <div className={styles.content}>
      <img src={SUCCESSFUL} style={{ height: '35px', width: '35px' }} />
      <div className={styles.texts}>
        <b>{message}</b>
        <a href={createURLNetwork(hash)} target="_blank">
          <b>View on Explorer</b>
        </a>
      </div>
    </div>
    <Progress size="xs" isIndeterminate />
  </div>
);

export default Notification;
