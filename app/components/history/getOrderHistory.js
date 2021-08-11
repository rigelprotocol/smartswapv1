// import { convertFromWei } from '../../utils/UtilFunc';
/*
async function getHashDetail(wallet, hash) {
  try {
    const web3 = new Web3(wallet.provider);

    web3.eth.getTransaction(hash, function(error, result) {
      return result;
    });
  } catch (error) {
    console.log(error);
  }

  
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "eth_getTransactionByHash",
      "params": [
        hash
      ],
      "id": 0
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
  
    try {
  
      const hashDetails = await fetch("https://api.theapis.io/api/v1/rpc/binance-smart-chain?apiKey=d173be6f-fba1-45f9-bfeb-2917fbba510c&network=testnet", requestOptions)
  
      const hashDetailsJson = await hashDetails.json()
  
      return hashDetailsJson
    } catch (error) {
      console.log(error)
    }
    
} */

export async function getWalletHistory(walletAddress) {
  // const HistoryData = [];
  const uri = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${walletAddress}&startblock=1&endblock=99999999&sort=asc&apikey=AATZWFQ47VX3Y1DN7M97BJ5FEJR6MGRQSD`;

  try {
    const data = await fetch(uri);
    const addressHistroy = await data.json();

    // filter the collection  for the router contract "0x00749e00af4359df5e8c156af6dfbdf30dd53f44"
    const filtteredTransfer = addressHistroy.result.filter(
      transaction =>
        transaction.to === '0x00749e00af4359df5e8c156af6dfbdf30dd53f44',
    );

    // map  and getOnly the hashes for all users Transactions
    const transactionHashes = await filtteredTransfer.map(
      transactions => transactions.hash,
    );

    // get the Transaction details for all hashes
    // transactionHashes.forEach(hash => {
    // HistoryData.push(getHashDetail(hash))
    // });

    return transactionHashes;
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

/*
export async function fetchHistroyData(wallet) {
  //const rgbContract = await rigelToken();
  //const router_contract = await router();
  //const provider = await getProvider();

  // const myTransfers = await rgbContract.filters.Transfer(null, wallet);

  // let eventFilter = await router_contract.filters.ContractEvent();
  // const address = await router_contract.address;
  ////
  /*

    var raw = "{\n    \"jsonrpc\":\"2.0\",\n    \"method\":\"eth_getLogs\",\n    \"params\":[{\"topics\":[{\"address\": \"0x00749e00Af4359Df5e8C156aF6dfbDf30dD53F44\",\"topics\": [\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\"],\"blockHash\": \"0x8243343df08b9751f5ca0c5f8c9c0460d8a9b6351066fae0acbd4d3e776de8bb\"}],\n    \"id\":0\n}";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }; */

/*

fetch("https://api.theapis.io/api/v1/rpc/ethereum", {
crossDomain: true,
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: {
  "jsonrpc": "2.0",
  "method": "eth_getLogs",

  "params": [{ "topics": [{ "address": "0x00749e00Af4359Df5e8C156aF6dfbDf30dD53F44" }] }]
}
})
.then(response => response.json())
.then((result) => {
  return result
})
.catch(error => console.log('error', error));

}
*/
