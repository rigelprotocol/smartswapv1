/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { setWalletProps } from 'containers/WalletProvider/actions';
import BUSD from './abis/BUSD.json';
import RigelToken from './abis/RigelToken.json';
import SmartSwapFactoryForSwap from './abis/SmartSwapFactoryForSwap.json';
import SmartSwapRouter02 from './abis/SmartSwapRouter02.json';
import WETH9 from './abis/WETH9.json';

// const [allow, setAllow] = useState();

export default async function swapConnect() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  useEffect(() => {
    const router = async () => {
      const SmartSwap_Address = '0x3175bfbc3e620FaF654309186f66908073cF9CBB';
      const SmartSwap_ABI = SmartSwapRouter02;
      const SmartSwapContractAddress = new ethers.Contract(
        SmartSwap_Address,
        SmartSwap_ABI,
        signer,
      );
      console.log('Router Address: ', SmartSwap_ABI);
    };
    router();
  }, []);

  useEffect(() => {
    const SmartFactory = async () => {
      const SmartFactory_Address = '0xc33b4cB9eAFE64BEa3c96e723bEBdB961d462288';
      const SmartFactory_ABI = SmartSwapFactoryForSwap;
      const SmartSwapContractAddress = new ethers.Contract(
        SmartFactory_Address,
        SmartFactory_ABI,
        signer,
      );
      console.log('SmartFactory ABI: ', SmartFactory_ABI);

      // console.log("SWAP: ", swapExactTokens)
    };
    SmartFactory();
  }, []);

  useEffect(() => {
    const rigelToken = async () => {
      const rgpContractAddress = '0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4';
      const rgp2ABI = RigelToken;
      const rgpToken = new ethers.Contract(rgpContractAddress, rgp2ABI, signer);
      const rigelBal = await rgpToken.balanceOf(
        '0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E',
      );
      const balance = ethers.utils.formatEther(rigelBal).toString();
      console.log('rgpBalance........: ', balance,);
      setWalletProps({ balance });
    };
    rigelToken();
  }, []);

  useEffect(() => {
    const BUSDToken = async () => {
      const BUSDContractAddress = '0x80278a0cf536e568a76425b67fb3931dca21535c';
      const BusdABI = BUSD;
      const busdToken = new ethers.Contract(
        BUSDContractAddress,
        BusdABI,
        signer,
      );
      const busdBal = await busdToken.balanceOf(
        '0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E',
      );
      const bal = ethers.utils.formatEther(busdBal).toString();
      console.log('BUSDBalance: ', bal);
    };
    BUSDToken();
  }, []);

  useEffect(() => {
    const WETH = async () => {
      const WETH9_Address = '0x492Df17f202e36525151Ce7BcD49d5637Dc10659';
      const WETH9_ABI = WETH9;
      const WETH9Contract = new ethers.Contract(
        WETH9_Address,
        WETH9_ABI,
        signer,
      );
      const WBal = await WETH9Contract.totalSupply();
      const WETHbal = ethers.utils.formatEther(WBal).toString();
      console.log('WETH9 ABI: ', WETH9_ABI);
      console.log('WETH9 Bal: ', WETHbal);
    };
    WETH();
  }, []);

  // const allowance = async () => {
  //   const { rgpToken } = await rigelToken();
  //   const rigelBal = await rgpToken.balanceOf("0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E");
  //   const balance = ethers.utils.formatEther(rigelBal).toString();
  //   console.log("rgpBal........: ", balance);

  //   // const tokenAllowance = rgpToken.allowance("", "") && busdToken.allowance("", "");
  // }
  return <></>;
}
