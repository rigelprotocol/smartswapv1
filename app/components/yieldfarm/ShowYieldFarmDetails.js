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
  useToast,
  Spinner,
  Link
} from '@chakra-ui/react';
import { AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import Web3 from 'web3';
import configureStore from 'configureStore';
import { connect } from 'react-redux';
import styles from '../../styles/yieldFarmdetails.css';
import { clearInputInfo } from '../../utils/UtilFunc';
import SpinModal from '../modal/SpinModal';
import {
  rigelToken,
  BUSDToken,
  RGPSpecialPool,
  masterChefContract,
  smartSwapLPTokenPoolOne,
  smartSwapLPTokenPoolTwo,
  smartSwapLPTokenPoolThree,
  erc20Token,
} from '../../utils/SwapConnect';
import { SMART_SWAP } from '../../utils/constants';
import { updateFarmAllowances } from '../../containers/FarmingPage/actions';
import { notify } from '../../containers/NoticeProvider/actions';

const ShowYieldFarmDetails = ({
  content,
  wallet,
  refreshTokenStaked,
  updateFarmAllowances,
  notify,
}) => {
  const [depositValue, setDepositValue] = useState('Confirm');
  const [deposit, setDeposit] = useState(false);
  const [unstakeButtonValue, setUnstakeButtonValue] = useState('Confirm');
  const [approveValueForRGP, setApproveValueForRGP] = useState(false);
  const [approveValueForOtherToken, setApproveValueForOtherToken] = useState(
    false,
  );
  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const [depositTokenValue, setDepositTokenValue] = useState('');
  const [inputHasError, setInputHasError] = useState(false);
  const [depositInputHasError, setDepositInputHasError] = useState(false);
  const [showLoadingApproval, setShowLoadingApproval] = useState(false);
  const [errorButtonText, setErrorButtonText] = useState('');
  const [depositErrorButtonText, setDepositErrorButtonText] = useState('');
  const [unstakeToken, setUnstakeToken] = useState('');
  const [stakedToken, setStakeToken] = useState('0.00');
  const [rewards, setRewards] = useState('0.000');
  const [isNewUser, setIsNewUser] = useState(true);
  const [allowanceApproval, setAllowanceApproval] = useState(false);
  const [isPoolRGP, setIsPoolRGP] = useState(false);
  const [spinModalTitle, setSpinModalTitle] = useState('Spin');
  const [spinModalText, setSpinModalText] = useState('Spin');
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [farmingFee, setFarmingFee] = useState(10);

  const toast = useToast();
  const addPrevBal = 'addPrevBal';
  const stakeId = 'stakeId';

  useEffect(() => {
    setDepositInputHasError(false);
    setDepositErrorButtonText('');
    if (depositTokenValue !== '') {
      if (
        isNaN(parseFloat(depositTokenValue)) ||
        !Math.sign(parseFloat(depositTokenValue)) ||
        Math.sign(parseFloat(depositTokenValue)) == -1
      ) {
        setDepositInputHasError(true);
        setDepositErrorButtonText('Invalid Input');
        return;
      }
      if (parseFloat(depositTokenValue) > parseFloat(content.availableToken)) {
        setDepositInputHasError(true);
        setDepositErrorButtonText('Insufficient Balance');
      }
    }
  }, [depositTokenValue]);

  //set farming fee based on network

  useEffect(() => {
    const RGPfarmingFee = async () => {
      if (wallet.signer !== 'signer') {
        const masterChef = await masterChefContract();
        const minFarmingFee = await masterChef.farmingFee();
        const fee = Web3.utils.fromWei(minFarmingFee.toString());
        setFarmingFee(fee);
      }
    };
    RGPfarmingFee();
  }, [wallet]);

  useEffect(() => {
    setInputHasError(false);
    setErrorButtonText('');
    if (unstakeToken !== '') {
      if (
        isNaN(parseFloat(unstakeToken)) ||
        !Math.sign(parseFloat(unstakeToken)) ||
        Math.sign(parseFloat(unstakeToken)) == -1
      ) {
        setInputHasError(true);
        setErrorButtonText('Invalid Input');
        return;
      }
      if (parseFloat(unstakeToken) > parseFloat(content.tokensStaked[1])) {
        setInputHasError(true);
        setErrorButtonText('Insufficient Balance');
      }
    }
  }, [unstakeToken]);

  useEffect(() => {
    const stakeSubscription = async () => {
      const specialPool = await RGPSpecialPool();
      if (wallet.address != '0x') {
        console.log(specialPool);
        const filter = specialPool.filters.Stake(wallet.address, null, null);
        specialPool.on(filter, (userAddress, stakedAmount, time) => {
          if (!toast.isActive(stakeId)) {
            toast({
              id: stakeId,
              title: 'RGP Staking Successful',
              description: `${ethers.utils.formatEther(
                stakedAmount,
              )} RGP has been successfully staked`,
              status: 'success',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
            });
          }
        });

        const unstakeFilter = specialPool.filters.UnStake(
          wallet.address,
          null,
          null,
        );
        specialPool.on(unstakeFilter, (userAddress, unStakedAmount, time) => {
          toast({
            title: 'RGP Unstaking Successful',
            description: `${ethers.utils.formatEther(
              unStakedAmount,
            )} RGP has been successfully unstaked`,
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        });

        const withdrawRewardFilter = specialPool.filters.withdrawReward(
          null,
          null,
          wallet.address,
          null,
        );
        specialPool.on(withdrawRewardFilter, (tokenAmount, from, to, time) => {
          toast({
            title: 'RGP harvest Successful',
            description: `${ethers.utils.formatEther(
              tokenAmount,
            )} RGP has been sent to your address`,
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        });

        const addPreviousRewardToUserBal = specialPool.filters.addPreviousRewardToUserBal(
          null,
          null,
          wallet.address,
          null,
        );
        specialPool.on(
          addPreviousRewardToUserBal,
          (tokenAmount, from, to, time) => {
            if (
              !toast.isActive(addPrevBal) &&
              ethers.utils.formatEther(tokenAmount) != '0.0'
            ) {
              toast({
                id: addPrevBal,
                title: 'Earned RGP added to deposit',
                description: `${ethers.utils.formatEther(
                  tokenAmount,
                )} earned RGP has been added to your deposit`,
                status: 'success',
                position: 'top-right',
                duration: 9000,
                isClosable: true,
              });
            }
          },
        );
      }
      return () => {
        specialPool.off();
      };
    };
    return stakeSubscription();
  }, [wallet.address]);

  const tokenBalance = async () => {
    try {
      if (wallet.address != '0x') {
        const token = await rigelToken();
        const balance = await token.balanceOf(wallet.address);
        return ethers.utils.formatEther(balance);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllowances = async () => {
    try {
      const [rigel, pool1, pool2, pool3] = await Promise.all([
        rigelToken(),
        smartSwapLPTokenPoolOne(),
        smartSwapLPTokenPoolTwo(),
        smartSwapLPTokenPoolThree(),
      ]);
      if (wallet.address != '0x') {
        const [
          pool1Allowance,
          pool2Allowance,
          pool3Allowance,
        ] = await Promise.all([
          allowance(pool1),
          allowance(pool2),
          allowance(pool3),
        ]);
        let rigelAllowance;
        if (SMART_SWAP.specialPool) {
          rigelAllowance = await rigel.allowance(
            wallet.address,
            SMART_SWAP.specialPool,
          );
        } else {
          rigelAllowance = pool1Allowance;
        }

        updateFarmAllowances([
          rigelAllowance,
          pool2Allowance,
          pool1Allowance,
          pool3Allowance,
        ]);
      }
    } catch (error) {
      console.error(error, 'something went wrong');
    }
  };

  const allowance = contract =>
    contract.allowance(wallet.address, SMART_SWAP.masterChef);
  useEffect(() => {
    getAllowances();
  }, []);

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

    const contractAllowance = async contract => {
      if (wallet.signer !== 'signer') {
        const rgpApproval = await contract.allowance(
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
          setShowLoadingApproval(true)
          const poolTwo = await smartSwapLPTokenPoolTwo();
          const approvalForRGPBNB = await contractAllowance(poolTwo);
          const rgpApproval1 = await rgpAllowancePool();
          changeApprovalButton(approvalForRGPBNB, rgpApproval1);
          setShowLoadingApproval(false)
        } else if (content.deposit === 'RGP-BUSD') {
          setShowLoadingApproval(true)
          const poolOne = await smartSwapLPTokenPoolOne();
          const approvalForRGPBUSD = await contractAllowance(poolOne);
          const rgpApproval2 = await rgpAllowancePool();
          changeApprovalButton(approvalForRGPBUSD, rgpApproval2);
          setShowLoadingApproval(false)
        } else if (content.deposit === 'BNB-BUSD') {
          setShowLoadingApproval(true)
          const poolThree = await smartSwapLPTokenPoolThree();
          const approvalForBNBBUSD = await contractAllowance(poolThree);
          const rgpApproval3 = await rgpAllowancePool();
          changeApprovalButton(approvalForBNBBUSD, rgpApproval3);
          setShowLoadingApproval(false)
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
      refreshTokenStaked();
    }
  };

  const RGPApproval = async () => {
    if (wallet.signer !== 'signer') {
      try {
        const rgp = await rigelToken();
        const walletBal = (await rgp.balanceOf(wallet.address)) + 400e18;
        setApprovalLoading(true);
        const data = await rgp.approve(SMART_SWAP.masterChef, walletBal, {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        });

        const { confirmations, status } = await fetchTransactionData(data);
        getAllowances();
        setApprovalToTrue(confirmations,status,"rgp")
      } catch (error) {

        setApproveValueForRGP(false)
        console.error(error);
      } finally {
        setApprovalLoading(false);
      }
    }
  };
  const setApprovalToTrue =(confirmations,status,approval) =>{
    if(confirmations >= 1 && status){
      if(approval === "rgp"){
        setApproveValueForRGP(true)
      }else if(approval=== "LP"){
        setApproveValueForOtherToken(true)
      }
    }else{
        setApproveValueForOtherToken(false)
        setApproveValueForRGP(false)
    }
  }
  // .......................................... START SPECAIL POOL CALLS..........................................
  const RGPuseStake = async depositToken => {
    if (wallet.signer !== 'signer') {
      const specialPool = await RGPSpecialPool();
      const data = await specialPool.stake(
        ethers.utils.parseEther(depositTokenValue.toString(), 'ether'),
        {
          from: wallet.address,
          gasLimit: 200000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        },
      );
      const { confirmations, status } = await fetchTransactionData(data);
      callRefreshFarm(confirmations, status);
    }
  };

  // withdrawal of funds
  const RGPUnstake = async () => {
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
      try {
        const rgp = await rigelToken();
        const walletBal = (await rgp.balanceOf(wallet.address)) + 400e18;
        setApprovalLoading(true);
        const data = await rgp.approve(SMART_SWAP.specialPool, walletBal, {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        });

        const { confirmations, status } = await fetchTransactionData(data);
        getAllowances();
      } catch (error) {
        console.error(error);
      } finally {
        setApprovalLoading(false);
      }
    }
  };

  // ........................................ END SPECIAL POOL..................................

  // .......................................... START LP FOR BNB-RGP TOKENS ...............................


  const approveLPToken = async LPToken => {
    switch (LPToken) {
      case 'RGP-BUSD':
        const poolOne = await smartSwapLPTokenPoolOne();
        LPApproval(poolOne);
        break;
      case 'RGP-BNB':
        const slpTwo = await smartSwapLPTokenPoolTwo();
        LPApproval(slpTwo);
        break;
      case 'BNB-BUSD':
        const poolThree = await smartSwapLPTokenPoolThree();
        LPApproval(poolThree);
        break;
      default:
        RGPApproval();
        break;
    }
  };

  const enoughApproval = (allowance, balance) => {
    if (allowance && balance) {
      return allowance.gt(ethers.utils.parseEther(balance));
    }
    return true;
  };

  const approvalButton = LPToken => (
    <Button
      my="2"
      mx="auto"
      color="rgba(190, 190, 190, 1)"
      width="100%"
      background="rgba(64, 186, 213, 0.15)"
      cursor="pointer"
      border="none"
      borderRadius="13px"
      padding="10px"
      height="50px"
      fontSize="16px"
      _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
      onClick={() => approveLPToken(LPToken)}
    >
      {approvalLoading ? 'Approving...' : 'Approve'} {LPToken}
    </Button>
  );


  // ............................................END LP FOR BNB-RGP TOKENS .........................................

  // .......................................... START LP FOR RGP-BUSD TOKENS ...............................
  // deposit for the Liquidity Provider tokens for all pools
  const LPDeposit = async () => {
    if (wallet.signer !== 'signer') {
      const balance = await tokenBalance();
      if (parseFloat(content.tokensStaked[1]) == 0) {
        if (balance < farmingFee) {
          notify({
            title: 'Insufficient Balance',
            body: `Insufficient RGP, you need at least ${farmingFee} RGP to enter this pool`,
            type: 'error',
          });
        } else {
          const lpTokens = await masterChefContract();
          const data = await lpTokens.deposit(
            content.pId,
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
      } else {
        const lpTokens = await masterChefContract();
        const data = await lpTokens.deposit(
          content.pId,
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
    }
  };
  const LPTokensWithdrawal = async () => {
    if (wallet.signer !== 'signer') {
      const lpTokens = await masterChefContract();
      const data = await lpTokens.withdraw(
        content.pId,
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
   const LPApproval = async contract => {
    if (wallet.signer !== 'signer') {
      try {
        const walletBal = (await contract.balanceOf(wallet.address)) + 400e18;
        setApprovalLoading(true);
        const data = await contract.approve(SMART_SWAP.masterChef, walletBal, {
          from: wallet.address,
          gasLimit: 150000,
          gasPrice: ethers.utils.parseUnits('20', 'gwei'),
        });

        const { confirmations, status } = await fetchTransactionData(data);
        getAllowances();
        setApprovalToTrue(confirmations,status,"LP")
      } catch (error) {
        console.error(error);
        setApproveValueForOtherToken(false)
      } finally {
        setApprovalLoading(false);
      }
    }
  };


  // ............................................END LP FOR RGP-BUSD TOKENS ........................................
  // ............................................END LP FOR BNB-BUSD TOKENS .........................................
  const harvest = async pId => {
    openSpinModal('Harvest Pending...', `Harvest ${depositTokenValue}`);
    if (wallet.signer !== 'signer') {
      try {
        if (pId === 0) {
          const specialPool = await RGPSpecialPool();
          const specialWithdraw = await specialPool.unStake(0);
          const { confirmations, status } = await fetchTransactionData(
            specialWithdraw,
          );
          callRefreshFarm(confirmations, status);
        } else {
          const lpTokens = await masterChefContract();
          const withdraw = await lpTokens.withdraw(pId, 0);
          const { confirmations, status } = await fetchTransactionData(
            withdraw,
          );
          callRefreshFarm(confirmations, status);
        }
      } catch (error) {
        console.log(error);
      } finally {
        closeSpinModal();
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
  const openSpinModal = (title, text) => {
    setSpinModalText(text);
    setSpinModalTitle(title);
    onOpenModal();
  };
  const closeSpinModal = (title, text) => {
    onCloseModal();
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
    openSpinModal('Staking...', `Staking ${depositTokenValue} ${val}`);
    try {
      if (wallet.signer !== 'signer') {
        if (val === 'RGP') {
          await RGPuseStake(depositTokenValue);
        } else {
          await LPDeposit();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      closeSpinModal();
      setTimeout(() => close(), 400);
      setDeposit(true);
      clearInputInfo(setDepositTokenValue, setDepositValue, 'Confirm');
    }
  };
  const confirmUnstakeDeposit = async val => {
    setUnstakeButtonValue('Pending Confirmation');
    openSpinModal('Unstaking...', `Unstaking ${unstakeToken} ${val}`);
    try {
      if (wallet.signer !== 'signer') {
        if (val === 'RGP') {
          await RGPUnstake();
        } else {
          await LPTokensWithdrawal()
        }
      }
    } catch (e) {
      console.log(
        'sorry there is a few error, you are most likely not logged in. Please login to ypur metamask extensition and try again.',
      );
    } finally {
      closeSpinModal();
      setTimeout(() => closeModal(), 400);
      clearInputInfo(setUnstakeToken, setUnstakeButtonValue, 'Confirm');
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
        const slpTwo = await smartSwapLPTokenPoolTwo();
        if (!approveValueForOtherToken && !approveValueForRGP) {
          await RGPApproval();
          await LPApproval(slpTwo);
        } else if (!approveValueForRGP) {
          await RGPApproval();
        } else {
          await LPApproval(slpTwo);
        }
        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
      } else if (val === 'BNB-BUSD') {
        const poolThree = await smartSwapLPTokenPoolThree();
        if (!approveValueForOtherToken && !approveValueForRGP) {
          await RGPApproval();
          await LPApproval(poolThree);
        } else if (!approveValueForRGP) {
          await RGPApproval();
        } else {
          await LPApproval(poolThree);
        }
        setApproveValueForOtherToken(true);
        setApproveValueForRGP(true);
      } else if (val === 'RGP-BUSD') {
        const poolOne = await smartSwapLPTokenPoolOne();
        if (!approveValueForOtherToken && !approveValueForRGP) {
          await RGPApproval();
          await LPApproval(poolOne);
        } else if (!approveValueForRGP) {
          await RGPApproval();
        } else {
          await LPApproval(poolOne);
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
                approveValueForRGP &&
                approveValueForOtherToken &&
                content.tokensStaked[1] <= 0
                  ? '#444159'
                  : 'rgba(64, 186,213, 0.1)'
              }
              color={
                approveValueForRGP &&
                approveValueForOtherToken &&
                content.tokensStaked[1] <= 0
                  ? 'rgba(190, 190, 190, 1)'
                  : '#40BAD5'
              }
              border="0"
              mb="4"
              mr="6"
              cursor="pointer"
              _hover={
                approveValueForRGP && approveValueForOtherToken
                  ? { color: 'white' }
                  : { color: '#423a85' }
              }
              onClick={() => setApprove(content.deposit)}
            >
              {showLoadingApproval || approvalLoading ? <Spinner speed="0.65s" color="blue.500" /> :
               approveValueForRGP && approveValueForOtherToken
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

            <Text color="gray.400" marginTop="25px">
             - RGP Earned
            </Text>{' '} <Link textDecoration="underline" isExternal href='https://medium.com/rigelprotocol/rigel-protocol-yield-farming-v2-launching-soon-7c73a1f2c671'  fontSize="13px" marginRight="5px" marginTop="28px">
            {
              content.RGPEarned === "" ?
              <Spinner speed="0.65s" color="blue.500" /> : ` (${content.RGPEarned})`
              }
            </Link>
          </Flex>
          <Button
            w="100%"
            h="50px"
            borderRadius="12px"
            bg={content.RGPEarned <= 0 ? '#444159' : 'rgba(64, 186,213, 0.1)'}
            color={
              content.RGPEarned <= 0 ? 'rgba(190, 190, 190, 1)' : '#40BAD5'
            }
            border="0"
            mb="4"
            mr="6"
            cursor="pointer"
            _hover={{ color: 'white' }}
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
      <Modal isOpen={modal1Disclosure.isOpen} onClose={close} isCentered>
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
                placeholder="0"
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
              {depositInputHasError ? (
                <>
                  {/* Show Error Button */}
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
                    onClick={() => {}}
                  >
                    {depositErrorButtonText}
                  </Button>
                </>
              ) : (
                <>
                  {enoughApproval(
                    content.poolAllowance,
                    content.availableToken,
                  ) ? (
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
                  ) : (
                    approvalButton(content.deposit)
                  )}
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
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={modal2Disclosure.isOpen} onClose={closeModal} isCentered>
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
              {/* Work here */}
            </Text>
            <InputGroup size="md">
              <Input
                type="text"
                color="#fff"
                placeholder="0"
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
              {inputHasError ? (
                <>
                  {/* Show Error Button */}
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
                    onClick={() => {}}
                  >
                    {errorButtonText}
                  </Button>
                </>
              ) : (
                <>
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
                </>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SpinModal
        isOpenModal={isOpenModal}
        onCloseModal={onCloseModal}
        title={spinModalTitle}
      >
        <Box textAlign="center" mt={3} mb={8}>
          {spinModalText}
        </Box>
      </SpinModal>
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
    updateFarmAllowances,
    notify,
  },
)(ShowYieldFarmDetails);
