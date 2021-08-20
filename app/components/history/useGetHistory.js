import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// import { SmartFactory } from '../../utils/SwapConnect';

const useGetHistory = walletProvider => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [serverError, setServerError] = useState(null);

  /* const decodeApi = (data) => {
     const decoder = new ethers.utils.AbiCoder();
     const decodedData = abiCoder.decode(["uint[]", "string"], data)
     return decodedData
   } */

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // const smartFactoryContract = await SmartFactory();
        const contractAddress = '0xca01606438556b299005b36b86b38fe506eadf9f'; // smartFactoryContract.address;
        const { provider } = walletProvider;
        const userAddress = walletProvider.address;
        const eventTopic =
          '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'; // '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9';

        const logs = await provider.getLogs({
          address: contractAddress,
          topics: [eventTopic, null, ethers.utils.hexZeroPad(userAddress, 32)],
          fromBlock: 0,
        });

        // const decodedLogs = logs.map(log => ({ decodedData: log.data, topics: log.topic }));

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
