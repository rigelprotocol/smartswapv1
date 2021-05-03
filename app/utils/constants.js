// @ts-nocheck
import Web3 from 'web3';
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
  BUSD: 'BUSD', // This can be use
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
  specialPool: '0x932b4b0d6c10f8D49547444f4fC3D218f5D1C5Eb',
  ETHRGPSMARTSWAPPAIR: '0x339a18e637de287954840b04Ac5E10Cf009357bB',
  SmartSwap_LP_Token: '0xf9b61d972d199175c07298Dcf26f71dB3BB934F5',
  liquidityProviderTokensContractBNBRGP:
    '0x6Fe0c20a219546720258cb2c1B0c0b9E2882C608',
  RigelSmartContract: '0x80278a0cf536e568a76425b67fb3931dca21535c',
  BNB: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  BUSD: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4', // This can be use
  ETH: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
};

export const tokenList = [
  { name: 'Select a token', symbol: 'SELECT A TOKEN', img: '' },
  {
    symbol: 'RGP',
    abi: RigelToken,
    name: 'Rigel Protocol',
    img: '../../assets/rgp.svg',
    address: '0x80278a0cf536e568a76425b67fb3931dca21535c',
  },
  {
    abi: BUSD,
    symbol: 'BUSD',
    name: 'Binance USD',
    img: '../../assets/bnb.svg',
    address: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  },
  // WE CAN USE THIS
  // {
  //   abi: BNB,
  //   symbol: 'BNB',
  //   name: 'Binance SmartChain USD',
  //   img: '../../assets/bnb.svg',
  //   address: '0xd848ed7f625165d7ffa9e3b3b0661d6074902fd4',
  // },
  {
    abi: WETH9,
    symbol: 'WETH',
    name: 'Ethereum Token',
    img: '../../assets/eth.svg',
    address: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
  },
  {
    abi: WETH9,
    symbol: 'ETH',
    name: 'Ethereum',
    
    img: '../../assets/eth.svg',
    address: '0x492Df17f202e36525151Ce7BcD49d5637Dc10659',
  },
];

export const tokenWhere = field =>
  field !== null &&
  tokenList.filter(fields => fields.symbol === field.toUpperCase())[0];

export const tokenAddressWhere = symbol => tokenWhere(symbol).address;

export const convertToNumber = (hex, decimals) => {
  const balance = Web3.utils.toBN(hex);
  let balanceDecimal = balance;
  if (decimals && (balance.toLocaleString() === '0' && decimals < 20)) {
    balanceDecimal = balance.div(Web3.utils.toBN(10 ** decimals));
  }
  return balanceDecimal.toLocaleString();
};

// export const convertIndexToAlphetString = number =>
//   number
//     .toString()
//     .split('')
//     .map(numberChar => String.fromCharCode(65 + parseInt(numberChar)))
//     .join('');

// export const queryTemplate = (index, { address }, callData) => `
//   ${convertIndexToAlphetString(
//     index,
//   )}: call(data: { to: "${address}", data: "${callData}" }) { data }`;

// export const retrieveTokenBalanceViaGraphQL = tokens => {
//   const ethersInterface = new ethers.utils.Interface(abi);
//   const callData = ethersInterface.functions.balanceOf.encode([walletAddress]);
//   const query = tokens
//     .map((token, index) => {
//       return queryTemplate(index, token, callData);
//     })
//     .join('\n');

//   return fetch(`${bathEndpoint}/graphql`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ query: `{ block { ${query} } }` }),
//   }).then(data => data.json());
// };

// const web3 = new Web3(new Web3.providers.HttpProvider(bathEndpoint));

// const generateContractFunctionList = ({ tokens, blockNumber }) => {
//   const batch = new web3.BatchRequest();

//   tokens.map(async ({ address: tokenAddress, symbol, decimals }) => {
//     const contract = new web3.eth.Contract(balanceAbi);
//     contract.options.address = tokenAddress;

//     batch.add(
//       contract.methods.balanceOf(walletAddress).call.request({}, blockNumber),
//     );
//   });

//   return batch;
// };

// const main = async tokens => {
//   const batch = generateContractFunctionList({ tokens });
//   const tokenBalances = {};
//   const { response } = await batch.execute();
//   response.forEach(({ _hex }, index) => {
//     const { name, decimals, symbol } = tokens[index];
//     tokenBalances[name] = `${convertToNumber(_hex, decimals)} ${symbol}`;
//   });
//   console.log(tokenBalances);
// };

export const balanceAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
// export const balanceAbi = [
//   {
//     constant: true,
//     inputs: [
//       {
//         name: '_owner',
//         type: 'address',
//       },
//     ],
//     name: 'balanceOf',
//     outputs: [
//       {
//         name: 'balance',
//         type: 'uint256',
//       },
//     ],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

export const allowanceAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const approveAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
