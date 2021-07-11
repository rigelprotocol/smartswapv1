import { tokenList } from 'utils/constants';
import Web3 from 'Web3'
import { getTokenListBalance } from 'utils/wallet-wiget/TokensUtils';
import { isFunc } from 'utils/UtilFunc';
import { getAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
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
export const getTokenList =async (searchToken,account) =>{
   const filteredTokenList = filterAvailableTokenList(searchToken)
   if(filteredTokenList.length>0){
      return filteredTokenList
   }else{
      let addressOfToken =await  isItAddress(searchToken)
     let tokenData = addressOfToken ? await getTokenWithContract(searchToken,account) : await getTokenWithoutContract(searchToken,account)
      return tokenData.length > 0 ? tokenData : []
   }
}

export const getTokenWithContract = async (searchToken,account) =>{
   let contract =await new Contract(searchToken, ERC20Token, getProvider())
   try{
      let name = await contract.name()
      let symbol = await contract.symbol()
      let balance = await contract.balanceOf(account.address)
      let address = await contract.address
      let tokenObject = [{
      name: name.toString(),
      balance: Web3.utils.fromWei(balance.toString()),
      available:false,
      imported:false,
      symbol,
      address
   }]
   return tokenObject   
   }catch(e){
      console.log(e)
   }

}
export const getTokenWithoutContract = (searchToken) =>{
console.log("This has not been implemented")
return []
}
export const isItAddress  = (token) => {
   try {
      return getAddress(token)
    } catch {
      return false
    }
}

export const filterAvailableTokenList =(searchToken) =>{
 const filteredTokenList = tokenList.filter(
        token =>
          token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
          token.name.toLowerCase().includes(searchToken.toLowerCase()),
      );
     return filteredTokenList
}