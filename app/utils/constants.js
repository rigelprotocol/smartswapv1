import RigelToken from 'utils/abis/RigelToken.json';
import BUSD from 'utils/abis/BUSD.json';
import WETH9 from 'utils/abis/WETH9.json';

export const TABS = {
  MANUAL: 'MANUAL',
  AUTO_TIME: 'AUTO_TIME',
  ACTIVE: 'ACTIVE',
  PRICE: 'PRICE',
};

export const ROUTES = {
  FARMING: '/farming',
  SMART_SWAPPING: '/smart-swapping',
  LIQUIDITY: '/liquidity',
};

export const TOKENS = {
  BNB: 'BNB',
  ETH: 'ETH',
  RGP: 'RGP',
};

export const TOKENS_CONTRACT = {
  BNB: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  ETH: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
  RGP: '0x80278a0cf536e568a76425b67fb3931dca21535c',
};

export const SMART_SWAP = {
  SMART_SWAPPING: '0x3175bfbc3e620FaF654309186f66908073cF9CBB',
  SmartFactory: '0xc33b4cB9eAFE64BEa3c96e723bEBdB961d462288',
  MasterChef: '0xfBeF04a74E64Fe347e3B200e4d50AC8323328fe0',
};

export const tokenList = [
  {
    balance: 0,
    symbol: 'RGP',
    abi: RigelToken,
    name: 'Rigel Protocol',
    icon: '../../assets/rgp.svg',
    address: '0x80278a0cf536e568a76425b67fb3931dca21535c',
  },
  {
    abi: BUSD,
    balance: 0,
    symbol: 'BUSD',
    name: 'Binance USD',
    address: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  },
  {
    abi: WETH9,
    balance: 0,
    symbol: 'WETH',
    name: 'Ethereum Token',
    address: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
  },
];
