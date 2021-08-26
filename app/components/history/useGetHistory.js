import { useEffect, useState } from 'react';
// import { convertToWei } from '../../utils/UtilFunc'
//import { convertToWei } from 'utils/UtilFunc';
import { convertToNumber } from '../../utils/constants';
// import ETHRGPSMARTSWAPPAIR from '../../utils/abis/ETHRGPSMARTSWAPPAIR.json'
//import { SmartFactory, SMARTFACTORYPAIRETHRGP } from '../../utils/SwapConnect';
//import { getTokenDetails } from '../../utils/tokens';

const useGetHistory = wallet => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { provider, address } = wallet;
      const SmartFactoryInstance = await SMARTFACTORYPAIRETHRGP();

      try {
        const latestBlock = await provider.getBlockNumber();
        const fromBlocks = latestBlock - 1000;

        //  eventSignature: "Swap(address,uint256,uint256,uint256,uint256,address)"
        const filterFrom = SmartFactoryInstance.filters.Swap(
          null,
          null,
          null,
          null,
          null,
          address,
        );

        // gets event log with filtered parameters from smart contract
        const logs = await SmartFactoryInstance.queryFilter(
          filterFrom,
          fromBlocks,
          'latest',
        );

        // extract events values
        const decodedSwapValue = logs.map(log => ({
          sender: log.args.sender,
          amount0In: convertToNumber(log.args.amount0In._hex),
          amount1Out: convertToNumber(log.args.amount1Out._hex),
          to: log.args.to,
        }));

        sethistoryData(decodedSwapValue);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [wallet]);
  return { isLoading, historyData, serverError };
};

export default useGetHistory;
