/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from 'ethers';
import BUSD from 'utils/abis/BUSD.json';
import LiquidityPairAbi from 'utils/abis/smartSwapLPToken.json';
import RigelToken from 'utils/abis/RigelToken.json';
import SmartSwapFactoryForSwap from 'utils/abis/SmartSwapFactoryForSwap.json';
import SmartSwapRouter02 from 'utils/abis/SmartSwapRouter02.json';
import SmartSwapLPToken from 'utils/abis/smartSwapLPToken.json';
import ETHRGPSMARTSWAPPAIR from 'utils/abis/ETHRGPSMARTSWAPPAIR.json';
import WETH9 from 'utils/abis/WETH9.json';
import lPContractABI from 'utils/abis/lPContractABI.json';
import specialPool from 'utils/abis/specialPool.json';
import configureStore from 'configureStore';
import { SMART_SWAP } from './constants';

const store = configureStore();
const provider = new ethers.providers.Web3Provider(window.ethereum)

const { wallet } = store.getState().wallet;
let { signer } = wallet;
if (typeof signer === 'string') {
  if (window.ethereum && window.ethereum !== 'undefined') {
    signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  }
}

//
// router contract where trx is made for both liquidity and swap
export const router = async () =>
  new ethers.Contract(SMART_SWAP.SMART_SWAPPING, SmartSwapRouter02, signer);

export const updateOutPutAmountForRouter = async () =>
  new ethers.Contract(SMART_SWAP.SMART_SWAPPING, SmartSwapRouter02, provider);

// router contract where trx is made for both liquidity and swap
export const smartSwapLPToken = async () =>
  new ethers.Contract(SMART_SWAP.SmartSwap_LP_Token, SmartSwapLPToken, signer);

// contract for LPs tokens
export const BNBRGPliquidityProviderTokensContract = async () =>
  new ethers.Contract(
    SMART_SWAP.liquidityProviderTokensContractBNBRGP,
    lPContractABI,
    signer,
  );

// contract for special pool
export const RGPSpecialPool = async () =>
  new ethers.Contract(SMART_SWAP.specialPool, specialPool, signer);

// Factory smartContract for getting and creating pairs
export const SmartFactory = async () =>
  new ethers.Contract(SMART_SWAP.SmartFactory, SmartSwapFactoryForSwap, signer);

// Factory smartContract for getting and creating pairs for ETH and RGP
export const SMARTFACTORYPAIRETHRGP = async () =>
  new ethers.Contract(
    SMART_SWAP.ETHRGPSMARTSWAPPAIR,
    ETHRGPSMARTSWAPPAIR,
    signer,
  );

// rigel token
export const rigelToken = async () =>
  new ethers.Contract(SMART_SWAP.RigelSmartContract, RigelToken, signer);

// BUSD token
export const BUSDToken = async () =>
  new ethers.Contract(SMART_SWAP.BUSD, BUSD, signer);

// this can be used
// BNB token
export const BNBTOKEN = async () =>
  new ethers.Contract(SMART_SWAP.BUSD, BUSD, signer);

// WETH (ETH)
export const WETH = async () => {
  const WETH9Address = '0x492Df17f202e36525151Ce7BcD49d5637Dc10659';
  return new ethers.Contract(WETH9Address, WETH9, signer);
};

// Creates LiquidityPair Contract instance
export const LiquidityPairInstance = async (address) =>
  new ethers.Contract(address, LiquidityPairAbi, signer);


// Create instance for interacting with any ERC20 TOKEN
export const erc20Token = async (address) =>
  new ethers.Contract(address, RigelToken, signer);


// Creates an instance of any LPToken contract given an address
export const LPTokenContract = async (lpTokenAddress) =>
  new ethers.Contract(lpTokenAddress, SmartSwapLPToken, signer);
