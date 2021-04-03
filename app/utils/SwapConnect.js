/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from 'ethers';
import BUSD from 'utils/abis/BUSD.json';
import RigelToken from 'utils/abis/RigelToken.json';
import SmartSwapFactoryForSwap from 'utils/abis/SmartSwapFactoryForSwap.json';
import SmartSwapRouter02 from 'utils/abis/SmartSwapRouter02.json';
import WETH9 from 'utils/abis/WETH9.json';
import masterChef from 'utils/abis/masterChef.json';
import configureStore from 'configureStore';

const store = configureStore();
const { wallet } = store.getState().wallet;
let { signer } = wallet;
if (typeof signer === 'string') {
  if (window.ethereum && window.ethereum !== 'undefined') {
    console.log(typeof signer, window.ethereum);
    signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  }
}

// router contract where trx is made for both liquidity and swap
export const router = async walletSigner => {
  const SmartSwapAddress = '0x3175bfbc3e620FaF654309186f66908073cF9CBB';
  return new ethers.Contract(SmartSwapAddress, SmartSwapRouter02, signer);
};

// masterChef contract for farming...
export const MasterChefContract = async walletSigner => {
  const chefAddress = '0x801f01287Fb235B1a849725b867847676d9Ad8ED';
  return new ethers.Contract(chefAddress, masterChef, signer);
};

//Factory smartContract for getting and creating pairs
export const SmartFactory = async () => {
  const SmartFactoryAddress = '0xc33b4cB9eAFE64BEa3c96e723bEBdB961d462288';
  return new ethers.Contract(SmartFactoryAddress, SmartSwapFactoryForSwap, signer);
};

// rigel token
export const rigelToken = async () => {
  const rgpContractAddress = '0x80278a0cf536e568a76425b67fb3931dca21535c';
  return new ethers.Contract(rgpContractAddress, RigelToken, signer);
};

// BUSD token
export const BUSDToken = async () => {
  const BUSDContractAddress = '0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4';
  return new ethers.Contract(BUSDContractAddress, BUSD, signer);
};

// WETH (ETH)
export const WETH = async () => {
  const WETH9Address = '0x492Df17f202e36525151Ce7BcD49d5637Dc10659';
  return new ethers.Contract(WETH9Address, WETH9, signer);
};

