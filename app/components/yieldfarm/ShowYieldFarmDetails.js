import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Square,
  Text,
  Circle,
  InputGroup,
  InputRightElement,
  Divider,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import Web3 from 'web3';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import styles from '../../styles/yieldFarmdetails.css';
import { clearInputInfo } from "../../utils/UtilFunc"
import {
  rigelToken,
  BUSDToken,
  RGPSpecialPool,
  masterChefContract,
  smartSwapLPTokenPoolOne,
  smartSwapLPTokenPoolTwo,
  smartSwapLPTokenPoolThree,
} from '../../utils/SwapConnect';
import { SMART_SWAP } from '../../utils/constants';

const ShowYieldFarmDetails = ({ content, wallet, refreshTokenStaked }) => {
  const [depositValue, setDepositValue] = useState('Confirm');
  const [deposit, setDeposit] = useState(false);
  const [unstakeButtonValue, setUnstakeButtonValue] = useState('Confirm');
  const [approveValueForRGP, setApproveValueForRGP] = useState(false);
  const [approveValueForOtherToken, setApproveValueForOtherToken] = useState(
    false,
  );
  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const [depositTokenValue, setDepositTokenValue] = useState(0);
  const [unstakeToken, setUnstakeToken] = useState(0);
  const [stakedToken, setStakeToken] = useState('0.00');
  const [rewards, setRewards] = useState('0.000');
  const [isNewUser, setIsNewUser] = useState(true);
  const [allowanceApproval, setAllowanceApproval] = useState(false);
  const [isPoolRGP, setIsPoolRGP] = useState(false);

  useEffect(() => {
    const outPut = async () => {
      if (wallet.signer !== 'signer') {
        const specialPool = await RGPSpecialPool();
        // setStakeToken(stakedToken);
        const totalStakingBal = await specialPool.totalStaking();
        const seeTotalStaked = await Web3.utils.fromWei(
          totalStakingBal.toString(),
        );
        setStakeToken(Number(seeTotalStaked.toString()).toFixed(3));
      }
      // userHarvest();
    };

    // check for once approve
    // check for rgp once approve
    const specailPoolAllowance = async () => {
      if (wallet.signer !== 'signer') {
        if (wallet.signer !== 'signer') {
          const rgp = await rigelToken();
          const rgpApproval = await rgp.allowance(
            wallet.address,
            SMART_SWAP.specialPool,
          );
          return !(rgpApproval.toString() <= 0);
        }
      }
    };

    const rgpAllowancePool = async () => {
      if (wallet.signer !== 'signer') {
        if (wallet.signer !== 'signer') {
          const rgp = await rigelToken();
          const rgpApproval = await rgp.allowance(
            wallet.address,
            SMART_SWAP.masterChef,
          );
          return !(rgpApproval.toString() <= 0);
        }
      }
    };

    const BNBRGPAllowance = async () => {
      if (wallet.signer !== 'signer') {
        const poolTwo = await smartSwapLPTokenPoolTwo();
        const rgpApproval = await poolTwo.allowance(
          wallet.address,
          SMART_SWAP.masterChef,
        );
        return !(rgpApproval.toString() <= 0);
      }
    };
    const BUSDRGPAllowance = async () => {
      if (wallet.signer !== 'signer') {
        const poolOne = await smartSwapLPTokenPoolOne();
        const rgpApproval = await poolOne.allowance(
          wallet.address,
          SMART_SWAP.masterChef,
        );
        return !(rgpApproval.toString() <= 0);
      }
    };
    const BNBBUSDAllowance = async () => {
      if (wallet.signer !== 'signer') {
        const poolThree = await smartSwapLPTokenPoolThree();
        const rgpApproval = await poolThree.allowance(
          wallet.address,
          SMART_SWAP.masterChef,
        );
        return !(rgpApproval.toString() <= 0);
      }
    };
    const checkForApproval = async () => {
      if (content.deposit === 'RGP') {
        setIsPoolRGP(true);
        const specialPoolApproval = await specailPoolAllowance();
        changeApprovalButton(true, specialPoolApproval);
      } else if (content.deposit === 'RGP-BNB') {
        const approvalForRGPBNB = await BNBRGPAllowance();
        const rgpApproval2 = await rgpAllowancePool();
        changeApprovalButton(approvalForRGPBNB, rgpApproval2);
      } else if (content.deposit === 'RGP-BUSD') {
        const approvalForRGPBUSD = await BUSDRGPAllowance();
        const rgpApproval1 = await rgpAllowancePool();
        changeApprovalButton(approvalForRGPBUSD, rgpApproval1);
      } else if (content.deposit === 'BNB-BUSD') {
        const approvalForBNBBUSD = await BNBBUSDAllowance();
        const approvalForRGP = await rgpAllowancePool();
        changeApprovalButton(approvalForBNBBUSD, approvalForRGP);
      }
    };

    function changeApprovalButton(otherTokenApproval, rgpApproval) {
      if (otherTokenApproval && rgpApproval) {
        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
      } else if (otherTokenApproval) {
        setApproveValueForOtherToken(true);
      } else if (rgpApproval) {
        setApproveValueForRGP(true);
      } else {
        setApproveValueForRGP(false);
        setApproveValueForOtherToken(false);
      }
    }
    setApproveValueForRGP(false);
    setApproveValueForOtherToken(false);
    checkForApproval();
    // outPut();
  }, [wallet, content]);

  const callRefreshFarm = (confirmations, status) => {
    if (confirmations >= 1 && status >= 1) {
      refreshTokenStaked()
    }
  };

  const RGPApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = (await rgp.balanceOf(wallet.address)) + 400e18;
      await rgp.approve(SMART_SWAP.masterChef, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('20', 'gwei'),
      });
    }
  };

  // .......................................... START SPECAIL POOL CALLS..........................................
  const RGPuseStake = async depositToken => {
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      const data = await specialPool.stake(
        ethers.utils.parseEther(depositTokenValue.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      callRefreshFarm(confirmations, status);
    }
  };

  // withdrawal of funds
  const RGPUnstake = async () => {
    console.log('opening usewithdrawal now.');
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      const data = await specialPool.unStake(
        ethers.utils.parseUnits(unstakeToken, 'ether'), // user input from onclick shoild be here...
        {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      // dispatch the getTokenStaked action from here when data changes
      callRefreshFarm(confirmations, status);
    }
  };

  // Approve specialPool......
  const RGPSpecialPoolApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = (await rgp.balanceOf(wallet.address)) + 400e18;
      await rgp.approve(SMART_SWAP.specialPool, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('20', 'gwei'),
      });
    }
  };

  // ........................................ END SPECIAL POOL..................................

  // .......................................... START LP FOR BNB-RGP TOKENS ...............................

  // deposit for the Liquidity Provider tokens for
  const BNBRGPlpDeposit = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = 2;
      const data = await lpTokens.deposit(
        pid,
        ethers.utils.parseEther(depositTokenValue.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      callRefreshFarm(confirmations, status);
    }
  };

  // withdrawal for the Liquidity Provider tokens for
  const BNBRGPlpTokensWithdrawal = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = 2;
      const data = await lpTokens.withdraw(
        pid,
        ethers.utils.parseEther(unstakeToken.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      // dispatch the getTokenStaked action from here when data changes
      callRefreshFarm(confirmations, status);
    }
  };

  const BNBRGPlpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const slpTwo = await smartSwapLPTokenPoolTwo();
      const walletBal = (await slpTwo.balanceOf(wallet.address)) + 400e18;
      await slpTwo.approve(SMART_SWAP.masterChef, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('20', 'gwei'),
      });
    }
  };

  // ............................................END LP FOR BNB-RGP TOKENS .........................................

  // .......................................... START LP FOR RGP-BUSD TOKENS ...............................

  // deposit for the Liquidity Provider tokens for
  const RGPBUSDlpDeposit = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = 1;
      const data = await lpTokens.deposit(
        pid,
        ethers.utils.parseEther(depositTokenValue.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      callRefreshFarm(confirmations, status);
    }
  };

  // withdrawal for the Liquidity Provider tokens for
  const RGPBUSDlpTokensWithdrawal = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = 1;
      const data = await lpTokens.withdraw(
        pid,
        ethers.utils.parseEther(unstakeToken.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      // dispatch the getTokenStaked action from here when data changes
      callRefreshFarm(confirmations, status);
    }
  };

  const RGPBUSDlpApproval = async () => {
    if (wallet.signer !== 'signer') {
      try {
        const poolOne = await smartSwapLPTokenPoolOne();
        const walletBal = (await poolOne.balanceOf(wallet.address)) + 400e18;
        await poolOne.approve(SMART_SWAP.masterChef, walletBal, {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        });
      } catch (e) {
        props.showErrorMessage(e);
      }
    }
  };
  // ............................................END LP FOR RGP-BUSD TOKENS .........................................

  // .......................................... START LP FOR BNB-BUSD TOKENS ...............................

  const BNBBUSDlpDeposit = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = 3;
      const data = await lpTokens.deposit(
        pid,
        ethers.utils.parseEther(depositTokenValue.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  // withdrawal for the Liquidity Provider tokens for
  const BNBBUSDlpTokensWithdrawal = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const pid = 3;
      const data = await lpTokens.withdraw(
        pid,
        ethers.utils.parseEther(unstakeToken.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      // dispatch the getTokenStaked action from here when data changes
      callRefreshFarm(confirmations, status);
    }
  };

  const BNBBUSDlpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const poolThree = await smartSwapLPTokenPoolThree();
      const walletBal = (await poolThree.balanceOf(wallet.address)) + 400e18;
      await poolThree.approve(SMART_SWAP.masterChef, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('20', 'gwei'),
      });
    }
  };

  // ............................................END LP FOR BNB-BUSD TOKENS .........................................
  const harvest = async pId => {
    if (wallet.signer !== 'signer' && pId != 0) {
      try {
        const lpTokens = await masterChefContract();
        await lpTokens.withdraw(pId, 0);
      } catch (error) {
        console.error(error);
      }
    }
  };
  // show max value
  const showMaxValue = async (deposit, input) => {
    try {
      // if (input === 'deposit') {
      //   if (deposit === 'BUSD') {
      //     const busd = await BUSDToken();
      //     const walletBal = await busd.balanceOf(wallet.address);
      //     // alert('setting max value for busd');
      //     const busdBal = ethers.utils.formatUnits(walletBal);
      //     setDepositTokenValue(busdBal);
      //     // depositTokenValue
      //   } else if (deposit === 'RGP') {
      //     const rgp = await rigelToken();
      //     const walletBal = await rgp.balanceOf(wallet.address);
      //     // depositTokenValue
      //     // alert('setting max value for RGP');
      //     const rgpBal = ethers.utils.formatUnits(walletBal);
      //     setDepositTokenValue(rgpBal);
      //   }
      // } else if (input === 'unstake') {
      //   if (deposit === 'BUSD') {
      //     const busd = await BUSDToken();
      //     const walletBal = await busd.balanceOf(wallet.address);
      //     // alert('setting max value for busd');
      //     const busdBal = ethers.utils.formatUnits(walletBal);
      //     setUnstakeToken(busdBal);
      //   } else if (deposit === 'RGP') {
      //     const rgp = await rigelToken();
      //     const walletBal = await rgp.balanceOf(wallet.address);
      //     // alert('setting max value for RGP');
      //     const rgpBal = ethers.utils.formatUnits(walletBal);
      //     setUnstakeToken(rgpBal);
      //   }
      // }

      if (input === 'deposit') {
        setDepositTokenValue(content.availableToken);
      } else if (input === 'unstake') {
        setUnstakeToken(content.tokensStaked[1]);
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    }
  };

  const fetchTransactionData = async sendTransaction => {
    const { confirmations, status } = await sendTransaction.wait(1);

    return { confirmations, status };
  };

  const open = () => {
    if (approveValueForOtherToken && approveValueForRGP) {
      modal1Disclosure.onOpen();
    }
  };
  const close = () => {
    modal1Disclosure.onClose();
  };
  const closeModal = () => {
    modal2Disclosure.onClose();
  };
  const confirmDeposit = async val => {
    setDepositValue('Pending Confirmation');
    try {
      if (wallet.signer !== 'signer') {
        if (val === 'RGP') {
          // await RGPuseStake(depositTokenValue);
        } else if (val === 'RGP-BNB') {
          await BNBRGPlpDeposit(depositTokenValue);
        } else if (val === 'BNB-BUSD') {
          await BNBBUSDlpDeposit(depositTokenValue);
        } else if (val === 'RGP-BUSD') {
          await RGPBUSDlpDeposit(depositTokenValue);
        } else {
          // await RGPuseStake(depositTokenValue)
        }
        setTimeout(() => close(), 400);
    setDeposit(true);
        clearInputInfo(setDepositTokenValue,setDepositValue,"Confirm")
      }
    } catch (e) {
      console.log(e);
    }
  };
  const confirmUnstakeDeposit = async val => {
    setUnstakeButtonValue('Pending Confirmation');
    try {
      if (wallet.signer !== 'signer') {
        if (val === 'RGP') {
          // await RGPUnstake();
        } else if (val === 'RGP-BNB') {
          await BNBRGPlpTokensWithdrawal();
        } else if (val === 'BNB-BUSD') {
          await BNBBUSDlpTokensWithdrawal();
        } else if (val === 'RGP-BUSD') {
          await RGPBUSDlpTokensWithdrawal();
        }
        setTimeout(() => closeModal(), 400);
        clearInputInfo(setUnstakeToken,setUnstakeButtonValue,"Confirm")
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    }
  };

  // checkingS for approval.
  const setApprove = val => {
    if (approveValueForOtherToken && approveValueForRGP) {
      modal2Disclosure.onOpen();
    } else {
      checkUser(val);
    }
  };

  const checkUser = async val => {
    // try {
    if (wallet.signer !== 'signer') {
      if (val === 'RGP-BNB') {
        if (!approveValueForOtherToken && !approveValueForRGP) {
          await RGPApproval();
          await BNBRGPlpApproval();
        } else if (!approveValueForRGP) {
          await RGPApproval();
        } else {
          await BNBRGPlpApproval();
        }
        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
      } else if (val === 'BNB-BUSD') {
        if (!approveValueForOtherToken && !approveValueForRGP) {
          await RGPApproval();
          await BNBBUSDlpApproval();
        } else if (!approveValueForRGP) {
          await RGPApproval();
        } else {
          await BNBBUSDlpApproval();
        }
        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
      } else if (val === 'RGP-BUSD') {
        if (!approveValueForOtherToken && !approveValueForRGP) {
          await RGPApproval();
          await RGPBUSDlpApproval();
        } else if (!approveValueForRGP) {
          await RGPApproval();
        } else {
          await RGPBUSDlpApproval();
        }

        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
      } else if (val === 'RGP') {
        await RGPSpecialPoolApproval();
        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
        //  setApproveButtonColor(true);
      }
    } else if (ethers.utils.formatEther(checkAllow).toString() == 0.0) {
      await RGPSpecialPoolApproval();

      //  setApproveButtonColor(true);
    }
    //  } catch (e) {
    //    console.log(
    //      'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
    //    );
    //  }
  };

  return (
    <>
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
        color="white"
        margin="0 auto"
        background="#29235E"
        padding="0 20px"
        paddingBottom="4px"
        width="90%"
        borderBottomRadius="14px"
      >
        <Box width="100%" textAlign="right">
          <Flex>
            <Text fontSize="20px" marginRight="20px">
              {content.tokensStaked[1]}
            </Text>{' '}
            <Text fontSize="14px" color="gray.400" marginTop="25px">
              {' '}
              {content.type === 'LP'
                ? `${content.tokensStaked[0]} LP`
                : 'RGP'}{' '}
              Tokens Staked
            </Text>
          </Flex>

          <Flex>
            <Button
              w="60%"
              h="50px"
              borderRadius="12px"
              bg={
                approveValueForRGP && approveValueForOtherToken
                  ? '#444159'
                  : 'rgba(64, 186,213, 0.1)'
              }
              color={
                approveValueForRGP && approveValueForOtherToken
                  ? 'rgba(190, 190, 190, 1)'
                  : '#40BAD5'
              }
              border="0"
              mb="4"
              mr="6"
              cursor="pointer"
              _hover={
                approveValueForRGP && approveValueForOtherToken
                  ? { color: 'white       ' }
                  : { color: '#423a85' }
              }
              onClick={() => setApprove(content.deposit)}
            >
              {approveValueForRGP && approveValueForOtherToken
                ? 'Unstake'
                : 'Approve'}
            </Button>
            <Square
              size="40px"
              borderRadius="12px"
              color="white"
              cursor="pointer"
              marginTop="5px"
              bg="rgba(64, 186, 213, 0.1);"
            >
              <AddIcon
                onClick={open}
                disabled={!!(!approveValueForRGP || !approveValueForOtherToken)}
              />
            </Square>
          </Flex>
        </Box>

        <Box width="100%" textAlign="right" margin={['0', '0', '0 20px']}>
          <Flex>
            <Text fontSize="23px" marginRight="30px">
              {content.RGPEarned}
            </Text>{' '}
            <Text color="gray.400" marginTop="25px">
              RGP Earned
            </Text>
          </Flex>
          <Button
            w="100%"
            h="50px"
            borderRadius="12px"
            bg="#444159"
            color="rgba(190, 190, 190, 1)"
            border="0"
            mb="4"
            mr="6"
            cursor="pointer"
            _hover={{ bg: '#444159' }}
            onClick={() => harvest(content.pId)}
          >
            Harvest
          </Button>
        </Box>

        <Box width="100%">
          {!isPoolRGP && (
            <Flex marginTop="10px">
              <Text color="gray.400" textAlign="right" marginRight="30px">
                Entry Pool Fee
              </Text>{' '}
              <Text fontSize="23px" marginTop="15px">
                {content.farmingFee} RGPs
              </Text>
            </Flex>
          )}
          <Flex justifyContent="right">
            <Text marginTop="15px">Auto-Harvest</Text>
            <label className={styles.themeSwitch}>
              <input
                type="checkbox"
                id="checkbox"
                name="influencer"
                className={styles.input}
              />
              <div className={`${styles.slider} ${styles.round}`} />
            </label>
            <Circle
              size="20px"
              bg="#fff"
              marginTop="14px"
              marginLeft="10px"
              marginRight="10px"
            >
              <Tooltip label="Auto Harvest (weekly)" fontSize="md">
                <QuestionOutlineIcon color="#120136" cursor="pointer" />
              </Tooltip>
            </Circle>
          </Flex>
        </Box>
      </Flex>
      <Modal isOpen={modal1Disclosure.isOpen} onClose={close} isCentered="true">
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalHeader
            fontSize="18px"
            fontWeight="regular"
            align="center"
            className={styles.header}
          >
            Deposit {content.deposit} Tokens
          </ModalHeader>
          <ModalBody className={styles.body}>
            <Text color="gray.400" align="right">
              {content.availableToken} {content.deposit} Available
            </Text>
            <InputGroup size="md">
              <Input
                type="text"
                color="#fff"
                placeholder="Available Token"
                bg="#29235E"
                opacity="0.5"
                h="50px"
                borderRadius="20px"
                name="availableToken"
                value={depositTokenValue}
                onChange={e => setDepositTokenValue(e.target.value)}
                border="0"
              />
              <InputRightElement marginRight="15px">
                <Button
                  color="rgba(64, 186, 213, 1)"
                  border="none"
                  borderRadius="6px"
                  fontSize="13px"
                  bg="rgba(53, 44, 129, 0.3)"
                  p="1"
                  mt="10px"
                  height="20px"
                  cursor="pointer"
                  _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                  onClick={() => showMaxValue(content.deposit, 'deposit')}
                >
                  MAX
                </Button>
              </InputRightElement>
            </InputGroup>
            <Box mt={4}>
              <Button
                my="2"
                mx="auto"
                color={
                  depositValue === 'Confirm'
                    ? 'rgba(190, 190, 190, 1)'
                    : '#40BAD5'
                }
                width="100%"
                background={
                  depositValue === 'Confirm'
                    ? 'rgba(64, 186, 213, 0.15)'
                    : '#444159'
                }
                disabled={depositValue !== 'Confirm'}
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={
                  depositValue === 'Confirm'
                    ? { background: 'rgba(64, 186, 213, 0.15)' }
                    : { background: '#444159' }
                }
                onClick={() => confirmDeposit(content.deposit)}
              >
                {depositValue}
              </Button>
              <Button
                my="2"
                mx="auto"
                color="#40BAD5"
                width="100%"
                background="rgba(64, 186, 213, 0.15)"
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                onClick={close}
              >
                Cancel
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modal2Disclosure.isOpen}
        onClose={closeModal}
        isCentered="true"
      >
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalHeader
            fontSize="18px"
            fontWeight="regular"
            align="center"
            className={styles.header}
          >
            Unstake {content.deposit} Tokens
          </ModalHeader>
          <ModalBody className={styles.body}>
            <Text color="gray.400" align="right">
              {content.tokensStaked[1]} {content.deposit} Staked
            </Text>
            <InputGroup size="md">
              <Input
                type="text"
                color="#fff"
                placeholder="Available Token"
                bg="#29235E"
                opacity="0.5"
                h="50px"
                borderRadius="20px"
                name="availableToken"
                value={unstakeToken}
                onChange={e => setUnstakeToken(e.target.value)}
                border="0"
              />
              <InputRightElement marginRight="15px">
                <Button
                  color="rgba(64, 186, 213, 1)"
                  border="none"
                  borderRadius="6px"
                  fontSize="13px"
                  bg="rgba(53, 44, 129, 0.3)"
                  p="1"
                  mt="10px"
                  height="20px"
                  cursor="pointer"
                  _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                  onClick={() => showMaxValue(content.deposit, 'unstake')}
                >
                  MAX
                </Button>
              </InputRightElement>
            </InputGroup>
            <Box mt={4}>
              <Button
                my="2"
                mx="auto"
                color={
                  unstakeButtonValue === 'Confirm' ||
                    unstakeButtonValue === 'Confirmed'
                    ? 'rgba(190, 190, 190, 1)'
                    : '#40BAD5'
                }
                width="100%"
                background={
                  unstakeButtonValue === 'Confirm' ||
                    unstakeButtonValue === 'Confirmed'
                    ? 'rgba(64, 186, 213, 0.15)'
                    : '#444159'
                }
                disabled={unstakeButtonValue !== 'Confirm'}
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={
                  unstakeButtonValue === 'Confirm' ||
                    unstakeButtonValue === 'Confirmed'
                    ? { background: 'rgba(64, 186, 213, 0.15)' }
                    : { background: '#444159' }
                }
                onClick={() => confirmUnstakeDeposit(content.deposit)}
              >
                {unstakeButtonValue}
              </Button>
              <Button
                my="2"
                mx="auto"
                color="#40BAD5"
                width="100%"
                background="rgba(64, 186, 213, 0.15)"
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
ShowYieldFarmDetails.propTypes = {
  content: PropTypes.object.isRequired,
};
const mapStateToProps = ({ farming }) => ({
  farming,
});

export default connect(
  mapStateToProps,
  {
  },
)(ShowYieldFarmDetails);
