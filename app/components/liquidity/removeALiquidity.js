import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import styles from "../../styles/slider.css"
import {
  Text,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Circle,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalBody,
  useToast
} from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { router, LPTokenContract,SmartFactory } from 'utils/SwapConnect';
import PropTypes from 'prop-types';
import { SettingsIcon, CheckIcon } from '@chakra-ui/icons';
import BNBImage from '../../assets/bnb.svg';
import NullImage from '../../assets/Null-24.svg';
import RGPImage from '../../assets/rgp.svg';
import ETHImage from '../../assets/eth.svg';
import BUSDImage from '../../assets/busd.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { useLocalStorage } from '../../utils/hooks/storageHooks'
import { getDeadline } from '../../utils/UtilFunc';


const removeALiquidity = ({
  back,
  wallet,
  approving,
  setPercentValue,
  removingLiquidity,
  removeLiquidityForETH,
  liquidityToRemove,
  hasApprovedLPTokens,
  approveSmartSwapLPTokens,
  closeApproveSmartSwapLPTokensSuccessModal,
  approveSmartSwapLPTokensDisclosure,
}) => {
  const [fromValue, setFromValue] = useState(0);
  const [simpleRemoveLiquidityPool, setSimpleRemoveLiquidityPool] = useState(true);
  const [toValue, setToValue] = useState(0);
  const [userSelectedPositionValue, setUserSelectedPositionValue] = useState("");
  const [tokenZeroAmount, setTokenZeroAmount] = useState("");
  const [tokenOneAmount, setTokenOneAmount] = useState("");
  const [above100Percent, setAbove100Percent] = useState(false);
  const [determineInputChange, setDetermineInputChange] = useState("");
  const [deadline, setDeadline] = useLocalStorage('deadline', 20)
  const [selectedValue, setSelectedValue] = useState(0);
  const [liquidityPairRatio, setLiquidityPairRatio] = useState(0);
  useEffect(() => {
    getLiquidityPairRatio()
    const getPriceForToken = async path => {
      if (wallet.signer !== 'signer') {
        const rout = await router();
        const fromPath = ethers.utils.getAddress(
          liquidityToRemove.path[0].fromPath,
        );
        const toPath = ethers.utils.getAddress(
          liquidityToRemove.path[1].toPath,
        );
        const valueToCheck = 1;
        const checkPriceOfOne = Web3.utils.toWei(valueToCheck.toString());
        const getValue = await rout.getAmountsOut(checkPriceOfOne, [
          fromPath,
          toPath,
        ]);
        const getToken2Value = await rout.getAmountsOut(checkPriceOfOne, [
          toPath,
          fromPath,
        ]);
        console.log(
          'currrent price  of ',
          fromPath,
          'to ',
          toPath,
          'is:',
          getValue.toString(),
          getToken2Value.toString(),
        );
        const value1 = Web3.utils.fromWei(getValue.toString().split(',')[1]);
        const value2 = Web3.utils.fromWei(
          getToken2Value.toString().split(',')[1],
        );
        setFromValue(value1);
        setToValue(value2);
      }
    };
    getPriceForToken(liquidityToRemove.path);
  }, []);
  useEffect(()=>{
    if(determineInputChange==="zero"){
       setTheValueForTokenOne()
    }else if(determineInputChange==="one"){
      setTheValueForTokenZero()
    }else if(determineInputChange==="position"){
      setTheValueForTokenOneAndTokenTwo()
    }else if(determineInputChange==="slider"){
    setInputZeroAndOne()
    }
  },[tokenZeroAmount,userSelectedPositionValue,tokenOneAmount,determineInputChange,selectedValue])
  useEffect(()=>{
if(selectedValue>100){
  setAbove100Percent(true)
}else{
  setAbove100Percent(false)
}
  },[selectedValue])

  const inputSlider = (e) =>{
    setSelectedValue(e.target.value)
      }
  const getLiquidityPairRatio = async () => {
    try {
      const factory = await SmartFactory();
      const fromPath = ethers.utils.getAddress(liquidityToRemove.path[0].fromPath);
      const toPath = ethers.utils.getAddress(liquidityToRemove.path[1].toPath);
      const LPAddress = liquidityToRemove.pairAddress
      const LPcontract = await LPTokenContract(LPAddress)

      const [tokenAReserve, tokenBreserve] = await LPcontract.getReserves()
      const token0 = await LPcontract.token0();
      let liquidityRatio;
      if (token0.toString() == fromPath.toString()) {
        liquidityRatio = tokenBreserve.toString() / tokenAReserve.toString();
      } else {
        liquidityRatio = tokenAReserve.toString() / tokenBreserve.toString();
      }
      setLiquidityPairRatio(liquidityRatio);
    } catch (error) {
      console.error(error)
    }

  }

  const setInputZeroAndOne = () =>{
    let inputZero = liquidityToRemove.pooledToken0 * (selectedValue / 100)
    let inputOne = liquidityToRemove.pooledToken1 * (selectedValue / 100)
    let calculatedValue =  liquidityToRemove.poolToken * (selectedValue / 100)
    setUserSelectedPositionValue(calculatedValue)
    setTokenOneAmount(inputOne)
    setTokenZeroAmount(inputZero)
  }
  const setTheValueForTokenOne =() => {
    let percent = PercentValue("one")
    userPositionValue(percent)
    setTokenOneAmount(liquidityToRemove.pooledToken1 * (percent / 100))
    if(percent===100){
      setTokenZeroAmount(liquidityToRemove.pooledToken0 * (percent / 100))
    }
  }
  const setTheValueForTokenZero =() => {
    let percent = PercentValue("zero")
    userPositionValue(percent)
    setTokenZeroAmount(liquidityToRemove.pooledToken0 * (percent / 100))
    if(percent===100){
      setTokenOneAmount(liquidityToRemove.pooledToken1 * (percent / 100))
    }
  }
  const PercentValue = (val) =>{
    let calculatedValue
    if(val==="zero"){
      calculatedValue = Math.floor((100 * tokenOneAmount) / liquidityToRemove.pooledToken1)
    }else{
      calculatedValue = Math.floor((100 * tokenZeroAmount) / liquidityToRemove.pooledToken0)
    }
    if(calculatedValue>100){
      setSelectedValue(100)
      calculatedValue= 100
    }else{
      setSelectedValue(calculatedValue)
    }

    return calculatedValue
  }
  const userPositionValue = (percent) => {
    let calculatedValue =  liquidityToRemove.poolToken * (percent / 100)
    setUserSelectedPositionValue(calculatedValue)
  }
  const removeThisLiquidity = async () => {
    if(selectedValue<=100){
const smartSwapLP = await LPTokenContract(liquidityToRemove.pairAddress);
    const walletBal = await smartSwapLP.balanceOf(wallet.address);
    const liquidityAmount = ethers.utils.formatEther(
      walletBal.mul(selectedValue).div(100),
    );

    if (liquidityToRemove.path[0].token === 'WBNB') {
      return removeLiquidityForETH(
        liquidityToRemove.path[1].toPath,
        liquidityAmount,
      );
    }

    if (liquidityToRemove.path[1].token === 'WBNB') {
      return removeLiquidityForETH(
        liquidityToRemove.path[0].fromPath,
        liquidityAmount,
      );
    }

    removingLiquidity(
      liquidityAmount,
      liquidityToRemove.path[0].fromPath,
      liquidityToRemove.path[1].toPath,
    );
    }else{
      alert("error")

    }

  };
  const sliderValues = [0, 25, 50, 75, 100];
  const selectedButton = val => {
    setDetermineInputChange("slider")
    setSelectedValue(val);
    setPercentValue(val);
  };
  const removeMaxAmount = () =>{
    setSelectedValue(100);

    setUserSelectedPositionValue(liquidityToRemove.poolToken)
    setTokenZeroAmount(liquidityToRemove.pooledToken0)
    setTokenOneAmount(liquidityToRemove.pooledToken1)
  }
  const setTheValueForTokenOneAndTokenTwo =()=>{
   if(userSelectedPositionValue<= liquidityToRemove.poolToken){
    let calculatedValue =  Math.floor((100 * userSelectedPositionValue) / liquidityToRemove.poolToken)
    setSelectedValue(calculatedValue)
    setTokenZeroAmount(liquidityToRemove.pooledToken0 * (calculatedValue / 100) )
    setTokenOneAmount(liquidityToRemove.pooledToken1 * (calculatedValue / 100) )
   }
  }
  const deleteLiquidity = () => {
    back('INDEX');
  };
  const toggleViewOfRemoveLiquidity =() =>{
    setSimpleRemoveLiquidityPool(!simpleRemoveLiquidityPool)
  }

  return (
    <>
      <Box
        mx={5}
        color="white"
        minHeight="70vh"
        w={['100%', '100%', '29.50%', '29.5%']}
        rounded="lg"
        mb={4}
        py={6}
        px={4}
        background="#120136"
      >
        <Flex justifyContent="space-between">
          <ArrowLeft cursor="pointer" onClick={() => back('INDEX')} />
          <Text mt="0px">Remove Liquidity</Text>
          <SettingsIcon />
        </Flex>
        <Box bgColor="#191D4E" color="#787FD4" rounded="lg" p={4} my={6}>
          Tip: Removing pool tokens converts your positions back to underlying
          tokens at the current rate, proportional to your share of the pool.
          Accrued fees are included in the amount you receive.
        </Box>
        <Box
          bgColor="#120136"
          border="0.5px solid #191D4E"
          rounded="lg"
          p={4}
          my={6}
        >
          <Flex justifyContent="space-between">
            <Text mt="0px">Amount</Text>
            <Text mt="0px" color="#9869FC" onClick={toggleViewOfRemoveLiquidity}
            cursor="pointer">
              {simpleRemoveLiquidityPool ? "Detailed" : "Simple"}
            </Text>
          </Flex>
          <Heading as="h2" size="3xl">
            {selectedValue}%
          </Heading>
          {simpleRemoveLiquidityPool &&
        <Box>
         <div className={styles.range}>
   <div className={styles.field}>
    <div className={`${styles.value} ${styles.left}`}>
      0
      </div>
   <input
   type="range"
   min="0"
   max="100"
   value={selectedValue}
   steps="1"
   onChange={(e)=>inputSlider(e)}
   />
   <div className={`${styles.value} ${styles.right}`}>
     100
     </div>
 </div>

 </div>
          <Flex justifyContent="space-between" my="4">
            {sliderValues.splice(1).map((val, index) => (
              <Button
                bgColor={selectedValue === val ? '#3841AE' : '#191D4E'}
                rounded="lg"
                width="74px"
                height="37px"
                color={selectedValue === val ? 'white' : '#787FD4'}
                border="0"
                cursor="pointer"
                onClick={() => selectedButton(val)}
                key={index}
              >
                {val}
              </Button>
            ))}
          </Flex>
        </Box>
          }
          {!simpleRemoveLiquidityPool &&
        <Box>
           <Flex justifyContent="space-between">
           <InputGroup size="md">
          <Input
            type="number"
            id="input__field"
            placeholder="0.0"
            border="1px solid rgba(255, 255, 255,0.25)"
            fontSize="lg"
            color="rgb(255, 255, 255)"
            value={userSelectedPositionValue}
            onChange={e => {
              setDetermineInputChange("position")
              setUserSelectedPositionValue(e.target.value)
            }}
          />
          <InputRightElement marginRight="5px">
              <Text
              cursor="pointer"
              color="rgba(64, 186, 213, 1)"
              onClick={()=>removeMaxAmount()}>
                max
              </Text>
          </InputRightElement>
          </InputGroup>
          <Flex alignItems="center">
            <Menu>
              <Button
                color="rgba(64, 186, 213, 1)"
                border="none"
                borderRadius="6px"
                fontSize="15px"
                bg="rgba(53, 44, 129, 0.3)"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                marginBottom="5px"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
              >
                 {liquidityToRemove.path[0].token} : {liquidityToRemove.path[1].token}
              </Button>
            </Menu>
          </Flex>
        </Flex>

         </Box>
          }
          </Box>
        <Flex justifyContent="center">
          <ArrowDown />
        </Flex>

        <Box
          bgColor="#120136"
          border="0.5px solid #191D4E"
          rounded="lg"
          p={4}
          my={6}
        >
          {simpleRemoveLiquidityPool ?     <Box>
            <Flex justifyContent="space-between">
              <Text>
                {simpleRemoveLiquidityPool ? liquidityToRemove.pooledToken0 * (selectedValue / 100): tokenZeroAmount}
              </Text>
              <Text>
                {liquidityToRemove.path[0].token === 'RGP' ? (
                  <RGPImage />
                ) : liquidityToRemove.path[0].token === 'BUSD' ? (
                  <BUSDImage />
                ) : liquidityToRemove.path[0].token === 'ETH' ? (
                  <ETHImage />
                ) : (
                  <NullImage />
                )}
                {liquidityToRemove.path[0].token == 'WBNB'
                  ? 'BNB'
                  : liquidityToRemove.path[0].token}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text>
                {simpleRemoveLiquidityPool ? liquidityToRemove.pooledToken1 * (selectedValue / 100) : tokenOneAmount}
              </Text>
              <Text>
                {liquidityToRemove.path[1].token === 'RGP' ? (
                  <RGPImage />
                ) : liquidityToRemove.path[1].token === 'BUSD' ? (
                  <BUSDImage />
                ) : liquidityToRemove.path[1].token === 'ETH' ? (
                  <ETHImage />
                ) : (
                  <NullImage />
                )}
                {liquidityToRemove.path[1].token == 'WBNB'
                  ? 'BNB'
                  : liquidityToRemove.path[1].token}
              </Text>
            </Flex>
          </Box> :
          <Box>
        <Flex justifyContent="space-between" my="2">
          <Input
            type="number"
            id="input__field"
            placeholder="0.0"
            border="1px solid rgba(255, 255, 255,0.25)"
            fontSize="lg"
            color="rgb(255, 255, 255)"
            value={tokenZeroAmount}
                onChange={e => {
                  setDetermineInputChange("zero")
                  setTokenZeroAmount(e.target.value)}
                }
          />
          <Flex alignItems="center">
            <Menu>
              <Button
                color="rgba(64, 186, 213, 1)"
                border="none"
                borderRadius="6px"
                fontSize="15px"
                bg="rgba(53, 44, 129, 0.3)"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                marginBottom="5px"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
              >
                 {liquidityToRemove.path[0].token === 'RGP' ? (
                  <RGPImage mr={1}/>
                ) : liquidityToRemove.path[0].token === 'BUSD' ? (
                  <BUSDImage mr={1}/>
                ) : liquidityToRemove.path[0].token === 'ETH' ? (
                  <ETHImage mr={1}/>
                ) : (
                  <NullImage mr={1}/>
                )}
                 {liquidityToRemove.path[0].token}
              </Button>
            </Menu>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" my="2">
          <Input
            type="number"
            id="input__field"
            placeholder="0.0"
            border="1px solid rgba(255, 255, 255,0.25)"
            fontSize="lg"
            color="rgb(255, 255, 255)"
            value={tokenOneAmount}
                onChange={e => {
                  setDetermineInputChange("one")
                  setTokenOneAmount(e.target.value)}
                }
          />
          <Flex alignItems="center">
            <Menu>
              <Button
                color="rgba(64, 186, 213, 1)"
                border="none"
                borderRadius="6px"
                fontSize="15px"
                bg="rgba(53, 44, 129, 0.3)"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                marginBottom="5px"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
              >
                 {liquidityToRemove.path[1].token === 'RGP' ? (
                  <RGPImage mr={1}/>
                ) : liquidityToRemove.path[1].token === 'BUSD' ? (
                  <BUSDImage mr={1}/>
                ) : liquidityToRemove.path[1].token === 'ETH' ? (
                  <ETHImage mr={1}/>
                ) : (
                  <NullImage mr={1}/>
                )}
                 {liquidityToRemove.path[1].token}
              </Button>
            </Menu>
          </Flex>
        </Flex>
         </Box>

          }

          <Text textAlign="right" color="#9869FC">
            Recieve RGP
          </Text>
        </Box>
        <Flex justifyContent="space-between">
          <Text>Price:</Text>
          <Box>
            <Text>
              1{' '}
              {liquidityToRemove.path[0].token === 'WBNB'
                ? 'BNB'
                : liquidityToRemove.path[0].token}{' '}
              : {fromValue}{' '}
              {liquidityToRemove.path[1].token === 'WBNB'
                ? 'BNB'
                : liquidityToRemove.path[1].token}
            </Text>
            <Text>
              1{' '}
              {liquidityToRemove.path[1].token === 'WBNB'
                ? 'BNB'
                : liquidityToRemove.path[1].token}{' '}
              : {toValue}{' '}
              {liquidityToRemove.path[0].token === 'WBNB'
                ? 'BNB'
                : liquidityToRemove.path[0].token}
            </Text>
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          {!hasApprovedLPTokens ? (
            <Button
              rounded="lg"
              color="white"
              bgColor="#3841AE"
              border="0"
              width="100%"
              mr="2"
              height="56px"
              cursor="pointer"
              _hover={{ background: '#3801AE' }}
              disabled={approving || above100Percent}
              onClick={() =>
                approveSmartSwapLPTokens(liquidityToRemove.pairAddress)
              }
            >
              {approving ? 'Approving...' : 'Approve'}
            </Button>
          ) : (
            <Button
              color="#A8B3BD"
              bgColor="#52606D"
              rounded="lg"
              width="100%"
              border="0"
              height="56px"
              disabled={approving}
              _hover={{ background: '#52616D' }}
              cursor="pointer"
              onClick={removeThisLiquidity}
            >
              {approving ? 'Removing Liquidity...' : 'Remove'}
            </Button>
          )}
        </Flex>
      </Box>
      <Modal
        isOpen={approveSmartSwapLPTokensDisclosure.isOpen}
        onClose={closeApproveSmartSwapLPTokensSuccessModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={closeApproveSmartSwapLPTokensSuccessModal}
          />
          <ModalBody align="center" my={2}>
            <Circle size="70px" background="#68C18A" my={3}>
              <CheckIcon fontSize="40px" />
            </Circle>
            <Text fontSize="18px" fontWeight="normal">
              Approval Successful
            </Text>
            <Box textAlign="center" mt={3} mb={8}>
              The liquidity tokens have been approved
            </Box>
            <Button
              width="100%"
              rounded="2xl"
              border="0"
              py={6}
              mt={3}
              background="rgba(64, 186, 213, 0.1)"
              color="rgba(64, 186, 213, 1)"
              cursor="pointer"
              onClick={closeApproveSmartSwapLPTokensSuccessModal}
            >
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box
        mx={5}
        color="white"
        w={['100%', '100%', '29.50%', '29.5%']}
        rounded="lg"
        mb={4}
        py={6}
        px={4}
        background="#52606D"
      >
        <Text>Your position</Text>
        <Box>
          <Flex justifyContent="space-between">
            <Flex>
              {liquidityToRemove.path[0].token === 'RGP' ? (
                <RGPImage />
              ) : liquidityToRemove.path[0].token === 'BUSD' ? (
                <BUSDImage />
              ) : liquidityToRemove.path[0].token === 'ETH' ? (
                <ETHImage />
              ) : (
                <NullImage />
              )}
              {liquidityToRemove.path[1].token === 'RGP' ? (
                <RGPImage />
              ) : liquidityToRemove.path[1].token === 'BUSD' ? (
                <BUSDImage />
              ) : liquidityToRemove.path[1].token === 'ETH' ? (
                <ETHImage />
              ) : (
                <NullImage />
              )}
              <Text marginTop="0" marginLeft="7px">
                {liquidityToRemove.path[0].token == 'WBNB'
                  ? 'BNB'
                  : liquidityToRemove.path[0].token}{' '}
                /{' '}
                {liquidityToRemove.path[1].token == 'WBNB'
                  ? 'BNB'
                  : liquidityToRemove.path[1].token}
              </Text>
            </Flex>
            <Text marginTop="0">{liquidityToRemove.poolToken}</Text>
          </Flex>
          <Flex justifyContent="space-between" marginTop="-10px">
            <Text>Your pool share</Text>
            <Text>{liquidityToRemove.poolShare}</Text>
          </Flex>
          <Flex justifyContent="space-between" marginTop="-10px">
            <Text>
              {liquidityToRemove.path[0].token === 'WBNB'
                ? 'BNB'
                : liquidityToRemove.path[0].token}
            </Text>
            <Text>{liquidityToRemove.pooledToken0}</Text>
          </Flex>
          <Flex justifyContent="space-between" marginTop="-10px">
            <Text>
              {liquidityToRemove.path[1].token === 'WBNB'
                ? 'BNB'
                : liquidityToRemove.path[1].token}
            </Text>
            <Text>{liquidityToRemove.pooledToken1}</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

removeALiquidity.propTypes = {
  wallet: PropTypes.object,
  approving: PropTypes.bool,
  back: PropTypes.func.isRequired,
  setPercentValue: PropTypes.func,
  hasApprovedLPTokens: PropTypes.bool,
  removingLiquidity: PropTypes.func.isRequired,
  liquidityToRemove: PropTypes.object.isRequired,
  approveSmartSwapLPTokens: PropTypes.func.isRequired,
  closeApproveSmartSwapLPTokensSuccessModal: PropTypes.func.isRequired,
  approveSmartSwapLPTokensDisclosure: PropTypes.object,
};
export default removeALiquidity;
