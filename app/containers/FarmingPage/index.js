/**
 *
 * FarmingPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Layout from 'components/layout';
import YieldFarm from 'components/yieldfarm/YieldFarm';
import { BNBRGPliquidityProviderTokensContract, router, erc20Token, SmartFactory, LiquidityPairInstance } from 'utils/SwapConnect';
import { changeFarmingContent } from "./actions"
export function FarmingPage(props) {
  const { wallet, wallet_props } = props.wallet;
  const [RGPTotalTokStake, setRGPTotalTokStake] = useState("")
  const [BUSDTotalTokStake, setBUSDTotalTokStake] = useState("")
  const [BNBTotalTokStake, setBNBTotalTokStake] = useState("")
  const [ETHTotalTokStake, setETHTotalTokStake] = useState("")

  useEffect(() => {
    // Total RGP earn
    const RGPTotalTokeStake = async () => {
      if (wallet.signer !== 'signer') {
        const specialPool = await RGPSpecialPool();
        console.log("ABI special pool", specialPool);
        const value = 1;
        const myStaked = await specialPool.calculateRewards(value,
          { from: wallet.address }
        );
        const userStakedBal = Web3.utils.fromWei(myStaked.toString());
        setRGPTotalTokStake(userStakedBal)
        console.log("token earned: ", userStakedBal)
        // userStakedBal should be toFixed(4)
        props.changeTokenEarned({ deposit: "RGP", tokenEarned: userStakedBal })
      }
    };
    const BNBTotalTokeStake = async () => {
      if (wallet.signer !== 'signer') {
        let userStakedBal = "123"
        console.log("setBNBTotalTokStake(userStakedBal)", userStakedBal)
        setBNBTotalTokStake(userStakedBal)
        // userStakedBal should be toFixed(4)
      }
    };
    const BUSDTotalTokeStake = async () => {
      if (wallet.signer !== 'signer') {
        let userStakedBal = "123"
        console.log("setBUSDTotalTokStake(userStakedBal)", userStakedBal)
        setBUSDTotalTokStake(userStakedBal)
        // userStakedBal should be toFixed(4)
      }
    };
    const ETHTotalTokeStake = async () => {
      if (wallet.signer !== 'signer') {
        let userStakedBal = "123"
        console.log("setETHTotalTokStake(userStakedBal)", userStakedBal)
        setETHTotalTokStake(userStakedBal)
        // userStakedBal should be toFixed(4)
      }
    };
    const LPmultiplyier = async () => {
      const liquidityProviderDetails = await BNBRGPliquidityProviderTokensContract();
      const getMultiplier = await liquidityProviderDetails.BONUS_MULTIPLIER();
      const getTotalAlloc = await liquidityProviderDetails.totalAllocPoint();
      const getrigelPerBlock = await liquidityProviderDetails.rigelPerBlock();
      const getStartBlock = await liquidityProviderDetails.startBlock();
      console.log("multiplier", getMultiplier.toString(),
        "total Allocation", getTotalAlloc.toString(),
        "rigel token perBlock", getrigelPerBlock.toString(),
        "start Block", getStartBlock.toString(), "..................."
      )
      let data = {
        getTotalAlloc: getTotalAlloc.toString(),
        multipler: getMultiplier.toString(),
        getrigelPerBlock: getrigelPerBlock.toString(),
        getStartBlock: getStartBlock.toString()
      }
      getAllLiquidities()

    }


    LPmultiplyier();
    RGPTotalTokeStake()

  }, [wallet]);

  const getPriceForToken = async () => {
    const path = [toSelectedToken, fromSelectedToken]
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const fromPath = ethers.utils.getAddress(path[0].address);
      const toPath = ethers.utils.getAddress(path[1].address);
      const valueToCheck = 1;
      const checkPriceOfOne = Web3.utils.toWei(valueToCheck.toString());
      const getValue = await rout.getAmountsOut(
        checkPriceOfOne,
        [fromPath, toPath]
      )
      const getToken2Value = await rout.getAmountsOut(
        checkPriceOfOne,
        [toPath, fromPath]
      )
      console.log("currrent price  of ", fromPath, "to ", toPath, "is:", getValue.toString(), getToken2Value.toString())
      // const value1 = Web3.utils.fromWei(getValue.toString().split(",")[1])
      // const value2 = Web3.utils.fromWei(getToken2Value.toString().split(",")[1])
      // setTokenFromValue(value1)
      // setTokenToValue(value2)
    }
  }

  // const getAllLiquidities = async () => {
  //   // setLiquidityLoading(true);
  //   try {
  //     let pairs = []
  //     const smartFactory = await SmartFactory();
  //     const allLiquidityPairs = await smartFactory.allPairsLength();
  //     for (let i = 0; i < allLiquidityPairs.toString(); i++) {
  //       const pairAddress = await smartFactory.allPairs(i);
  //       let liquidity = await LiquidityPairInstance(pairAddress);
  //       const balance = await liquidity.balanceOf(wallet.address);
  //       const totalSupply = await liquidity.totalSupply();
  //       const reserves = await liquidity.getReserves()
  //       console.log("get the reserve 0: ", reserves[0].toString());
  //       console.log("get the reserve 1: ", reserves[1].toString());
  //       console.log("get the reserve 2: ", reserves[2].toString());
  //       const pooledToken0 = ((balance / totalSupply) * reserves[0]) / 1e+18;
  //       const pooledToken1 = ((balance / totalSupply) * reserves[1]) / 1e+18;
  //       const token0 = await liquidity.token0();
  //       const token1 = await liquidity.token1();
  //       const erc20Token0 = await erc20Token(token0)
  //       const erc20Token1 = await erc20Token(token1)
  //       const symbol0 = await erc20Token0.symbol()
  //       const symbol1 = await erc20Token1.symbol()
  //       console.log('token0: ', token0, symbol0)
  //       console.log('token1: ', token1, symbol1)
  //       let liquidityObject = {
  //         pairAddress: Web3.utils.toChecksumAddress(pairAddress),
  //         poolToken: Web3.utils.fromWei(balance.toString(), 'ether'),
  //         totalSupply: totalSupply.toString(),
  //         poolShare: balance.toString() / totalSupply,
  //         path: [
  //           { fromPath: token0, token: symbol0, amount: pooledToken0 },
  //           { toPath: token1, token: symbol1, amount: pooledToken1 }
  //         ],
  //         pooledToken0,
  //         pooledToken1
  //       }
  //       props.changeFarmingContent({ reserves0: reserves[0].toString(), reserves1: reserves[1].toString(), symbol0, symbol1 })
  //       if (liquidityObject.poolToken != 0) {
  //         pairs.push(liquidityObject);
  //       }
  //     }
  //     // setLiquidities([...pairs])
  //     console.log(pairs)
  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     // setLiquidityLoading(false)
  //   }

  // }

  useEffect(() => {
    const LPmultiplyier = async () => {
      const liquidityProviderDetails = await BNBRGPliquidityProviderTokensContract();
      const getMultiplier = await liquidityProviderDetails.BONUS_MULTIPLIER();
      const getTotalAlloc = await liquidityProviderDetails.totalAllocPoint();
      const getrigelPerBlock = await liquidityProviderDetails.rigelPerBlock();
      const getStartBlock = await liquidityProviderDetails.startBlock();
      console.log("multiplier", getMultiplier.toString(),
        "total Allocation", getTotalAlloc.toString(),
        "rigel token perBlock", getrigelPerBlock.toString(),
        "start Block", getStartBlock.toString(), "..................."
      )
      let data = {
        getTotalAlloc: getTotalAlloc.toString(),
        multipler: getMultiplier.toString(),
        getrigelPerBlock: getrigelPerBlock.toString(),
        getStartBlock: getStartBlock.toString()
      }
      getAllLiquidities()

    }
    LPmultiplyier();
  }, [wallet]);
  console.log(props.farming.data);


  const getAllLiquidities = async () => {
    // setLiquidityLoading(true);
    try {
      let pairs = []
      const smartFactory = await SmartFactory();
      const allLiquidityPairs = await smartFactory.allPairsLength();
      for (let i = 0; i < allLiquidityPairs.toString(); i++) {
        const pairAddress = await smartFactory.allPairs(i);
        let liquidity = await LiquidityPairInstance(pairAddress);
        const balance = await liquidity.balanceOf(wallet.address);
        const totalSupply = await liquidity.totalSupply();
        const reserves = await liquidity.getReserves()
        console.log("get the reserve 0: ", reserves[0].toString());
        console.log("get the reserve 1: ", reserves[1].toString());
        console.log("get the reserve 2: ", reserves[2].toString());
        const pooledToken0 = ((balance / totalSupply) * reserves[0]) / 1e+18;
        const pooledToken1 = ((balance / totalSupply) * reserves[1]) / 1e+18;
        const token0 = await liquidity.token0();
        const token1 = await liquidity.token1();
        const erc20Token0 = await erc20Token(token0)
        const erc20Token1 = await erc20Token(token1)
        const symbol0 = await erc20Token0.symbol()
        const symbol1 = await erc20Token1.symbol()
        console.log('token0: ', token0, symbol0)
        console.log('token1: ', token1, symbol1)
        let liquidityObject = {
          pairAddress: Web3.utils.toChecksumAddress(pairAddress),
          poolToken: Web3.utils.fromWei(balance.toString(), 'ether'),
          totalSupply: totalSupply.toString(),
          poolShare: balance.toString() / totalSupply,
          path: [
            { fromPath: token0, token: symbol0, amount: pooledToken0 },
            { toPath: token1, token: symbol1, amount: pooledToken1 }
          ],
          pooledToken0,
          pooledToken1
        }
        props.changeFarmingContent({ reserves0: reserves[0].toString(), reserves1: reserves[1].toString(), symbol0, symbol1 })
        if (liquidityObject.poolToken != 0) {
          pairs.push(liquidityObject);
        }
      }
      // setLiquidities([...pairs])
      console.log(pairs)
    } catch (error) {
      console.error(error)
    } finally {
      // setLiquidityLoading(false)
    }

  }

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
            w={['100%', '100%', '95%']}
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
  farmingPage: PropTypes.object,
};

const mapStateToProps = ({ farming, wallet }) => {
  return {
    farming,
    wallet
  };
};

function mapDispatchToProps(dispatch) {
  return {
    sendAction: (res) => dispatch({ type: SEND_ACTION, payload: res }),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  { changeFarmingContent }
)(FarmingPage);
