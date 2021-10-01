import { useEffect, useState } from 'react';
import abiDecoder from 'abi-decoder';
import { convertFromWei } from 'utils/UtilFunc';
import testNetToken from '../../utils/test-net-tokens.json';
import mainNetToken from '../../utils/main-token.json';
import SmartSwapRouter02 from '../../utils/abis/swapAbiForDecoder.json';
import { getTokenDetails } from '../../utils/tokens';
import tokenImage from '../../assets/tokenImg.png'
import Web3 from 'web3';

const useGetMarketHistory = wallet => {
    const [isLoadingMarket, setIsLoadingMarket] = useState(false);
    const [marketHistoryData, setMarketHistoryData] = useState(null);
    const [serverError, setServerError] = useState(null);


    abiDecoder.addABI(SmartSwapRouter02);

    function decodeInput(input) {
        return abiDecoder.decodeMethod(input);
    }

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



    useEffect(() => {
        setIsLoadingMarket(true);
        const fetchData = async () => {
            const { provider, address } = wallet;

            // Testnet or Mainet
            const { chainId } = await provider.getNetwork();
            const isTestNet = chainId === 97;

            function getTokenSymbol(symbol) {
                const tokensList = isTestNet ? testNetToken : mainNetToken;
                let tokenIconOnList = tokensList.find(token => token.symbol === symbol);
                if (!tokenIconOnList) {
                    return tokenImage
                }
                return tokenIconOnList.logoURI
            }

            try {
                // block management,
                const latestBlock = await provider.getBlockNumber();
                const fromBlock = latestBlock - 1000;


                const uri = `https://api${isTestNet ? '-testnet.bscscan.com' : '.bscscan.com'
                    }/api?module=account&action=txlistinternal&startblock=${fromBlock}&endblock=latest
                    &sort=desc&apikey=IBJ54QKDBFBHGMENPSD7HA868A42BKPYBJ`;


                const rawTrxn = await fetch(uri);
                const dataJson = await rawTrxn.json();


                //filtere repeated feild

                // const uniqueObjects = [... new Map(dataJson.result.map(item => [item.hash, item])).values()]

                const firstData = await Promise.all(
                    dataJson.result.map(async data => ({
                        trxObj: await provider.getTransaction(data.hash),
                        timeStamp: data.timeStamp,
                        value: data.value,
                        hash: data.hash,
                        fee: data.gas * data.gasUsed
                    })),
                );




                //  console.log("before", uniqueObjects)

                const dataFiltered = firstData
                    .filter(items => decodeInput(items.trxObj.data) !== undefined)//&& decodeInput(items.input).params.length == 5)

                    .map(items => ({
                        transactionObj: decodeInput(items.trxObj.data).params,
                        timestamp: items.timeStamp,
                        transactionfee: items.fee,
                        value: items.value,
                        obj: items.trxObj,
                        hash: items.hash
                    }));

                console.log("Object", dataFiltered)
                const marketData = dataFiltered.map(data => ({
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
                            ? data.transactionObj[1].value[data.transactionObj[1].value.length - 1]
                            : data.transactionObj[2].value[data.transactionObj[2].value.length - 1],
                    time: convertToTime(data.timestamp),
                    transactionFee: convertFromWei(data.transactionfee),
                    hash: data.hash
                }));


                let listImems = marketData.filter(items => items.tokenIn.length > 40 && items.outputAmount.length > 10)



                const swapDataForWallet = await Promise.all(
                    listImems.map(async data => ({
                        tokenIn: await getTokenDetails(data.tokenIn),
                        tokenOut: await getTokenDetails(data.tokenOut),
                        amountIn: data.inputAmount,
                        amouOut: data.outputAmount,
                        time: data.time,
                        fee: data.transactionFee,
                        hash: data.hash
                    })),
                );


                const uniqueObjects = [... new Map(swapDataForWallet.map(item => [item.hash, item])).values()]


                const marketHistory = uniqueObjects.map(data => ({
                    token1Icon:
                        getTokenSymbol(data.tokenIn.symbol),
                    token2Icon:
                        getTokenSymbol(data.tokenOut.symbol),
                    token1: data.tokenIn,
                    token2: data.tokenOut,
                    amountIn: convertFromWei(data.amountIn, data.tokenIn.decimals),
                    amountOut: convertFromWei(data.amouOut, data.tokenOut.decimals),
                    fee: data.fee,
                    time: data.time,
                }));

                setMarketHistoryData(marketHistory);
                setIsLoadingMarket(false);
            } catch (error) {
                setServerError(error);
                setIsLoadingMarket(false);
            }
        };

        fetchData();
    }, [wallet]);
    return { marketHistoryData, isLoadingMarket, serverError };
};

export default useGetMarketHistory;
