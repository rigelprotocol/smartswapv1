/**
 *
 * FarmingPageV2
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { connect } from 'react-redux';
import Web3 from 'web3';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  useDisclosure as useModalDisclosure,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Layout from 'components/layout';
import YieldFarm from 'components/yieldfarm-v2/YieldFarm';
import InfoModal from 'components/modal/InfoModal';
import FarmingPageModal from 'components/yieldfarm-v2/FarmingPageModal';
import RGPFarmInfo from 'components/yieldfarm-v2/RGPFarmInfo';
import { notify } from 'containers/NoticeProvider/actions';

import {
  masterChefV2Contract,
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

import { tokenList } from '../../utils/constants';
import { changeRGPValue } from '../WalletProvider/actions';
import {
  changeFarmingContent,
  changeFarmingContentToken,
  changeRGPFarmingFee,
  updateTotalLiquidity,
  updateTokenStaked,
  updateFarmBalances,
  farmDataLoading,
} from './actions';

export function FarmingPage(props) {
  const history = useHistory();

  const { wallet } = props.wallet;
  const [isAddressWhitelist, setIsAddressWhitelist] = useState(false);
  const [dataInputToGetWhiteListed] = useState('');
  const [farmingModal, setFarmingModal] = useState(false);
  const [closeInfoModal, setCloseInfoModal] = useState(true);
  const [farmingFee, setFarmingFee] = useState(10);
  const [initialLoad, setInitialLoad] = useState(true);
  const [setShowModalWithInput] = useState(false);
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useModalDisclosure();
  const toast = useToast();
  const id = 'totalLiquidityToast';

  useEffect(() => {
    checkIfUserAddressHasBeenWhiteListed();
    refreshTokenStaked();
  }, [wallet]);

  useEffect(() => {
    const RGPfarmingFee = async () => {
      if (wallet.signer !== 'signer') {
        const masterChefV2 = await masterChefV2Contract();
        const minFarmingFee = await masterChefV2.farmingFee();
        const fee = Web3.utils.fromWei(minFarmingFee.toString());
        setFarmingFee(fee);
        props.changeRGPFarmingFee({
          fee,
        });
      }
    };
    RGPfarmingFee();
    checkIfInitialLoading();
  }, [wallet]);
  const refreshTokenStaked = () => {
    getFarmData();
    getFarmTokenBalance();
    getTokenStaked();
    props.changeRGPValue(wallet);
  };
  const checkIfInitialLoading = () => {
    initialLoad ? setFarmingModal(true) : setFarmingModal(false);
  };

  function AlertSvg(props) {
    return (
      <svg
        overflow="visible"
        width={48}
        height={48}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect width={48} height={48} rx={8} fill="#2D276A" />
        <path
          d="M33.935 27.658L30.638 15.38c-.358-1.335-1.999-1.827-3.035-.91l-2.078 1.84a19.916 19.916 0 01-8.054 4.325 4.68 4.68 0 00-3.31 5.732 4.691 4.691 0 005.738 3.313 19.94 19.94 0 019.142-.274l2.721.556c1.357.277 2.531-.968 2.173-2.303zM19.718 20L23.5 34"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  const checkIfUserAddressHasBeenWhiteListed = async () => {
    if (wallet.address !== '0x') {
      try {
        const specialPool = await RGPSpecialPool();
        const isItWhiteListed = await specialPool.isWhitelist(wallet.address);
        setIsAddressWhitelist(isItWhiteListed);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const submitDataToGetWhitelisted = () => {
    console.log({ dataInputToGetWhiteListed });
    onCloseModal();
    toast({
      title: 'Address successfully submitted',
      description: 'You will be notified if you are eligible for this pool',
      status: 'success',
      position: 'bottom-right',
      duration: 4000,
      // isClosable: true,
    });
  };
  const getSpecialPoolAPY = async () => {
    try {
      const specialPool = await RGPSpecialPool();
      const totalStaking = await specialPool.totalStaking();
      return totalStaking;
    } catch (error) {}
  };
  useEffect(() => {
    getFarmData();
  }, []);

  const getFarmData = async () => {
    props.farmDataLoading(true);
    try {
      const [specialPool, pool1, pool2, pool3] = await Promise.all([
        RGPSpecialPool(),
        smartSwapLPTokenPoolOne(),
        smartSwapLPTokenPoolTwo(),
        smartSwapLPTokenPoolThree(),
      ]);
      const [
        rgpTotalStaking,
        pool1Reserve,
        pool2Reserve,
        pool3Reserve,
      ] = await Promise.all([
        specialPool.totalStaking(),
        pool1.getReserves(),
        pool2.getReserves(),
        pool3.getReserves(),
      ]);
      const RGPprice = ethers.utils.formatUnits(
        pool1Reserve[0].mul(1000).div(pool1Reserve[1]),
        3,
      );
      const BNBprice = getBnbPrice(pool3, pool3Reserve);
      const RGPLiquidity = ethers.utils
        .formatUnits(rgpTotalStaking.mul(Math.floor(1000 * RGPprice)), 21)
        .toString();
      const BUSD_RGPLiquidity = ethers.utils
        .formatEther(pool1Reserve[0].mul(2))
        .toString();

      const RGP_BNBLiquidity = ethers.utils
        .formatUnits(pool2Reserve[0].mul(Math.floor(BNBprice * 1000 * 2)), 21)
        .toString();

      const BUSD_BNBLiquidity = getBusdBnbLiquidity(pool3, pool3Reserve);
      props.updateTotalLiquidity([
        {
          liquidity: RGPLiquidity,
          apy: calculateApy(RGPprice, RGPLiquidity, 250),
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
        showErrorToast();
      }
    } finally {
      props.farmDataLoading(false);
    }
  };

  const getBusdBnbLiquidity = (pool3, pool3Reserve) => {
    const pool3Testnet = '0x120f3E6908899Af930715ee598BE013016cde8A5';
    let BUSD_BNBLiquidity;
    if (pool3 && pool3.address === pool3Testnet) {
      BUSD_BNBLiquidity = ethers.utils
        .formatEther(pool3Reserve[0].mul(2))
        .toString();
    } else {
      BUSD_BNBLiquidity = ethers.utils
        .formatEther(pool3Reserve[1].mul(2))
        .toString();
    }
    return BUSD_BNBLiquidity;
  };

  const getBnbPrice = (pool3, pool3Reserve) => {
    const pool3testnet = '0x120f3E6908899Af930715ee598BE013016cde8A5';
    let BNBprice;
    if (pool3 && pool3.address === pool3testnet) {
      BNBprice = ethers.utils.formatUnits(
        pool3Reserve[0].mul(1000).div(pool3Reserve[1]),
        3,
      );
    } else {
      BNBprice = ethers.utils.formatUnits(
        pool3Reserve[1].mul(1000).div(pool3Reserve[0]),
        3,
      );
    }
    return BNBprice;
  };

  const showErrorToast = () =>
    toast({
      id,
      title: 'Unable to load data',
      description: 'Ensure your wallet is on BSC network and reload page',
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });

  const specialPoolStaked = async () => {
    if (wallet.address != '0x') {
      try {
        const specialPool = await RGPSpecialPool();
        const RGPStakedEarned = await Promise.all([
          specialPool.userData(wallet.address),
          specialPool.calculateRewards(wallet.address),
        ]);
        return RGPStakedEarned;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  const getTokenStaked = async () => {
    try {
      if (wallet.address != '0x') {
        const masterChefV2 = await masterChefV2Contract();

        const [
          poolOneEarned,
          poolTwoEarned,
          poolThreeEarned,
          poolOneStaked,
          poolTwoStaked,
          poolThreeStaked,
        ] = await Promise.all([
          masterChefV2.pendingRigel(1, wallet.address),
          masterChefV2.pendingRigel(2, wallet.address),
          masterChefV2.pendingRigel(3, wallet.address),
          masterChefV2.userInfo(1, wallet.address),
          masterChefV2.userInfo(2, wallet.address),
          masterChefV2.userInfo(3, wallet.address),
        ]);
        const RGPStakedEarned = await specialPoolStaked();
        let RGPStaked;
        let RGPEarned;
        if (RGPStakedEarned) {
          const [specialPoolStaked, specialPoolEarned] = RGPStakedEarned;
          RGPStaked = formatBigNumber(specialPoolStaked.tokenQuantity);
          RGPEarned = formatBigNumber(specialPoolEarned);
        } else {
          RGPStaked = 0;
          RGPEarned = 0;
        }
        props.updateTokenStaked([
          { staked: RGPStaked, earned: RGPEarned },
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
        setInitialLoad(false);
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
        const [RGPToken, poolOne, poolTwo, poolThree] = await Promise.all([
          rigelToken(),
          smartSwapLPTokenPoolOne(),
          smartSwapLPTokenPoolTwo(),
          smartSwapLPTokenPoolThree(),
        ]);

        const [
          RGPbalance,
          poolOneBalance,
          poolTwoBalance,
          poolThreeBalance,
        ] = await Promise.all([
          RGPToken.balanceOf(wallet.address),
          poolOne.balanceOf(wallet.address),
          poolTwo.balanceOf(wallet.address),
          poolThree.balanceOf(wallet.address),
        ]);

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
      const lpTokens = await masterChefV2Contract();
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
      const masterChefV2 = await masterChefV2Contract();
      const rigelAllocPoint = await masterChefV2.poolInfo(0);
      return rigelAllocPoint.allocPoint.toString();
    }
  };

  const poolInForAllocPoolTwo = async () => {
    if (wallet.signer !== 'signer') {
      const masterChefV2 = await masterChefV2Contract();
      const rigelAllocPoint = await masterChefV2.poolInfo(1);
      return rigelAllocPoint.allocPoint.toString();
    }
  };

  const poolInForAllocPoolThree = async () => {
    if (wallet.signer !== 'signer') {
      const masterChefV2 = await masterChefV2Contract();
      const rigelAllocPoint = await masterChefV2.poolInfo(2);
      return rigelAllocPoint.allocPoint;
    }
  };

  const poolInForAllocPoolFour = async () => {
    if (wallet.signer !== 'signer') {
      const masterChefV2 = await masterChefV2Contract();
      const rigelAllocPoint = await masterChefV2.poolInfo(3);
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
    } catch (error) {}
  };

  const changeVersion = () => {
    history.push('/farming');
  };

  return (
    <div>
      <Layout title="Farming Page">
        <InfoModal
          isOpenModal={isOpenModal}
          onCloseModal={onCloseModal}
          // showModalWithInput={showModalWithInput}
          // setShowModalWithInput={setShowModalWithInput}
          // submitData={submitDataToGetWhitelisted}
          // InputData={dataInputToGetWhiteListed}
          // setInputData={setDataInputToGetWhiteListed}
          title="YOUR ADDRESS IS NOT WHITELISTED FOR RGP STAKING"
        >
          <RGPFarmInfo />
        </InfoModal>
        {closeInfoModal &&
            <Box mx={[5, 10, 15, 20]} my={4}>
            <Alert color="#FFFFFF" background="#726AC8" borderRadius="8px">
              <AlertSvg />
              <AlertDescription
                fontFamily="Inter"
                fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                fontWeight="500"
                lineHeight="24px"
                letterSpacing="0em"
                textAlign="left"
                padding="30px"
              >
                This is the V2 Farm. You should migrate your stakings from V1 Farm
              </AlertDescription>
              <CloseButton
                position="absolute"
                height="14px"
                width="14px"
                background="#726AC8"
                color="#fff"
                right="20px"
                border="2px solid #726AC8"
                textAign="center"
                cursor="pointer"
                onClick={()=>setCloseInfoModal(false)}
              />
            </Alert>
          </Box>

       }
        <Flex justifyContent="flex-end">
          <Tabs
            variant="soft-rounded"
            colorScheme="#2D276A"
            background="#2D276A"
            mx={[5, 10, 15, 20]}
            marginTop={{ base: '', md: '2px', lg: '2px' }}
            position={{ base: 'relative', md: 'absolute' }}
            paddingLeft={{ base: '1px', md: '10px', lg: '15px' }}
            borderRadius="50px"
          >
            <TabList>
              <Tab
                padding="8px 34px"
                marginTop="3px"
                background="none"
                border="none"
                onClick={changeVersion}
              >
                V1
              </Tab>
              <Tab padding="8px 34px" marginTop="3px" background="#726AC8">
                V2
              </Tab>
            </TabList>
          </Tabs>
        </Flex>
        <Tabs isManual variant="enclosed" mx={[5, 10, 15, 20]} my={4}>
          <TabList border="none">
            <Tab
              borderRadius="0px"
              border="1px solid #2D276A"
              background="#2D276A"
              color="#fff"
            >
              Liquidity Pools
            </Tab>
            <Tab
              borderRadius="0px"
              border="1px solid #2D276A"
              background="#2D276A"
              color="#fff"
            >
              Staking
            </Tab>
          </TabList>
          <TabPanels padding="0px">
            <TabPanel padding="0px">
              <Flex
                justifyContent="center"
                alignItems="center"
                rounded="lg"
                mb={4}
              >
                <Box
                  bg="#120136"
                  minHeight="89vh"
                  w={['100%', '100%', '100%']}
                  background="#29235e"
                  rounded="lg"
                >
                  <Box mx="auto" w={['100%', '100%', '100%']} pb="70px">
                    <Flex
                      color="gray.400"
                      alignItems="center"
                      justifyContent="space-between"
                      px={4}
                      pt={4}
                      w={['100%', '100%', '100%']}
                      align="left"
                      background="#2D276A"
                      border="1px solid #4D4693"
                      display={{ base: 'none', md: 'flex', lg: 'flex' }}
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
                        isAddressWhitelist={isAddressWhitelist}
                        onOpenModal={onOpenModal}
                        setShowModalWithInput={setShowModalWithInput}
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
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
    notify,
  },
)(FarmingPage);
