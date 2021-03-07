import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import Detail from './Detail';
import styles from '../../styles/details.css';

const ShowDetails = () => {
  const [detail, setDetail] = useState(false);
  return (
    <Box className={styles.container}>
      <Flex
        color="gray.400"
        justifyContent="space-between"
        px={4}
        className={styles.header__container}
      >
        <Text className={`${styles.header} ${styles.show_effect}`}>
          Details
        </Text>
        <Flex alignItems="center" rounded={100} bg="#">
          {detail ? (
            <MinusIcon
              w={6}
              h={6}
              cursor="pointer"
              onClick={() => {
                setDetail(false);
              }}
              className={styles.icon}
            />
          ) : (
              <AddIcon
                w={6}
                h={6}
                cursor="pointer"
                onClick={() => {
                  setDetail(true);
                }}
                className={styles.icon}
              />
            )}
        </Flex>
      </Flex>
      {detail && <Detail />}
    </Box>
  );
};

export default ShowDetails;
