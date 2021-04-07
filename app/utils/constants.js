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
  BUSD: 'BUSD', //This can be use
  ETH: 'ETH',
  RGP: 'RGP',
};

export const TOKENS_CONTRACT = {
  BNB: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  BUSD: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4', // This can be use
  ETH: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
  RGP: '0x80278a0cf536e568a76425b67fb3931dca21535c',
};

export const SMART_SWAP = {
  SMART_SWAPPING: '0x3175bfbc3e620FaF654309186f66908073cF9CBB',
  SmartFactory: '0xc33b4cB9eAFE64BEa3c96e723bEBdB961d462288',
  MasterChef: '0x932b4b0d6c10f8D49547444f4fC3D218f5D1C5Eb',
  ETHRGPSMARTSWAPPAIR: '0x339a18e637de287954840b04Ac5E10Cf009357bB',
};

export const tokenList = [
  { name: 'Select a token', img: '' },
  {
    balance: 0,
    symbol: 'RGP',
    abi: RigelToken,
    name: 'Rigel Protocol',
    img: '../../assets/rgp.svg',
    address: '0x80278a0cf536e568a76425b67fb3931dca21535c',
  },
  {
    abi: BUSD,
    balance: 0,
    symbol: 'BUSD',
    name: 'Binance USD',
    img: '../../assets/bnb.svg',
    address: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  },
  // WE CAN USE THIS
  {
    abi: BND,
    balance: 0,
    symbol: 'BNB',
    name: 'Binance SmartChain USD',
    img: '../../assets/bnb.svg',
    address: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  },
  {
    abi: WETH9,
    balance: 0,
    symbol: 'WETH',
    name: 'Ethereum Token',
    img: '../../assets/eth.svg',
    address: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
  },
];

export const tokenWhere = field =>
  field !== null &&
  tokenList.filter(fields => fields.symbol === field.toUpperCase())[0];

export const tokenAddressWhere = symbol => tokenWhere(symbol).address;
