// @ts-nocheck
import Web3 from 'web3';

export const checkNetVersion = () => {
  if (window.ethereum && window.ethereum.chainId !== null) {
    return window.ethereum.chainId.toString();
  }
  return null;
};

export const TABS = {
  MANUAL: 'MANUAL',
  AUTO_TIME: 'AUTO_TIME',
  ACTIVE: 'ACTIVE',
  PRICE: 'PRICE',
};

export const ROUTES = {
  FARMING: '/farming',
  SMART_SWAPPING: '/swap',
  LIQUIDITY: '/liquidity',
};

export const TOKENS = {
  BNB: 'BNB',
  BUSD: 'BUSD', // This can be use
  ETH: 'ETH',
  RGP: 'RGP',
};

const BSCTestnetTokens = {
  BNB: '0x23967E68bB6FeA03fcc3676F8E55272106F44A4A',
  BUSD: '0x10249e900b919fdee9e2ed38b4cd83c4df857254', // This can be use
  ETH: '0x23967E68bB6FeA03fcc3676F8E55272106F44A4A',
  RGP: '0x9f0227a21987c1ffab1785ba3eba60578ec1501b',
};

const BSCmainnetTokens = {
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // This can be use
  ETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  RGP: '0xFA262F303Aa244f9CC66f312F0755d89C3793192',
};
const BSC_MAIN_NET_ID =
  window.ethereum !== undefined && window.ethereum.isTrust ? '56' : '0x38';
export const TOKENS_CONTRACT =
  checkNetVersion() === BSC_MAIN_NET_ID.toString()
    ? BSCmainnetTokens
    : BSCTestnetTokens;

const BSCMainnet = {
  SmartFactory: '0x655333A1cD74232C404049AF9d2d6cF1244E71F6',
  SMART_SWAPPING: '0xf78234E21f1F34c4D8f65faF1BC82bfc0fa24920',
  ETHRGPSMARTSWAPPAIR: '0x9218BFB996A9385C3b9633f87e9D68304Ef5a1e5',
  specialPool: '',
  SmartSwap_LP_Token: '0x7f91f8B8Dac13DAc386058C12113936987F6Be9d',
  RigelSmartContract: '0xFA262F303Aa244f9CC66f312F0755d89C3793192',
  masterChef: '0x7d59AAD43Cef13Cd077308D37C3A39D3b4B6C924',
  masterChefPoolOne: '0x7f91f8B8Dac13DAc386058C12113936987F6Be9d',
  masterChefPoolTwo: '0x9218BFB996A9385C3b9633f87e9D68304Ef5a1e5',
  masterChefPoolThree: '0xC8e6305376404Df37b9D231511cD27184fa8f10A',
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  ETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
};

const BSCTestnet = {
  SmartFactory: '0x7B14Ab51fAF91926a2214c91Ce9CDaB5C0E1A1c3',
  SMART_SWAPPING: '0x00749e00Af4359Df5e8C156aF6dfbDf30dD53F44',
  ETHRGPSMARTSWAPPAIR: '0xca01606438556b299005b36B86B38Fe506eadF9F',
  specialPool: '0x4Be275eF94AF45E163c6b3182467191025E883B4',
  RigelSmartContract: '0x9f0227A21987c1fFab1785BA3eBa60578eC1501B',
  masterChef: '0x71C07230dF8b60aef6e3821CA2Dee530966EFc2D',
  masterChefPoolOne: '0x0B0a1E07931bD7991a104218eE15BAA682c05e01',
  masterChefPoolTwo: '0xca01606438556b299005b36B86B38Fe506eadF9F',
  masterChefPoolThree: '0x120f3E6908899Af930715ee598BE013016cde8A5',
  BNB: '0x23967E68bB6FeA03fcc3676F8E55272106F44A4A',
  BUSD: '0x10249e900b919fdee9e2ed38b4cd83c4df857254',
  ETH: '0x23967E68bB6FeA03fcc3676F8E55272106F44A4A',
};

export const SMART_SWAP =
  checkNetVersion() === BSC_MAIN_NET_ID.toString() ? BSCMainnet : BSCTestnet;

export const tokenList = [
  {
    name: 'Select a token',
    symbol: 'SELECT A TOKEN',
    img: '',
    available: true,
  },
  {
    symbol: 'RGP',
    available: true,
    imported: false,
    name: 'Rigel Protocol',
    logoURI: '../../assets/rgp.svg',
    address:
      checkNetVersion() === BSC_MAIN_NET_ID.toString()
        ? '0xFA262F303Aa244f9CC66f312F0755d89C3793192'
        : '0x9f0227a21987c1ffab1785ba3eba60578ec1501b',
  },
  {
    symbol: 'BUSD',
    available: true,
    imported: false,
    name: 'Binance USD',
    logoURI:
      'https://tokens.pancakeswap.finance/images/0xe9e7cea3dedca5984780bafc599bd69add087d56.png',
    address:
      checkNetVersion() === BSC_MAIN_NET_ID.toString()
        ? '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
        : '0x10249e900b919fdee9e2ed38b4cd83c4df857254',
  },
  {
    symbol: 'BNB',
    available: true,
    imported: false,
    name: 'BNB',
    logoURI:
      'https://tokens.pancakeswap.finance/images/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png',
    address:
      checkNetVersion() === BSC_MAIN_NET_ID.toString()
        ? '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
        : '0x23967E68bB6FeA03fcc3676F8E55272106F44A4A',
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

export const checkIfTokenIsListed = symbol =>
  tokenList.find(token => token.symbol === symbol);

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
export const decimalAbi = [
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
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
