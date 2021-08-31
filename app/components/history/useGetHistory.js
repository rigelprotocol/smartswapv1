import { useEffect, useState } from 'react';
import abiDecoder from 'abi-decoder';
import { convertFromWei } from 'utils/UtilFunc';
import testNetToken from '../../utils/test-net-tokens.json';
import mainNetToken from '../../utils/main-token.json';
import SmartSwapRouter02 from '../../utils/abis/SmartSwapRouter02.json';
import { getTokenDetails } from '../../utils/tokens';

const useGetHistory = wallet => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [serverError, setServerError] = useState(null);

  // utility
  function convertToTime(epochTime) {
    const date = new Date(epochTime * 1000);
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;
    // Will display time in 10:30:23 format
    const formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(
      -2,
    )}`;
    return formattedTime;
  }

  abiDecoder.addABI(SmartSwapRouter02);

  function decodeInput(input) {
    return abiDecoder.decodeMethod(input);
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { provider, address } = wallet;

      // for TokenIcon Url
      const isTestNet = true; // will be updated with provider network for mainet Intergration
      function getTokenSymbol(symbol) {
        const tokensList = isTestNet ? testNetToken : mainNetToken;
        return tokensList.find(token => token.symbol === symbol);
      }

      try {
        // block management,
        const latestBlock = await provider.getBlockNumber();
        const etherAPI = latestBlock - 3000;

        const uri = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=${etherAPI}&endblock=tatest&sort=desc&apikey=AATZWFQ47VX3Y1DN7M97BJ5FEJR6MGRQSD`;
        const rewData = await fetch(uri);
        const jsondata = await rewData.json();

        const dataFiltered = jsondata.result
          .filter(items => decodeInput(items.input) !== undefined)
          .map(items => ({
            value: items.value,
            transactionObj: decodeInput(items.input).params,
            timestamp: items.timeStamp,
            transactionfee: items.gasPrice * items.gasUsed,
          }));

        // data ready
        const useruserData = dataFiltered.map(data => ({
          inputAmount:
            Number(data.value) > 0 ? data.value : data.transactionObj[0].value,
          outputAmount:
            Number(data.value) > 0
              ? data.transactionObj[0].value
              : data.transactionObj[1].value,
          tokenIn:
            Number(data.value) > 0
              ? data.transactionObj[1].value[0]
              : data.transactionObj[2].value[0],
          tokenOut:
            Number(data.value) > 0
              ? data.transactionObj[1].value[1]
              : data.transactionObj[2].value[1],
          time: convertToTime(data.timestamp),
          transactionFee: convertFromWei(data.transactionfee),
        }));

        // geting tokens name
        const swapDataForWallet = await Promise.all(
          useruserData.map(async data => ({
            tokenIn: await getTokenDetails(data.tokenIn),
            tokenOut: await getTokenDetails(data.tokenOut),
            amountIn: data.inputAmount,
            amouOut: data.outputAmount,
            time: data.time,
            fee: data.transactionFee,
          })),
        );

        // final modifications
        const userSwapHistory = swapDataForWallet.map(data => ({
          token1Icon: getTokenSymbol(data.tokenIn.symbol).logoURI,
          token2Icon: getTokenSymbol(data.tokenOut.symbol).logoURI,
          token1: data.tokenIn,
          token2: data.tokenOut,
          amountIn: convertFromWei(data.amountIn, data.tokenIn.decimals),
          amountOut: convertFromWei(data.amouOut, data.tokenOut.decimals),
          fee: data.fee,
          time: data.time,
        }));

        sethistoryData(userSwapHistory);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [wallet]);
  return { isLoading, historyData, serverError };
};

export default useGetHistory;
