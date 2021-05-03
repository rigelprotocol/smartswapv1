import React, { useState } from 'react';
import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import ActiveOrder from 'components/order/ActiveOrder';
import ShowDetails from 'components/detail/ShowDetails';
import ChartGraph from 'components/charts/ShowChart';
import SendToken from 'components/sendToken';
import History from 'components/history';
import Layout from 'components/layout';
import styles from '../../styles/Home.css';

export const TABS = {
  MANUAL: 'MANUAL',
  AUTO_TIME: 'AUTO_TIME',
  ACTIVE: 'ACTIVE',
  PRICE: 'PRICE',
};
export default function HomePage() {
  const [tab, setTab] = useState(TABS.MANUAL);
  return (
    <Layout title="Home Page">
      <>
        <Flex mb="100px" mx={2} flexWrap="wrap">
          <Box w={['100%', '100%', '30%', '29.5%']} mb={4} ml="2.8" mr="-0.7">
            <Box bg="#120136" rounded="2xl">
              {tab === TABS.MANUAL ? <ShowDetails /> : <ActiveOrder active />}
            </Box>
          </Box>

          <Box mx={5} w={['100%', '100%', '30%', '29.5%']} rounded="lg" mb={4}>
            <Box
              style={{
                boxShadow: '0px 0px 1px inset #343337, 0px 0px 1px gray',
              }}
              bg="#120136"
              rounded="2xl"
            >
              <Flex color="gray.500" justifyContent="space-between" px={4}>
                <Text
                  cursor="pointer"
                  fontSize="md"
                  className={
                    tab === TABS.MANUAL ? styles.active : styles.inactive
                  }
                  onClick={() => {
                    setTab(TABS.MANUAL);
                  }}
                >
                  Manual
                </Text>
                <Tooltip label="Coming Soon" bg="#120136" aria-label="A tooltip">
                  <Text
                    cursor="not-allowed"
                    className={
                      tab === TABS.PRICE ? styles.active : styles.inactive
                    }
                  // onClick={() => {
                  //   setTab(TABS.PRICE);
                  // }}
                  >
                    Set price
                </Text>
                </Tooltip>
                <Tooltip label="Coming Soon" bg="#120136" aria-label="A tooltip">
                  <Text
                    cursor="not-allowed"
                    className={
                      tab === TABS.AUTO_TIME ? styles.active : styles.inactive
                    }
                  // onClick={() => {
                  //   setTab(TABS.AUTO_TIME);
                  // }}
                  >
                    Auto Time
                </Text>
                </Tooltip>

              </Flex>
            </Box>
            <ChartGraph />
            <SendToken />
          </Box>
          <Box mx={5} w={['100%', '100%', '30%', '29.5%']} mb={4}>
            <Box
              bg="#120136"
              rounded="2xl"
              style={{
                boxShadow: '0px 0px 1px inset #343337, 0px 0px 1px gray',
              }}
            >
              <History />
            </Box>
          </Box>
        </Flex>
      </>
    </Layout>
  );
}
