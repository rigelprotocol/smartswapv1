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
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // This can be use
  ETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  RGP: '0xFA262F303Aa244f9CC66f312F0755d89C3793192',
};

export const SMART_SWAP = {
  // -------------------------------------------------------------- PAIR USED FOR BSC MAINNET-----------------------------------
  SmartFactory: '0x655333A1cD74232C404049AF9d2d6cF1244E71F6',
  SMART_SWAPPING: '0xf78234E21f1F34c4D8f65faF1BC82bfc0fa24920',
  ETHRGPSMARTSWAPPAIR: '0x9218BFB996A9385C3b9633f87e9D68304Ef5a1e5',  
  SmartSwap_LP_Token: '0x7f91f8B8Dac13DAc386058C12113936987F6Be9d',
  RigelSmartContract: '0xFA262F303Aa244f9CC66f312F0755d89C3793192',
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // This can be use

  // ----------------------------------------------------------- PAIR USED -----------------------------------------------
  ETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
};


//-------------------------------------------------------------------PAIR USED -----------------------------------------------------
export const tokenList = [
  { name: 'Select a token', symbol: 'SELECT A TOKEN', img: '' },
  {
    symbol: 'RGP',
    abi: RigelToken,
    name: 'Rigel Protocol',
    img: '../../assets/rgp.svg',
    address: '0xFA262F303Aa244f9CC66f312F0755d89C3793192',
  },
  {
    abi: BUSD,
    symbol: 'BUSD',
    name: 'Binance USD',
    img: '../../assets/bnb.svg',
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
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
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  {
    abi: WETH9,
    symbol: 'ETH',
    name: 'Ethereum',

    img: '../../assets/eth.svg',
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
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
