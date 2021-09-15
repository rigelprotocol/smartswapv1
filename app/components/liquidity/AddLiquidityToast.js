import React from 'react';
import toast from 'react-hot-toast';
import styles from '../../styles/toastComponent.css';
import SUCCESSFUL from '../../assets/successful.png';
import { createURLNetwork } from '../../utils/UtilFunc';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
const AddLiquidityToast = ({ hash, message }) => {
    return (
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
                        View on Explorer
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AddLiquidityToast;