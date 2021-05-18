import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import {
  Text,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { router } from 'utils/SwapConnect';
import PropTypes from 'prop-types';
import BNBImage from '../../assets/bnb.svg';
import RGPImage from '../../assets/rgp.svg';
import ETHImage from '../../assets/eth.svg';
import BUSDImage from '../../assets/busd.svg';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { SettingsIcon } from '@chakra-ui/icons';
import { LPTokenContract } from '../../utils/SwapConnect';
const removeALiquidity = ({
  back,
  approveSmartSwapLPTokens,
  removingLiquidity,
  setPercentValue,
  liquidityToRemove,
  wallet
}) => {
  const [fromValue, setFromValue] = useState(0)
  const [toValue, setToValue] = useState(0)
  useEffect(() => {
    const getPriceForToken = async (path) => {
      if (wallet.signer !== 'signer') {
        const rout = await router();
        const fromPath = ethers.utils.getAddress(liquidityToRemove.path[0].fromPath);
        const toPath = ethers.utils.getAddress(liquidityToRemove.path[1].toPath);
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
        const value1 = Web3.utils.fromWei(getValue.toString().split(",")[1])
        const value2 = Web3.utils.fromWei(getToken2Value.toString().split(",")[1])
        setFromValue(value1)
        setToValue(value2)
      }
    }
    getPriceForToken(liquidityToRemove.path)

  }, [])
  const [selectedValue, setSelectedValue] = useState(0)

  const removeLiquidityForETH = async (tokenAddress, liquidity) => {
    const rout = await router();
    const deadLine = Math.floor(new Date().getTime() / 1000.0 + 1200);
    const liquidityAmount = ethers.utils.parseEther(liquidity.toString(), 'ether');
    try {
      console.log('called')
      const data = await rout.removeLiquidityETH(
        tokenAddress,
        liquidityAmount,
        0,
        0,
        wallet.address,
        deadLine,
        {
          from: wallet.address,
          gasLimit: 290000,
          gasPrice: ethers.utils.parseUnits('21', 'gwei'),
        }
      );
    } catch (error) {
      console.error("******", error)
    }

  }
  const removeThisLiquidity = async () => {
    const smartSwapLP = await LPTokenContract(liquidityToRemove.pairAddress);
    const walletBal = await smartSwapLP.balanceOf(wallet.address);
    const liquidityAmount = ethers.utils.formatEther(walletBal.mul(selectedValue).div(100))


    if (liquidityToRemove.path[0].token === "WBNB") {
      return removeLiquidityForETH(liquidityToRemove.path[1].toPath, liquidityAmount)
    }

    if (liquidityToRemove.path[1].token === "WBNB") {
      return removeLiquidityForETH(liquidityToRemove.path[0].fromPath, liquidityAmount)
    }

    removingLiquidity(liquidityAmount, liquidityToRemove.path[0].fromPath, liquidityToRemove.path[1].toPath)
  }
  const sliderValues = [0, 25, 50, 75, 100]
  const selectedButton = (val) => {
    setSelectedValue(val)
    setPercentValue(val)
  }
  const deleteLiquidity = () => {
    back("INDEX")
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
        background="#120136">
        <Flex
          justifyContent="space-between">
          <ArrowLeft cursor="pointer" onClick={() => back("INDEX")} />
          <Text mt="0px">Remove Liquidity</Text>
          <SettingsIcon />
        </Flex>
        <Box
          bgColor="#191D4E"
          color="#787FD4"
          rounded="lg"
          p={4}
          my={6}
        >
          Tip: Removing pool tokens converts your positions back to underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amount you receive.
     </Box>
        <Box
          bgColor="#120136"
          border="0.5px solid #191D4E"
          rounded="lg"
          p={4}
          my={6}
        >
          <Flex
            justifyContent="space-between">
            <Text mt="0px">Amount</Text>
            <Text mt="0px" color="#9869FC">Detailed</Text>
          </Flex>
          <Heading as="h2" size="3xl">
            {selectedValue}%
        </Heading>
          <Slider
            defaultValue={sliderValues[1]}
            value={selectedValue}
            min={sliderValues[0]}
            max={sliderValues[sliderValues.length - 1]}
            step={sliderValues[1]}
            onChangeEnd={(value) => setSelectedValue(value)}
          >
            <SliderTrack bg="#999999">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="#999999" opacity={0.5} />
            </SliderTrack>
            <SliderThumb boxSize={6} bg="#C4C4C4" />
          </Slider>
          <Flex
            justifyContent="space-between"
            my="4"
          >
            {sliderValues.splice(1).map((val, index) =>
              <Button
                bgColor={selectedValue === val ? "#3841AE" : "#191D4E"}
                rounded="lg"
                width="74px"
                height="37px"
                color={selectedValue === val ? "white" : "#787FD4"}
                border="0"
                cursor="pointer"
                onClick={() => selectedButton(val)}
                key={index}>{val}</Button>
            )
            }
          </Flex>
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
          <Box>
            <Flex
              justifyContent="space-between"
            >
              <Text>{liquidityToRemove.pooledToken0 * (selectedValue / 100)}</Text>
              <Text>
                {liquidityToRemove.path[0].token === "RGP" ?
                  <RGPImage /> : liquidityToRemove.path[0].token === "BUSD" ?
                    <BUSDImage /> : liquidityToRemove.path[0].token === "ETH" ?
                      <ETHImage /> : <BNBImage />
                }
                {liquidityToRemove.path[0].token == "WBNB" ? 'BNB' : liquidityToRemove.path[0].token}</Text>
            </Flex>
            <Flex
              justifyContent="space-between"
            >
              <Text>{liquidityToRemove.pooledToken1 * (selectedValue / 100)}</Text>
              <Text>
                {liquidityToRemove.path[1].token === "RGP" ?
                  <RGPImage /> : liquidityToRemove.path[1].token === "BUSD" ?
                    <BUSDImage /> : liquidityToRemove.path[1].token === "ETH" ?
                      <ETHImage /> : <BNBImage />
                }
                {liquidityToRemove.path[1].token == "WBNB" ? 'BNB' : liquidityToRemove.path[1].token}</Text>
            </Flex>
          </Box>
          <Text textAlign="right" color="#9869FC">Recieve RGP</Text>
        </Box>
        <Flex justifyContent="space-between">
          <Text>Price:</Text>
          <Box>
            <Text>1 {liquidityToRemove.path[0].token == "WBNB" ? 'BNB' : liquidityToRemove.path[0].token} : {fromValue} {liquidityToRemove.path[1].token == "WBNB" ? 'BNB' : liquidityToRemove.path[1].token}</Text>
            <Text>1 {liquidityToRemove.path[1].token == "WBNB" ? 'BNB' : liquidityToRemove.path[1].token} : {toValue} {liquidityToRemove.path[0].token == "WBNB" ? 'BNB' : liquidityToRemove.path[0].token}</Text>
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Button
            rounded="lg"
            color="white"
            bgColor="#3841AE"
            border="0"
            width="100%"
            mr="2"
            height="56px"
            cursor="pointer"
            _hover={{ background: "#3801AE" }}
            // onClick={deleteLiquidity}
            onClick={() => approveSmartSwapLPTokens(liquidityToRemove.pairAddress)}
          >
            Approve
  </Button>
          <Button
            color="#A8B3BD"
            bgColor="#52606D"
            rounded="lg"
            width="100%"
            border="0"
            height="56px"
            _hover={{ background: "#52616D" }}
            cursor="pointer"
            onClick={removeThisLiquidity}
          >
            Remove
    </Button>
        </Flex>
      </Box>
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
              {liquidityToRemove.path[0].token === "RGP" ?
                <RGPImage /> : liquidityToRemove.path[0].token === "BUSD" ?
                  <BUSDImage /> : liquidityToRemove.path[0].token === "ETH" ?
                    <ETHImage /> : <BNBImage />
              }
              {liquidityToRemove.path[1].token === "RGP" ?
                <RGPImage /> : liquidityToRemove.path[1].token === "BUSD" ?
                  <BUSDImage /> : liquidityToRemove.path[1].token === "ETH" ?
                    <ETHImage /> : <BNBImage />
              }
              <Text marginTop="0" marginLeft="7px">
                {liquidityToRemove.path[0].token == "WBNB" ? "BNB" : liquidityToRemove.path[0].token} / {liquidityToRemove.path[1].token == "WBNB" ? "BNB" : liquidityToRemove.path[1].token}
              </Text>
            </Flex>
            <Text marginTop="0">{liquidityToRemove.poolToken}</Text>
          </Flex>
          <Flex justifyContent="space-between" marginTop="-10px">
            <Text>Your pool share</Text>
            <Text>{liquidityToRemove.poolShare}</Text>
          </Flex>
          <Flex justifyContent="space-between" marginTop="-10px" >
            <Text>{liquidityToRemove.path[0].token == "WBNB" ? 'BNB' : liquidityToRemove.path[0].token}</Text>
            <Text>{liquidityToRemove.pooledToken0}</Text>
          </Flex>
          <Flex justifyContent="space-between" marginTop="-10px">
            <Text>{liquidityToRemove.path[1].token == "WBNB" ? "BNB" : liquidityToRemove.path[1].token}</Text>
            <Text>{liquidityToRemove.pooledToken1}</Text>
          </Flex>

        </Box>
      </Box>
    </>
  );
};

removeALiquidity.propTypes = {
  back: PropTypes.func.isRequired,
  approveSmartSwapLPTokens: PropTypes.func.isRequired,
  removingLiquidity: PropTypes.func.isRequired,
  liquidityToRemove: PropTypes.object.isRequired,
  wallet: PropTypes.object,
};
export default removeALiquidity;
