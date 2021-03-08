import { ethers } from 'ethers';
import BUSD from "./abis/BUSD.json";
import RigelToken from "./abis/RigelToken.json";
import SmartSwapFactory from "./abis/SmartSwapFactory.json";
import SmartSwapFactoryForSwap from './abis/SmartSwapFactoryForSwap.json';
import SmartSwapRouter02 from './abis/SmartSwapRouter02.json';
import WETH9 from './abis/WETH9.json';
import Manual, {setTokenaBalance} from '../components/sendToken';

function UNISWAP() {}

export default async function swapConnect() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
      // const provider = new ethers.getDefaultProvider();
      // const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner();
  
  const rgpContractAddress = "0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4";
  const rgp2ABI = RigelToken;
  const rgpToken = new ethers.Contract(
    rgpContractAddress,
    rgp2ABI,
    signer
  );
  console.log("provide: ", provider);
  // setTokenaBalance(tokenBalance);
  const rigelBal = await rgpToken.balanceOf("0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E");
  const balance = ethers.utils.formatEther(rigelBal).toString();
  console.log("rgpBalance: ", balance);

  const BUSDContractAddress = "0x80278a0cf536e568a76425b67fb3931dca21535c";
  const BusdABI = BUSD;
  const busdToken = new ethers.Contract(
    BUSDContractAddress,
    BusdABI,
    signer
  );
  // console.log("provide: ", provider);
  // setTokenaBalance(tokenBalance);
  const busdBal = await busdToken.balanceOf("0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E");
  const bal = ethers.utils.formatEther(busdBal).toString();
  console.log("BUSDBalance: ", bal);


  const SmartSwap_Address = "0x3175bfbc3e620FaF654309186f66908073cF9CBB";
  const SmartSwap_ABI = SmartSwapRouter02;
  const SmartSwapContractAddress = new ethers.Contract(
    SmartSwap_Address,
    SmartSwap_ABI,
    signer
  );
  
  // const params = [{
  //   from: "0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E",
  //   to: "0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E",
  //   value: ethers.utils.formatEther('100').toString(),
  // }];

  // const firstValue = ethers.utils.formatEther('1000').toString();
  // const secondValue = ethers.utils.formatEther('2000').toString();
  // const timeStamp = ethers.utils.formatEther('1615247147').toString();
  
  // const smartSwap = await SmartSwapContractAddress.swapExactTokensForTokens(
  //   ethers.utils.formatEther('1000').toString(),
  //   ethers.utils.formatEther('2000').toString(),
  //   ['0x80278a0cf536e568a76425b67fb3931dca21535c','0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4'],
  //   "0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E",
  //   ethers.utils.formatEther('1615247147').toString(), 
  //   {from: "0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E"}
  //   );

  // const bal = ethers.utils.formatEther(busdBal).toString();
  console.log("SmartSwap Name : ", SmartSwap_Address);
  // SmartSwapRouter02: 0x3175bfbc3e620FaF654309186f66908073cF9CBB
}