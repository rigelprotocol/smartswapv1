import { useEffect, useState } from 'react';
import abiDecoder from 'abi-decoder';
import { convertFromWei } from 'utils/UtilFunc';
import { convertToNumber } from '../../utils/constants';
import testNetToken from '../../utils/test-net-tokens.json';
import mainNetToken from '../../utils/main-token.json';
import SmartSwapRouter02 from '../../utils/abis/SmartSwapRouter02.json';
import { SMARTFACTORYPAIRETHRGP } from '../../utils/SwapConnect';
import { getTokenDetails } from '../../utils/tokens';

const useGetHistory = wallet => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      abiDecoder.addABI(SmartSwapRouter02);

      const { provider, address } = wallet;
      const SmartFactoryInstance = await SMARTFACTORYPAIRETHRGP();

      // for TokenIcon Url
      const isTestNet = true;
      function getTokenSymbol(symbol) {
        const tokensList = isTestNet ? testNetToken : mainNetToken;
        return tokensList.find(token => token.symbol === symbol);
      }

      try {
        // block management,
        const latestBlock = await provider.getBlockNumber();
        const fromBlocks = latestBlock - 1000;

        /*
                const etherAPI = latestBlock - 3000;
                let router = '0x00749e00af4359df5e8c156af6dfbdf30dd53f44'
                let uri = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=${etherAPI}&endblock=tatest&sort=asc&apikey=AATZWFQ47VX3Y1DN7M97BJ5FEJR6MGRQSD`
                let rewData = await fetch(uri)
                let data = await rewData.json()
        */

        // eventSignature: "Swap(address,uint256,uint256,uint256,uint256,address)"
        const filterFrom = SmartFactoryInstance.filters.Swap(
          null,
          null,
          null,
          null,
          null,
          address,
        );

        // querry the Blockchain event log with filtered parameters from smart contract
        const swapEventlogs = await SmartFactoryInstance.queryFilter(
          filterFrom,
          fromBlocks,
          'latest',
        );



        // extract events values that are relivant  for ui
        const decodedSwapValue = await Promise.all(
          swapEventlogs.map(async log => ({
            sender: log.args.sender,
            amount0In: convertToNumber(log.args.amount0In._hex),
            amount1Out: convertToNumber(log.args.amount1Out._hex),
            to: log.args.to,
            trabsactionOBJ: await log.getTransaction(), // returns the swapETHForExactTokens()
          })),
        );

        const decodedOutput = await Promise.all(
          decodedSwapValue.map(async data => ({
            // sender: data.sender,
            gas: convertToNumber(data.trabsactionOBJ.gasPrice._hex),
            amount0In: data.amount0In,
            amount1Out: data.amount1Out,
            blocknumber: data.trabsactionOBJ.blockNumber,
            address1: await getTokenDetails(
              abiDecoder.decodeMethod(data.trabsactionOBJ.data).params[1]
                .value[0],
            ), // first token
            address2: await getTokenDetails(
              abiDecoder.decodeMethod(data.trabsactionOBJ.data).params[1]
                .value[1],
            ), // second token
          })),
        );

        // format and return data to UI
        const userSwapHistory = decodedOutput.map(outputs => ({
          token1Icon: getTokenSymbol(outputs.address1.symbol).logoURI,
          token2Icon: getTokenSymbol(outputs.address2.symbol).logoURI,
          token1: outputs.address1,
          token2: outputs.address2,
          amountIn: convertFromWei(
            outputs.amount0In,
            outputs.address1.decimals,
          ),
          amountOut: convertFromWei(
            outputs.amount1Out,
            outputs.address2.decimals,
          ),
          blockNumber: outputs.blocknumber,
          gassFee: convertFromWei(outputs.gas),
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
