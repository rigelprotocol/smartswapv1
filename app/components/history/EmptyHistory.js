import { Box, Text } from '@chakra-ui/layout';
import React from 'react'
import styles from '../../styles/history.css';
import EmptyImage from '../../assets/empty.svg';

const Detail = () => {
  return (
    <Box
      boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
      className={styles.empty__container}
    >
      <EmptyImage />
      <Text className={styles.text}>Empty</Text>
    </Box>
  );
};

export default Detail;
