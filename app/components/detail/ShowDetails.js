import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Detail from './Detail';
import styles from '../../styles/details.css';

const ShowDetails = ({ wallet }) => {
  const [detail, setDetail] = useState(true);
  const { swapOutputToken, swapInputToken } = wallet;
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
              className="add__style"
            />
          )}
        </Flex>
      </Flex>
      {detail && (
        <Detail
          swapOutputToken={swapOutputToken}
          swapInputToken={swapInputToken}
        />
      )}
    </Box>
  );
};
ShowDetails.propTypes = {
  wallet: PropTypes.object,
};
const mapStateToProps = ({ wallet }) => ({ wallet });

export default connect(
  mapStateToProps,
  {},
)(ShowDetails);
