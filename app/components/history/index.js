import { Box, Flex, Text } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';
import OrderHistory from 'components/order/OrderHistory';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import styles from '../../styles/history.css';
// import Empty from './EmptyHistory';
import { getWalletHistory } from './getOrderHistory';

export function Home(props) {
  const [show, setShow] = useState(false);

  const { wallet } = props.wallet;

  getWalletHistory(wallet.address).then(data => {
    console.log('History  Transaction Data is : ', data);
  });

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

      {show && <OrderHistory />}
    </Box>
  );
}

Home.propTypes = {
  wallet: PropTypes.object.isRequired,
};

const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(mapStateToProps)(Home);
