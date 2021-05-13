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
import styles from '../../styles/yieldFarmdetails.css';
import {
  rigelToken,
  BUSDToken,
  RGPSpecialPool,
  BNBRGPliquidityProviderTokensContract,
} from '../../utils/SwapConnect';
import { SMART_SWAP } from '../../utils/constants';
const ShowYieldFarmDetails = ({ content, wallet }) => {
  const [depositValue, setDepositValue] = useState('Confirm');
  const [deposit, setDeposit] = useState(false);
  const [unstakeButtonValue, setUnstakeButtonValue] = useState('Confirm');
  const [approveValue, setApproveValue] = useState(false);
  const [approveButtonColor, setApproveButtonColor] = useState(false);
  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const [depositRGPBNBToken, setDepositRGPBNBToken] = useState(0);
  const [unstakeRGPBNBToken, setUnstakeRGPBNBToken] = useState(0);
  const [stakedToken, setStakeToken] = useState('0.00');
  const [rewards, setRewards] = useState('0.000');
  const [isNewUser, setIsNewUser] = useState(true);


  useEffect(() => {
    const outPut = async () => {
      if (wallet.signer !== 'signer') {
        const specialPool = await RGPSpecialPool();
        // setStakeToken(stakedToken);
        const totalStakingBal = await specialPool.totalStaking();
        const seeTotalStaked = await Web3.utils.fromWei(totalStakingBal.toString())
        setStakeToken(seeTotalStaked.toString());
        console.log('total staked token ', seeTotalStaked.toString());

      }
      // userHarvest();
    };

    const checkStaked = async () => {
      if (wallet.signer !== 'signer') {
        // const masterChef = await MasterChefContract();
        // setStakeToken(stakedToken);
        // const seeTotalStaked = await masterChef.totalStaking({
        //   from: wallet.signer,
        // });
        // setStakeToken(seeTotalStaked);
        // console.log('total staked token ', seeTotalStaked);
      }
    };

    // checkStaked();
    outPut();

  }, [wallet]);

  // .......................................... START SPECAIL POOL CALLS..........................................
  const RGPuseStake = async depositToken => {
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      await specialPool.stake(
        Web3.utils.toWei(depositRGPBNBToken.toString()),
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  // withdrawal of funds
  const RGPUnstake = async () => {
    console.log('opening usewithdrawal');
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      await specialPool.unStake(
        // Web3.utils.toWei(unstakeRGPBNBToken.toString()),
        ethers.utils.parseUnits(unstakeRGPBNBToken, 'ether'), // user input from onclick shoild be here...
        {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  // Approve specialPool......
  const RGPSpecialPoolApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.specialPool, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('2', 'gwei'),
      });
    }
  };
  // ........................................ END SPECIAL POOL..................................

  // .......................................... START LP FOR BNB-RGP TOKENS ...............................

  //deposit for the Liquidity Provider tokens for
  const BNBRGPlpDeposit = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract();
      const pid = 0;
      await lpTokens.deposit(
        pid,
        Web3.utils.toWei(depositRGPBNBToken.toString()),
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  //withdrawal for the Liquidity Provider tokens for
  const BNBRGPlpTokensWithdrawal = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract()
      const pid = 1;
      await lpTokens.withdraw(
        pid,
        Web3.utils.toWei(depositRGPBNBToken.toString()), // amount passed in from user
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const BNBRGPlpTokensAdd = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract()
      const allocPoint = 1;
      await lpTokens.add(
        allocPoint,
        SMART_SWAP.liquidityProviderTokensContractBNBRGP,
        true,
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const BNBRGPlpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.liquidityProviderTokensContractBNBRGP, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('2', 'gwei'),
      });
    }
  };
  //............................................END LP FOR BNB-RGP TOKENS .........................................


  // .......................................... START LP FOR RGP-BUSD TOKENS ...............................

  //deposit for the Liquidity Provider tokens for
  const RGPBUSDlpDeposit = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract();
      const pid = 0;
      await lpTokens.deposit(
        pid,
        Web3.utils.toWei(depositRGPBNBToken.toString()),
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  //withdrawal for the Liquidity Provider tokens for
  const RGPBUSDlpTokensWithdrawal = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract()
      const pid = 1;
      await lpTokens.withdraw(
        pid,
        Web3.utils.toWei(depositRGPBNBToken.toString()), // amount passed in from user
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const RGPBUSDlpTokensAdd = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract()
      const allocPoint = 1;
      await lpTokens.add(
        allocPoint,
        SMART_SWAP.liquidityProviderTokensContractBNBRGP,
        true,
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const RGPBUSDlpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.liquidityProviderTokensContractBNBRGP, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('2', 'gwei'),
      });
    }
  };

  //............................................END LP FOR RGP-BUSD TOKENS .........................................


  // .......................................... START LP FOR BNB-BUSD TOKENS ...............................

  const BNBBUSDlpDeposit = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract();
      const pid = 0;
      await lpTokens.deposit(
        pid,
        Web3.utils.toWei(depositRGPBNBToken.toString()),
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  //withdrawal for the Liquidity Provider tokens for
  const BNBBUSDlpTokensWithdrawal = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract()
      const pid = 1;
      await lpTokens.withdraw(
        pid,
        Web3.utils.toWei(depositRGPBNBToken.toString()), // amount passed in from user
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const BNBBUSDlpTokensAdd = async depositToken => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await BNBRGPliquidityProviderTokensContract()
      const allocPoint = 1;
      await lpTokens.add(
        allocPoint,
        SMART_SWAP.liquidityProviderTokensContractBNBRGP,
        true,
        // ethers.utils.parseUnits(depositRGPBNBToken),
        {
          from: wallet.address,
          gasLimit: 250000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
    }
  };

  const BNBBUSDlpApproval = async () => {
    if (wallet.signer !== 'signer') {
      const rgp = await rigelToken();
      const walletBal = await rgp.balanceOf(wallet.address);
      await rgp.approve(SMART_SWAP.liquidityProviderTokensContractBNBRGP, walletBal, {
        from: wallet.address,
        gasLimit: 150000,
        gasPrice: ethers.utils.parseUnits('2', 'gwei'),
      });
    }
  };

  //............................................END LP FOR BNB-BUSD TOKENS .........................................

  // show max value
  const showMaxValue = async (earn, input) => {
    try {
      if (input === 'deposit') {
        if (earn === 'BUSD') {
          const busd = await BUSDToken();
          const walletBal = await busd.balanceOf(wallet.address);
          // alert('setting max value for busd');
          const busdBal = ethers.utils.formatUnits(walletBal);
          setDepositRGPBNBToken(busdBal);
          // depositRGPBNBToken
        } else if (earn === 'RGP') {
          const rgp = await rigelToken();
          const walletBal = await rgp.balanceOf(wallet.address);
          // depositRGPBNBToken
          // alert('setting max value for RGP');
          const rgpBal = ethers.utils.formatUnits(walletBal);
          setDepositRGPBNBToken(rgpBal);
        }
      } else if (input === 'unstake') {
        if (earn === 'BUSD') {
          const busd = await BUSDToken();
          const walletBal = await busd.balanceOf(wallet.address);
          // alert('setting max value for busd');
          const busdBal = ethers.utils.formatUnits(walletBal);
          setUnstakeRGPBNBToken(busdBal);
        } else if (earn === 'RGP') {
          const rgp = await rigelToken();
          const walletBal = await rgp.balanceOf(wallet.address);
          // alert('setting max value for RGP');
          const rgpBal = ethers.utils.formatUnits(walletBal);
          setUnstakeRGPBNBToken(rgpBal);
        }
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    }
  };


  const outPut = async () => {
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      // setStakeToken(stakedToken);
      const seeTotalStaked = await specialPool.totalStaking();
      // setStakeToken(seeTotalStaked);
      console.log('total staked token ', seeTotalStaked.toString());
    }
  };

  const open = () => {
    if (approveValue) {
      modal1Disclosure.onOpen();
    }
  };
  const close = () => {
    modal1Disclosure.onClose();
  };
  const closeModal = () => {
    modal2Disclosure.onClose();
  };
  const confirmDeposit = async (val) => {
    console.log(val)
    setDepositValue('Pending Confirmation');
    console.log(depositRGPBNBToken)

    try {
      if (wallet.signer !== 'signer') {
        if (val === "RGP") {
          await RGPuseStake(depositRGPBNBToken);
        } else if (val === "RGP-BNB") {
          await BNBRGPlpDeposit(depositRGPBNBToken)
        } else if (val === "BNB-BUSD") {
          await BNBBUSDlpDeposit(depositRGPBNBToken)
        } else if (val === "RGP-BUSD") {
          await RGPBUSDlpDeposit(depositRGPBNBToken)
        } else {
          await BNBRGPlpDeposit(depositRGPBNBToken)
        }
        setUnstakeButtonValue('confirmed')
        setTimeout(() => closeModal(), 400)
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    }
    setDeposit(true);
    setDepositValue('Confirmed')
    setTimeout(() => close(), 400)

  };
  const confirmUnstakeDeposit = async (val) => {
    setUnstakeButtonValue('Pending Confirmation');
    try {
      if (wallet.signer !== 'signer') {
        if (val === "RGP") {
          await RGPUnstake();
        } else if (val === "RGP-BNB") {
          await BNBRGPlpTokensWithdrawal()
        } else if (val === "BNB-BUSD") {
          await BNBBUSDlpTokensWithdrawal()
        } else if (val === "RGP-BUSD") {
          await RGPBUSDlpTokensWithdrawal()
        } else {
          await BNBRGPlpTokensWithdrawal()
        }
        setUnstakeButtonValue('confirmed')
        setTimeout(() => closeModal(), 400)
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    }

  };

  //checkingS for approval.
  const setApprove = (val) => {
    if (approveValue) {
      modal2Disclosure.onOpen();
    } else {
      checkUser(val);
    }
  };
  const checkUser = async (val) => {
    console.log("1234588");
    try {
      if (wallet.signer !== 'signer') {
        const rgp = await rigelToken();
        const checkAllow = await rgp.allowance(
          wallet.address,
          SMART_SWAP.specialPool,
        );
        if (Web3.utils.toWei(checkAllow.toString()) > 0) {

          if (val === "RGP-BNB") {
            await BNBRGPlpApproval()
            setApproveValue(true);
            setApproveButtonColor(false);
          } else if (val === "BNB-BUSD") {
            await BNBBUSDlpApproval()
            setApproveValue(true);
            setApproveButtonColor(false);
          } else if (val === "RGP-BUSD") {
            await RGPBUSDlpApproval()
            setApproveValue(true);
            setApproveButtonColor(false);
          }
        } else if (ethers.utils.formatEther(checkAllow).toString() == 0.0) {
          await RGPSpecialPoolApproval();
          setApproveValue(true);
          setApproveButtonColor(true);
        }
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    }
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
        <Box width="90%" marginRight="30px">
          <Flex>
            <Text fontSize="26px" marginRight="30px">
              {stakedToken}
            </Text>{' '}
            <Text color="gray.400" marginTop="34px">
              {' '}
              {content.earn} Tokens Staked
            </Text>
          </Flex>

          <Flex>
            <Button
              w="60%"
              h="50px"
              borderRadius="12px"
              bg={approveButtonColor ? '#444159' : 'rgba(64, 186,213, 0.1)'}
              color={approveButtonColor ? 'rgba(190, 190, 190, 1)' : '#40BAD5'}
              border="0"
              mb="4"
              mr="6"
              cursor="pointer"
              _hover={
                approveButtonColor
                  ? { color: 'white       ' }
                  : { color: '#423a85' }
              }
              onClick={() => setApprove(content.tokensStaked[0])}
            >
              {approveValue ? 'Stake' : 'Approve'}
            </Button>
            <Square
              size="40px"
              borderRadius="12px"
              color="white"
              cursor="pointer"
              marginTop="5px"
              bg="rgba(64, 186, 213, 0.1);"
            >
              <AddIcon onClick={open} disabled={!approveValue} />
            </Square>
          </Flex>
        </Box>
        <Divider orientation="vertical" colorScheme="yellow" />
        <Box width="100%">
          <Flex>
            <Text fontSize="26px" marginRight="30px">
              {content.RGPEarned}
            </Text>{' '}
            <Text color="gray.400" marginTop="34px">
              RGP Earned
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Button
              w="50%"
              h="50px"
              borderRadius="12px"
              bg="#444159"
              color="rgba(190, 190, 190, 1)"
              border="0"
              mb="4"
              mr="6"
              cursor="pointer"
              _hover={{ bg: '#444159' }}
            >
              Harvest
            </Button>
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
            <Circle size="20px" bg="#fff" marginTop="14px">
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
                value={depositRGPBNBToken}
                onChange={e => setDepositRGPBNBToken(e.target.value)}
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
                  onClick={() => showMaxValue(content.earn, 'deposit')}
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
                  depositValue === 'Confirm' || depositValue === 'Confirmed'
                    ? 'rgba(190, 190, 190, 1)'
                    : '#40BAD5'
                }
                width="100%"
                background={
                  depositValue === 'Confirm' || depositValue === 'Confirmed'
                    ? 'rgba(64, 186, 213, 0.15)'
                    : '#444159'
                }
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={
                  depositValue === 'Confirm' || depositValue === 'Confirmed'
                    ? { background: 'rgba(64, 186, 213, 0.15)' }
                    : { background: '#444159' }
                }
                onClick={() => confirmDeposit(content.tokensStaked[0])}
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
              {content.availableToken} {content.deposit} Staked
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
                value={unstakeRGPBNBToken}
                onChange={e => setUnstakeRGPBNBToken(e.target.value)}
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
                  onClick={() => showMaxValue(content.earn, 'unstake')}
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
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={
                  depositValue === 'Confirm' || depositValue === 'Confirmed'
                    ? { background: 'rgba(64, 186, 213, 0.15)' }
                    : { background: '#444159' }
                }
                onClick={() => confirmUnstakeDeposit(content.tokensStaked[0])}
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
export default ShowYieldFarmDetails;
