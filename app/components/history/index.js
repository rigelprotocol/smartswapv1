import { Box, Flex, Text } from '@chakra-ui/react';
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import OrderHistory from './OrderHistory';
import styles from '../../styles/history.css';
import useGetHistory from './useGetHistory';
import MarketHisory from './marketHisory';
import useGetMarketHistory from './useGetMarketHistory';

export function Home(props) {
  const [show, setShow] = useState(false);

  const [showMarketHistory, setShowMarketHistory] = useState(false);

  const { wallet } = props.wallet;

  const { historyData, isLoading } = useGetHistory(wallet);

  const { marketHistoryData, isLoadingMarket } = useGetMarketHistory(wallet)
  //console.log("......: marketHistory", marketHistoryData)
  return (
    <Box className={styles.container}>
      <Flex
        color="rgba(255, 255, 255,0.25);"
        justifyContent="space-between"
        px={4}
        className={styles.header__container}
      >
        <Flex>
          <Text className={!showMarketHistory ? styles.header : styles.market__history__header} onClick={() => {
            setShowMarketHistory(false);
          }}>Order history</Text>
          {show && (
            <Text className={showMarketHistory ? styles.header : styles.market__history__header} onClick={() => {
              setShowMarketHistory(true);
            }}>
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

      <Box overflowY="auto" maxH={460} >
        {show && !showMarketHistory &&
          historyData &&
          historyData.map(data => (
            <OrderHistory
              key={data.blockNumber}
              data={data}
              loading={isLoading}
              dataIsEmpty={historyData.length < 1}
            />
          ))}
      </Box>



      <Box overflowY="auto" maxH={460} >
        {show &&
          showMarketHistory && marketHistoryData && marketHistoryData.map(trxn => (

            <MarketHisory
              key={trxn.time}
              data={trxn}
              loading={isLoadingMarket}
              dataIsEmpty={marketHistoryData.length < 1}

            />
          ))
        }
      </Box>


    </Box>
  );
}

Home.propTypes = {
  wallet: PropTypes.object.isRequired,
};

const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(mapStateToProps)(Home);
