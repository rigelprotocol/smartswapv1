import { convertFromWei } from 'utils/UtilFunc';
import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import ERC20Token from 'utils/abis/ERC20Token.json';
import { getProvider } from 'utils/SwapConnect';

// import { SmartFactory } from './SwapConnect';
// list all transactions here
// export default async function Tokens() {
// const tokens = {
//     tokens: [
//         'BNB',
//         'ETH',
//         'RGP',
//     ],
//     listTokens: ''
// }

//   const swap = async e => {
//     const { SmartSwapContractAddress } = await SmartFactory();
// adding liquidity

//     const addLiquid = await SmartSwapContractAddress.addLiquidity(
//       tokenA,
//       tokenB,
//       amountADesired,
//       amountBDesired,
//       amountAMin,
//       amountBMin,
//       addTo,
//       dline,
//     );

//     // Adding liquidity for ETH
//     const addETHLiquid = await SmartSwapContractAddress.addLiquidityETH(
//       token,
//       amountofTokenDesired,
//       amountTokenMin,
//       amountETHmin,
//       addTo,
//       dline,
//     );

//     // remove liquidity for ETH
//     const removETHLiquid = await SmartSwapContractAddress.removeLiquidityETH(
//       token,
//       amountofTokenDesired,
//       amountTokenMin,
//       amountETHmin,
//       addTo,
//       dline,
//     );

//     // removeLiquidity
//     const removeLiquid = await SmartSwapContractAddress.removeLiquidity(
//       tokenA,
//       tokenB,
//       liquidity,
//       amountAMin,
//       amountBMin,
//       addTo,
//       dline,
//     );

//     // swapping Exact token for tokens
//     const swapExactTokforTok = await SmartSwapContractAddress.swapExactTokensForTokens(
//       amountIn,
//       amountOutMin,
//       path,
//       addressTo,
//       deadline,
//     );

//     // swapping exact token for eth
//     const swapExactTokforETH = await SmartSwapContractAddress.swapExactTokensForETH(
//       amountIn,
//       amountOutMin,
//       path,
//       addressTo,
//       deadline,
//     );

//     // swapping eth for exact tokens
//     const swapETHForExactTok = await SmartSwapContractAddress.swapETHForExactTokens(
//       amountOut,
//       amountInMax,
//       path,
//       addressTo,
//       deadline,
//     );

//     // swapping Tokens for exact eth
//     const swapTokforExactEth = await SmartSwapContractAddress.swapTokensForExactETH(
//       amountOut,
//       amountInMax,
//       path,
//       addressTo,
//       deadline,
//     );

//     // swapping token for exact tokens
//     const swapTokForExactTok = await SmartSwapContractAddress.swapTokensForExactTokens(
//       amountOut,
//       amountInMax,
//       path,
//       addressTo,
//       deadline,
//     );
//   };
// }

// SEARCH TOKENS
export const getTokenList = async (searchToken, account, list) => {
  const filteredTokenList = filterAvailableTokenList(searchToken, list);
  if (filteredTokenList.length > 0) {
    return filteredTokenList;
  }
  const addressOfToken = isItAddress(searchToken);
  const tokenData = addressOfToken
    ? await getTokenWithContract(searchToken, account, list)
    : getTokenWithoutContract();
  // let tokenData = await getTokenWithWeb3(searchToken,account)
  return tokenData.length > 0 ? tokenData : [];
};

export const addUserToken = address =>
  isItAddress(address) && getTokenDetails();

export const getTokenDetails = async tokenAddress => {
  const smartContract = new Contract(tokenAddress, ERC20Token, getProvider());
  const name = await smartContract.name();
  const symbol = await smartContract.symbol();
  const { address } = smartContract;
  const decimal = await smartContract.decimal();
  console.log({ name, symbol, address, decimal })
  return address !== '0x' ? { name, symbol, address, decimal } : null;
};

export const getTokenWithContract = async (searchToken, account, list) => {
  try {
    const contract = new Contract(searchToken, ERC20Token, getProvider());
    const name = await contract.name();
    const symbol = await contract.symbol();
    const balance =
      account.address == '0x' ? '' : await contract.balanceOf(account.address);
    const decimals = await contract.decimals();
    const { address } = contract;
    const filteredTokenList = filterTokenListWithAddress(symbol, list);
    if (filteredTokenList.length > 0) {
      return filteredTokenList;
    }
    const tokenObject = [
      {
        name: name.toString(),
        balance: convertFromWei(balance, decimals),
        available: false,
        imported: false,
        symbol,
        img: '',
        address,
      },
    ];
    return tokenObject;
  } catch (e) {
    console.log(e);
  }
};
export const getTokenWithoutContract = () => [];
export const isItAddress = token => {
  try {
    return getAddress(token);
  } catch {
    return false;
  }
};

export const filterAvailableTokenList = (searchToken, list) => {
  const filteredTokenList = list.filter(
    token =>
      token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
      token.name.toLowerCase().includes(searchToken.toLowerCase()),
  );
  return filteredTokenList;
};

export const filterTokenListWithAddress = (symbol, list) => {
  const filteredTokenList = list.filter(
    token => token.symbol.toLowerCase() === symbol.toLowerCase(),
  );
  return filteredTokenList;
};
