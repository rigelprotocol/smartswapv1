import { Box, Flex, Text } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import styles from '../../styles/history.css';
import Empty from './EmptyHistory';

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <Box className={styles.container}>
      <Flex
        color="rgba(255, 255, 255,0.25);"
        justifyContent="space-between"
        px={4}
        className={styles.header__container}
      >
        <Flex>
          <Text className={styles.header}>Order history</Text>
          {show && (
            <Text className={styles.market__history__header}>
              Market history
            </Text>
          )}
        </Flex>
        <Flex alignItems="center" rounded={100} bg="#">
          {show ? (
            <MinusIcon
              w={6}
              h={6}
              color="gray.400"
              cursor="pointer"
              onClick={() => {
                setShow(false);
              }}
              className={styles.icon}
            />
          ) : (
              <AddIcon
                w={6}
                h={6}
                color="gray.400"
                cursor="pointer"
                onClick={() => {
                  setShow(true);
                }}
                className={styles.icon}
              />
            )}
        </Flex>
      </Flex>
      {show && <Empty />}
    </Box>
  );
}
