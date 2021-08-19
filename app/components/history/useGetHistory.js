import { useEffect, useState } from 'react';

import { SmartFactory } from '../../utils/SwapConnect';

const useGetHistory = walletProvider => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const smartFactoryContract = await SmartFactory();
        const contractAddress = smartFactoryContract.address;
        const provider = walletProvider;
        const eventTopic =
          '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9';

        const logs = await provider.getLogs({
          address: contractAddress,
          topics: [eventTopic],
          fromBlock: 0,
        });
        sethistoryData(logs);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [walletProvider]);

  return { isLoading, historyData, serverError };
};

export default useGetHistory;
