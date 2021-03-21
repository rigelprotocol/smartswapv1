/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from 'ethers';
import BUSD from 'utils/abis/BUSD.json';
import RigelToken from 'utils/abis/RigelToken.json';
import SmartSwapFactoryForSwap from 'utils/abis/SmartSwapFactoryForSwap.json';
import SmartSwapRouter02 from 'utils/abis/SmartSwapRouter02.json';
import WETH9 from 'utils/abis/WETH9.json';
import configureStore from 'configureStore';

const store = configureStore();
const { wallet } = store.getState().wallet;
let { signer } = wallet;
if (typeof signer === 'string') {
  if (window.ethereum !== 'undefined') {
    console.log(typeof signer, window.ethereum);
    signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  }
}

// router contract where trx is made for both liquidity and swap
export const router = async () => {
  const SmartSwapAddress = '0x3175bfbc3e620FaF654309186f66908073cF9CBB';
  return new ethers.Contract(SmartSwapAddress, SmartSwapRouter02, signer);
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

// const busdBal = await busdToken.balanceOf(
//   '0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E',
// );
// const bal = ethers.utils.formatEther(busdBal).toString();
// console.log('BUSDBalance: ', bal);

// const rigelBal = await rgpToken.balanceOf();
// const balance = ethers.utils.formatEther(rigelBal).toString();

// await WETH9Contract.totalSupply();
// const WETHbal = ethers.utils.formatEther(WBal).toString();
// console.log('WETH9 ABI: ', WETH9_ABI);
// console.log('WETH9 Bal: ', WETHbal);
