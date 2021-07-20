/**
 *
 * FarmingPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { Box, Flex, Text, } from '@chakra-ui/layout';
import Layout from 'components/layout';
import YieldFarm from 'components/yieldfarm/YieldFarm';
import InfoModal from 'components/modal/InfoModal'
import FarmingPageModal from 'components/yieldfarm/FarmingPageModal';
import RGPFarmInfo from 'components/yieldfarm/RGPFarmInfo';
import { notify } from 'containers/NoticeProvider/actions';

import {
  masterChefContract,
  rigelToken,
  router,
  erc20Token,
  SmartFactory,
  LiquidityPairInstance,
  RGPSpecialPool,
  smartSwapLPTokenPoolOne,
  smartSwapLPTokenPoolTwo,
  smartSwapLPTokenPoolThree,
} from 'utils/SwapConnect';
import { tokenList, SMART_SWAP } from '../../utils/constants';
import { useDisclosure as useModalDisclosure, useToast } from "@chakra-ui/react";
import { changeRGPValue } from '../WalletProvider/actions';
import {
  changeFarmingContent,
  changeFarmingContentToken,
  changeRGPFarmingFee,
  updateTotalLiquidity,
  updateTokenStaked,
  updateFarmBalances,
  farmDataLoading
} from './actions';
// import masterChefContract from "../../utils/abis/masterChef.json"
export function FarmingPage(props) {
  const { wallet, wallet_props } = props.wallet;

  const [RGPTotalTokStake, setRGPTotalTokStake] = useState('');
  const [BUSDTotalTokStake, setBUSDTotalTokStake] = useState('');
  const [BNBTotalTokStake, setBNBTotalTokStake] = useState('');
  const [ETHTotalTokStake, setETHTotalTokStake] = useState('');
  const [farmingData, setFarmingData] = useState([]);
  const [farmingModal, setFarmingModal] = useState(false);
  const [farmingFee, setFarmingFee] = useState(10);
  const [initialLoad, setInitialLoad] = useState(true)
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useModalDisclosure()
  const toast = useToast()
  const id = "totalLiquidityToast"

  useEffect(() => {
    const harvestSubscription = async () => {
      const rigelEarned = await rigelToken();
      console.log(rigelEarned)
      if (wallet.address != "0x") {

        const filter = rigelEarned.filters.Transfer(SMART_SWAP.masterChef, wallet.address, null);
        rigelEarned.on(filter, (sender, receiver, amount) => {
          toast({
            title: "RGP Harvest Successful",
            description: `${ethers.utils.formatEther(amount)} RGP has been transfered to your address`,
            status: "success",
            position: "top-right",
            duration: 9000,
            isClosable: true,

          })
        })
      }
      return () => {
        rigelEarned.off()
      }
    }
    return harvestSubscription()

  }, [wallet.address])


  useEffect(() => {
    refreshTokenStaked();
  }, [wallet]);

  useEffect(() => {
    const RGPfarmingFee = async () => {
      if (wallet.signer !== 'signer') {
        const masterChef = await masterChefContract();
        const minFarmingFee = await masterChef.farmingFee();
        const fee = Web3.utils.fromWei(minFarmingFee.toString());
        setFarmingFee(fee);
        props.changeRGPFarmingFee({
          fee,
        });
      }
    };
    RGPfarmingFee();
    checkIfInitialLoading()

  }, [wallet]);
  const refreshTokenStaked = () => {
    getYieldFarmingData();
    getFarmTokenBalance();
    getTokenStaked();
    props.changeRGPValue(wallet)
  }
  const checkIfInitialLoading = () => {
    initialLoad ? setFarmingModal(true) : setFarmingModal(false)
  }

  const getYieldFarmingData = async () => {
    try {
      props.farmDataLoading(true)
      const masterChef = await masterChefContract();
      const poolLength = await masterChef.poolLength();
      let poolsData = [];
      const rgpAddress = await masterChef.poolInfo(0);
      const rgpContract = await LiquidityPairInstance(rgpAddress[0]);
      // const rgpSpecialPool = await RGPSpecialPool();
      const totalStaking = ethers.BigNumber.from('200000000000000000000000');
      const rgpSpecial = {
        poolAddress: '',
        poolSymbol: 'RGP',
        specialPool: true,
        token0: {
          address: rgpAddress,
          symbol: 'RGP',
          amount: 1000,
        },
      };
      poolsData = [...poolsData, rgpSpecial];
      let RGPprice;
      let BNBprice;
      for (let i = 1; i < poolLength; i++) {
        const poolInfo = await masterChef.poolInfo(i);
        const poolContract = await LiquidityPairInstance(poolInfo[0]);
        const poolReserves = await poolContract.getReserves();
        const token0Address = await poolContract.token0();
        const token1Address = await poolContract.token1();
        const erc20Token0 = await erc20Token(token0Address);
        const erc20Token1 = await erc20Token(token1Address);
        const token0Symbol = await erc20Token0.symbol();
        const token1Symbol = await erc20Token1.symbol();
        const pools = {
          poolInfo,
          poolAddress: poolInfo[0],
          specialPool: false,
          poolSymbol: `${token0Symbol}-${token1Symbol}`,
          token0: {
            address: token0Address,
            symbol: token0Symbol,
            amount: poolReserves[0],
          },
          token1: {
            address: token1Address,
            symbol: token1Symbol,
            amount: poolReserves[1],
          },
        };
        if (i === 1) {
          const RGPpriceDecimals = poolReserves[0]
            .mul(1000)
            .div(poolReserves[1]);
          RGPprice = ethers.utils.formatUnits(RGPpriceDecimals, 3);
        }
        if (i === 3) {
          if (token0Symbol === 'BUSD') {
            BNBprice = ethers.utils.formatUnits(
              poolReserves[0].mul(1000).div(poolReserves[1]),
              3,
            );
          } else {
            BNBprice = ethers.utils.formatUnits(
              poolReserves[1].mul(1000).div(poolReserves[0]),
              3,
            );
          }
        }
        poolsData = [...poolsData, pools];
      }
      console.log(poolsData, BNBprice);
      setFarmingData(poolsData);
      const RGPLiquidity = ethers.utils
        .formatUnits(totalStaking.mul(1000 * RGPprice), 21)
        .toString();
      const BUSD_RGPLiquidity = ethers.utils
        .formatEther(poolsData[1].token0.amount.mul(2), { commify: true })
        .toString();
      const RGP_BNBLiquidity = ethers.utils
        .formatUnits(poolsData[2].token0.amount.mul(BNBprice * 1000 * 2), 21)
        .toString();
      let BUSD_BNBLiquidity;
      if (poolsData[3].token0.symbol === 'BUSD') {
        BUSD_BNBLiquidity = ethers.utils
          .formatEther(poolsData[3].token0.amount.mul(2), { commify: true })
          .toString();
      } else {
        BUSD_BNBLiquidity = ethers.utils
          .formatEther(poolsData[3].token1.amount.mul(2), { commify: true })
          .toString();
      }

      props.updateTotalLiquidity([
        {
          liquidity: RGPLiquidity,
          apy: calculateApy(RGPprice, RGPLiquidity, 1333.33),
        },
        {
          liquidity: RGP_BNBLiquidity,
          apy: calculateApy(RGPprice, RGP_BNBLiquidity, 3333.33),
        },
        {
          liquidity: BUSD_RGPLiquidity,
          apy: calculateApy(RGPprice, BUSD_RGPLiquidity, 2000),
        },
        {
          liquidity: BUSD_BNBLiquidity,
          apy: calculateApy(RGPprice, BUSD_BNBLiquidity, 1333.33),
        },
      ]);
    } catch (error) {
      console.log(error);
      if (!toast.isActive(id)) {
        toast({
          id,
          title: "Unable to load data",
          description: "Ensure your wallet is on BSC network and reload page",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        })
      }
    } finally {
      props.farmDataLoading(false)
    }
  };

  const getTokenStaked = async () => {
    try {
      if (wallet.address != '0x') {
        // const specialPool = await RGPSpecialPool();
        const masterChef = await masterChefContract();
        const poolOneEarned = await masterChef.pendingRigel(1, wallet.address);
        const poolTwoEarned = await masterChef.pendingRigel(2, wallet.address);
        const poolThreeEarned = await masterChef.pendingRigel(
          3,
          wallet.address,
        );
        const poolOneStaked = await masterChef.userInfo(1, wallet.address);
        const poolTwoStaked = await masterChef.userInfo(2, wallet.address);
        const poolThreeStaked = await masterChef.userInfo(3, wallet.address);
        // console.log(formatBigNumber(poolTwoEarned),formatBigNumber(poolOneEarned),formatBigNumber(poolThreeEarned) )
        props.updateTokenStaked([
          { staked: 0.0, earned: 0.0 },
          {
            staked: formatBigNumber(poolTwoStaked.amount),
            earned: formatBigNumber(poolTwoEarned),
          },
          {
            staked: formatBigNumber(poolOneStaked.amount),
            earned: formatBigNumber(poolOneEarned),
          },
          {
            staked: formatBigNumber(poolThreeStaked.amount),
            earned: formatBigNumber(poolThreeEarned),
          },
        ]);
        setInitialLoad(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatBigNumber = bigNumber => {

    const number = Number.parseFloat(ethers.utils.formatEther(bigNumber));
    if (number % 1 === 0) {
      return number.toFixed(3);
    }
    const splitNumber = number.toString().split('.');
    const [whole, decimal] = splitNumber;
    const deci = decimal
      .split('')
      .slice(0, 3)
      .join('');
    const output = [whole, deci];
    return output.join('.');
  };

  const calculateApy = (rgpPrice, totalLiquidity, inflation) =>
    (rgpPrice * inflation * 365 * 100) / totalLiquidity;

  const getFarmTokenBalance = async () => {
    if (wallet.address != '0x') {
      try {
        const [
          RGPToken,
          poolOne,
          poolTwo,
          poolThree,

        ] = await Promise.all([
          rigelToken(),
          smartSwapLPTokenPoolOne(),
          smartSwapLPTokenPoolTwo(),
          smartSwapLPTokenPoolThree(),
        ]);

        const [
          RGPbalance,
          poolOneBalance,
          poolTwoBalance,
          poolThreeBalance] = await Promise.all([
            RGPToken.balanceOf(wallet.address),
            poolOne.balanceOf(wallet.address),
            poolTwo.balanceOf(wallet.address),
            poolThree.balanceOf(wallet.address)])

        props.updateFarmBalances([
          formatBigNumber(RGPbalance),
          formatBigNumber(poolTwoBalance),
          formatBigNumber(poolOneBalance),
          formatBigNumber(poolThreeBalance),
        ]);
      } catch (error) {
        console.error(error);
      }
    }
  };


  const getRGPPrice = async () => {
    const rgpBalance = await getAddressTokenBalance(
      wallet.address,
      tokenList[1].address,
      wallet.signer,
    );
    return rgpBalance;
  };
  // for the first pool
  const specialPoolUserData = async () => {
    console.log('opening usewithdrawal');
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      const pool = await specialPool.userData(0);
      return pool.tokenQuantity.toString();
    }
  };
  const specialPoolClaimReward = async () => {
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      const poolID = 0;
      const pool = specialPool.calculateRewards(0);
      return 0;
    }
  };

  // changeTokenUserInfo
  const changeTokenUserInfo = async val => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = val;

      return await lpTokens.userInfo(pid, wallet.address);
    }
  };

  // Total RGP earn
  const getPriceForRGPToken = async () => {
    if (wallet.signer !== 'signer') {
      const rout = await router();
      const valueToCheck = 1;
      const checkPriceOfOne = Web3.utils.toWei(valueToCheck.toString());
      const getValue = await rout.getAmountsOut(checkPriceOfOne, [
        tokenList[1].address,
        tokenList[2].address,
      ]);
      const value1 = getValue.toString().split(',')[1];
      console.log('price................: ', value1);
      return value1;
    }
  };

  const BNBBUSDUserBalance = async () => {
    if (wallet.signer !== 'signer') {
      const poolThree = await smartSwapLPTokenPoolThree();
      const walletBal = await poolThree.balanceOf(wallet.address);
      return Number(Web3.utils.fromWei(walletBal.toString(), 'ether')).toFixed(
        4,
      );
    }
  };

  const BNBRGPUserBalance = async () => {
    if (wallet.signer !== 'signer') {
      const slpOne = await smartSwapLPTokenPoolOne();
      const walletBal = await slpOne.balanceOf(wallet.address);
      return Number(Web3.utils.fromWei(walletBal.toString(), 'ether')).toFixed(
        4,
      );
    }
  };

  const RGPBUSDUserBalance = async () => {
    if (wallet.signer !== 'signer') {
      const poolTwo = await smartSwapLPTokenPoolTwo();
      const walletBal = await poolTwo.balanceOf(wallet.address);
      return Number(Web3.utils.fromWei(walletBal.toString(), 'ether')).toFixed(
        4,
      );
    }
  };

  const poolInForAlloc = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await masterChefContract();
      const rigelAllocPoint = await masterChef.poolInfo(0);
      return rigelAllocPoint.allocPoint.toString();
    }
  };

  const poolInForAllocPoolTwo = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await masterChefContract();
      const rigelAllocPoint = await masterChef.poolInfo(1);
      return rigelAllocPoint.allocPoint.toString();
    }
  };

  const poolInForAllocPoolThree = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await masterChefContract();
      const rigelAllocPoint = await masterChef.poolInfo(2);
      return rigelAllocPoint.allocPoint;
    }
  };

  const poolInForAllocPoolFour = async () => {
    if (wallet.signer !== 'signer') {
      const masterChef = await masterChefContract();
      const rigelAllocPoint = await masterChef.poolInfo(3);
      return rigelAllocPoint.allocPoint;
    }
  };

  const changeRGPInflationPerDay = async () => {
    if (wallet.signer !== 'signer') {
      return 200000 / 30;
    }
  };

  const calInflationForPoolRGP = async () => {
    if (wallet.signer !== 'signer') {
      const inflation = await changeRGPInflationPerDay();
      const pool = await poolInForAlloc();
      const check = inflation * (pool / 100);
      return check;
    }
  };

  const calInflationForPoolRGPBUSD = async () => {
    if (wallet.signer !== 'signer') {
      const inflation = await changeRGPInflationPerDay();
      const pool = await poolInForAllocPoolTwo();
      const check = inflation * (pool / 100);
      return check;
    }
  };

  const calInflationForPoolRGPBNB = async () => {
    if (wallet.signer !== 'signer') {
      const inflation = await changeRGPInflationPerDay();
      const pool = await poolInForAllocPoolThree();
      const check = inflation * (pool / 100);
      return check;
    }
  };

  const calInflationForPoolBNB = async () => {
    if (wallet.signer !== 'signer') {
      const inflation = await changeRGPInflationPerDay();
      const pool = await poolInForAllocPoolFour();
      const check = inflation * (pool / 100);
      return check;
    }
  };

  const changeTotalVolumePerPool = () => {
    if (wallet.signer !== 'signer') {
      return 2433.3382;
    }
  };

  const RGPTotalTokeStake = async () => {
    if (wallet.signer !== 'signer') {
      //  const specialPool = await RGPSpecialPool();
      //  console.log("special pool:",specialPool)
      //  const value = 1;
      //  const myStaked = await specialPool.calculateRewards(0);
      //  const userStakedBal = Web3.utils.fromWei(myStaked.toString());
      //  setRGPTotalTokStake(userStakedBal)
      //  return userStakedBal
      // userStakedBal should be toFixed(4)
    }
  };

  const getAllLiquidities = async () => {
    try {
      const pairs = [];
      const smartFactory = await SmartFactory();
      const allLiquidityPairs = await smartFactory.allPairsLength();
      for (let i = 0; i < allLiquidityPairs.toString(); i++) {
        const pairAddress = await smartFactory.allPairs(i);
        const liquidity = await LiquidityPairInstance(pairAddress);
        const balance = await liquidity.balanceOf(wallet.address);
        const totalSupply = await liquidity.totalSupply();
        const reserves = await liquidity.getReserves();
        const pooledToken0 =
          ((balance.toString() / totalSupply) * reserves[0]) / 1e18;
        const pooledToken1 =
          ((balance.toString() / totalSupply) * reserves[1]) / 1e18;
        const token0 = await liquidity.token0();
        const token1 = await liquidity.token1();
        const erc20Token0 = await erc20Token(token0);
        const erc20Token1 = await erc20Token(token1);
        const symbol0 = await erc20Token0.symbol();
        const symbol1 = await erc20Token1.symbol();
        const liquidityObject = {
          pairAddress: Web3.utils.toChecksumAddress(pairAddress),
          poolToken: Web3.utils.fromWei(balance.toString(), 'ether'),
          totalSupply: totalSupply.toString(),
          poolShare: balance.toString() / totalSupply,
          path: [
            { fromPath: token0, token: symbol0, amount: pooledToken0 },
            { toPath: token1, token: symbol1, amount: pooledToken1 },
          ],
          pooledToken0,
          pooledToken1,
        };
        if (liquidityObject.poolToken != 0) {
          pairs.push(liquidityObject);
          console.log(liquidityObject);
        }
        props.changeFarmingContent({
          reserves0: reserves[0].toString(),
          reserves1: reserves[1].toString(),
          symbol0,
          symbol1,
        });
      }
      setLiquidities([...pairs]);
    } catch (error) { }
  };

  return (
    <div>
      <Layout title="Farming Page">
        <InfoModal
          isOpenModal={isOpenModal}
          onCloseModal={onCloseModal}
          title="RGP STAKING POOL IS COMING SOON..."
        >
          <RGPFarmInfo />
        </ InfoModal>
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
                <FarmingPageModal
                  farmingModal={farmingModal}
                  setFarmingModal={setFarmingModal}
                  farmingFee={farmingFee}
                />
                <Text>Deposit</Text>
                <Text>Earn</Text>
                <Text>APY</Text>
                <Text>Total Liquidity</Text>
                <Text />
              </Flex>
              {props.farming.contents.map(content => (
                <YieldFarm

                  onOpenModal={onOpenModal}
                  content={content}
                  key={content.id}
                  wallet={wallet}
                  refreshTokenStaked={refreshTokenStaked}
                  loadingTotalLiquidity={props.farming.loading}
                />
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

const mapStateToProps = ({ farming, wallet }) => ({
  farming,
  wallet,
});

function mapDispatchToProps(dispatch) {
  return {
    sendAction: res => dispatch({ type: SEND_ACTION, payload: res }),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  {
    changeFarmingContent,
    changeFarmingContentToken,
    changeRGPFarmingFee,
    updateTotalLiquidity,
    updateTokenStaked,
    updateFarmBalances,
    changeRGPValue,
    farmDataLoading,
    notify
  },
)(FarmingPage);
