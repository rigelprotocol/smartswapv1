import { ethers } from 'ethers';
import BUSD from "./abis/BUSD.json";
import RigelToken from "./abis/RigelToken.json";
import SmartSwapFactory from "./abis/SmartSwapFactory.json";
import SmartSwapFactoryForSwap from './abis/SmartSwapFactoryForSwap.json';
import SmartSwapRouter02 from './abis/SmartSwapRouter02.json';
import WETH9 from './abis/WETH9.json';

// Connection to Blcokchain
async function swapConnect() {
  // get network ID and the deployed address
  // BUSD Token deployment...
  const BUSD_Address = '0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4';
  const BUSD_ABI = BUSD;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.signer();
  //
  const BUSD_CONTRACT = new ethers.Contract(BUSD_Address, BUSD_ABI, signer);
  console.log('YOUR BUSD ADD IS: ', BUSD_Address);

  // RGP Token deployment...
  const RigelToken_Address = '0x80278a0Cf536e568A76425B67Fb3931Dca21535c';
  const RigelToken_ABI = RigelToken;
  const RigelToken_Contract = new ethers.Contract(
    RigelToken_Address,
    RigelToken_ABI,
    signer,
  );
  console.log('YOUR RigelToken ADD IS: ', RigelToken_Address);

  // SmartSwapFactory Contract Deployment
  const SmartSwapFactory_Address = '0xc33b4cB9eAFE64BEa3c96e723bEBdB961d462288';
  const SmartSwapFactory_ABI = SmartSwapFactory;
  const SmartSwapFactory_Contract = new ethers.Contract(
    SmartSwapFactory_Address,
    SmartSwapFactory_ABI,
    signer,
  );
  console.log('YOUR SmartSwapFactory ADD IS: ', SmartSwapFactory_Address);

  // SmartSwapRouter02 Contract Deployment
  const SmartSwapRouter02_Address =
    '0x3175bfbc3e620FaF654309186f66908073cF9CBB';
  const SmartSwapRouter02_ABI = SmartSwapRouter02;
  const SmartSwapRouter02_Contract = new ethers.Contract(
    SmartSwapRouter02_Address,
    SmartSwapRouter02_ABI,
    signer,
  );
  console.log('YOUR SmartSwapRouter02 ADD IS: ', SmartSwapRouter02_Address);

  // WETH9 Token Deployment
  const WETH9_Address = '0x492Df17f202e36525151Ce7BcD49d5637Dc10659';
  const WETH9_ABI = WETH9;
  const WETH9_Contract = new ethers.Contract(WETH9_Address, WETH9_ABI, signer);
  console.log('YOUR WETH9 ADD IS: ', WETH9_Address);

  // SmartSwapFactoryForSwap Contract Deployment
  const SmartSwapFactoryForSwap_Address =
    '0xc33b4cB9eAFE64BEa3c96e723bEBdB961d462288';
  const SmartSwapFactoryForSwap_ABI = SmartSwapFactoryForSwap;
  const SmartSwapFactoryForSwap_Contract = new ethers.Contract(
    SmartSwapFactoryForSwap_Address,
    SmartSwapFactoryForSwap_ABI,
    signer,
  );
  console.log(
    'YOUR SmartSwapFactoryForSwap ADD IS: ',
    SmartSwapFactoryForSwap_Address,
  );
}

function UNISWAP() {}

export default swapConnect;
