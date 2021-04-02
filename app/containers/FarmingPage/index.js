/**
 *
 * FarmingPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Layout from 'components/layout';
import YieldFarm from 'components/yieldfarm/YieldFarm';
export function FarmingPage(props) {
  const { wallet, wallet_props } = props.wallet;

  return (
    <div>
      <Layout title="Farming Page">
        <Flex
          mx={5}
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          rounded="lg"
          mb={4}
        >
          <Box
            bg="#120136"
            minHeight="89vh"
            w={['100%', '100%', '95%', '29.5%']}
            rounded="lg"
          >
            <Box mx="auto" w={['100%', '100%', '80%']} pb="70px">
              <Flex
                color="gray.400"
                alignItems="center"
                justifyContent="space-between"
                px={4}
                pt={4}
                w={['100%', '100%', '90%']}
                align="left"
                display={['none', 'flex']}
              >
                <Text>Deposit</Text>
                <Text>Earn</Text>
                <Text>APY</Text>
                <Text>Total Liquidity</Text>
                <Text />
              </Flex>
              {props.farming.contents.map(content => (
                <YieldFarm content={content} key={content.id} wallet={wallet} />
              ))}
            </Box>
          </Box>
        </Flex>
      </Layout>
    </div>
  );
}

FarmingPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  farmingPage: PropTypes.object.isRequired,
};

const mapStateToProps = ({ farming, wallet }) => {
  return {
    farming,
    wallet
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FarmingPage);
