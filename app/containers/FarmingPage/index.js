/**
 *
 * FarmingPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Layout from 'components/layout';
import YieldFarm from 'components/yieldfarm/YieldFarm';
import { SMART_SWAP } from "../../utils/constants";
import { rigelToken, MasterChefContract } from '../../utils/SwapConnect';

export function FarmingPage({ farming }) {

  // user to deposit to yield

  const useDeposit = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await MasterChefContract();
      await masterChef.deposit("uint", "uint", {
        from: wallet.address,
      });
    }
  };

  //withdrawal of funds
  const useWithdrawal = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await MasterChefContract();
      await masterChef.withdraw("uint", "uint", {
        from: wallet.address,
      });
    }
  };

  //Emmergency withdrawal of funds
  const useEmmergency = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await MasterChefContract();
      await masterChef.emergencyWithdraw("uint", {
        from: wallet.address,
      });
    }
  };

  //rgp approve masterchef
  const rgpApproveMasterChef = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.MasterChef, walletBal, {
        from: wallet.address,
      });
    }
  };

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
              {farming.contents.map(content => (
                <YieldFarm
                  content={content}
                  key={content.id} />
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

const mapStateToProps = ({ farming }) => {
  return {
    farming,
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
