import { Flex, Text } from '@chakra-ui/layout';
import { AddIcon } from '@chakra-ui/icons';
import styles from '../../styles/chart.css';
import React from 'react';

const ShowDetails = ({ setShow }) => {
  return (
    <Flex
      color="gray.400"
      justifyContent="space-between"
      px={5}
      rounded="sm"
      className={styles.header__container}
    >
      <Text className={`${styles.header} ${styles.chartTitle}`}>Chart Graph</Text>
      <Flex alignItems="center" rounded={100} bg="#">
        <AddIcon
          w={6}
          h={6}
          cursor="pointer"
          className={styles.icon}
          onClick={() => setShow(true)}
        />
      </Flex>
    </Flex>
  );
};

export default ShowDetails;
