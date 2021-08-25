import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
// import { convertToWei } from '../../utils/UtilFunc'
// import { convertToNumber } from '../../utils/constants'
// import ETHRGPSMARTSWAPPAIR from '../../utils/abis/ETHRGPSMARTSWAPPAIR.json'
// import { SmartFactory } from '../../utils/SwapConnect';

const useGetHistory = wallet => {
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [serverError, setServerError] = useState(null);

  /*
  const decodeApi = async (data) => {
    const decodedData = []
    await ethers.utils.defaultAbiCoder.decode(['uint', 'uint', 'uint', 'uint',], data).forEach(element => {
      decodedData.push(element) //.toString(10)
    });
    return decodedData
  } */

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { provider, address } = wallet;

      const contractAddress1 = '0xca01606438556b299005b36b86b38fe506eadf9f';
      const contractAddress2 = '0x120f3E6908899Af930715ee598BE013016cde8A5';
      const contractAddress3 = '0x0B0a1E07931bD7991a104218eE15BAA682c05e01';

      const eventTopic =
        '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822'; // event Signature for Swap() event converted Hex
      const walletTopic = ethers.utils.hexZeroPad(address, 32); // User's Addres param as event topic
      const newBlocks = (await provider.getBlockNumber()) - 1000;

      function getLogFromContract(contractAddress) {
        return provider.getLogs({
          address: contractAddress,
          topics: [eventTopic, null, walletTopic],
          fromBlock: newBlocks,
          toBlock: 'latest',
        });
      }
      try {
        const allTransactions = [];
        const contractAddressLog1 = await getLogFromContract(contractAddress1);
        const contractAddressLog2 = await getLogFromContract(contractAddress2);
        const contractAddressLog3 = await getLogFromContract(contractAddress3);

        allTransactions.push(
          ...contractAddressLog1,
          ...contractAddressLog2,
          ...contractAddressLog3,
        );

        sethistoryData(allTransactions);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setServerError(error);
        setIsLoading(false);
      }
      /*
      //using bscscan API
      let uri = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=latest-1000&endblock=latest&sort=asc&apikey=AATZWFQ47VX3Y1DN7M97BJ5FEJR6MGRQSD`
      const data = await fetch(uri)
      const dataJson = await data.json()
      const newArray = dataJson.result.map(log => ({ data: decodeApi(log.input), input: log.input, hash: log.hash }));
      */
    };

    fetchData();
  }, [wallet]);

  return { isLoading, historyData, serverError };
};

export default useGetHistory;
