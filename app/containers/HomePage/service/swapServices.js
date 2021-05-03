/* eslint-disable no-return-await */
import { ethers } from 'ethers';
import { router, updateOutPutAmountForRouter } from 'utils/SwapConnect';
import Web3 from 'web3';

export const swapExactTokensForToken = async (
  amountIn,
  amountOutMin,
  path,
  to,
  deadline,
) => {
  const { swapExactTokensForTokens } = await router();
  return await swapExactTokensForTokens(
    Web3.utils.toWei(amountIn.toString()),
    Web3.utils.toWei(amountOutMin.toString()),
    [
      ethers.utils.getAddress(path[0].fromPath),
      ethers.utils.getAddress(path[1].toPath),
    ],
    to,
    deadline,
    {
      from: to,
    },
  );
};

export const swapExactTokensForEthereum = async (
  amountIn,
  amountOutMin,
  path,
  to,
  deadline,
) => {
  const { swapExactTokensForETH } = await router();
  return await swapExactTokensForETH(
    Web3.utils.toWei(amountOutMin.toString()),
    [
      ethers.utils.getAddress(path[0].fromPath),
      ethers.utils.getAddress(path[1].toPath),
    ],
    to,
    deadline,
    {
      from: to,
      value: amountIn,
    },
  );
};

export const getAmountToSendOut = async (askAmount, path, field) => {
  const { getAmountsOut } = await router();
  return await getAmountsOut(
    Web3.utils.toWei(askAmount.toString()),
    field !== 'to'
      ? [path[0].fromPath, path[1].toPath]
      : [path[1].toPath, path[0].fromPath],
  );
};

export const swapEthForExactToken = async (
  amountIn,
  amountOutMin,
  path,
  deadLine,
  to,
) => {
  const { swapETHForExactTokens } = await router();
  return await swapETHForExactTokens(
    Web3.utils.toWei(amountIn.toString()),
    Web3.utils.toWei(amountOutMin.toString()),
    [
      ethers.utils.getAddress(path[0].fromPath),
      ethers.utils.getAddress(path[1].toPath),
    ],
    to,
    deadLine,
    {
      from: to,
      value: amountIn,
    },
  );
};

export const getTransactionCount = async hash => {
  try {
    if (hash !== undefined) {
      const web3 = new Web3(window.ethereum);
      const trx = await web3.eth.getTransaction(hash.toString());
      const currentBlock = await web3.eth.getBlockNumber();
      const receipt = await web3.eth.getTransactionReceipt(hash.toString());
      console.log(hash, receipt);
      const confirmations =
        trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber;
      if (receipt !== null) {
        const { status } = receipt;
        return { confirmations, status };
      }
      return confirmations;
    }
  } catch (error) {
    console.log(error);
  }
};

export const waitForTransaction = async hash => {
  const res = await fetch(
    `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=BPPBU4V7U79BM8NESWJ4AXQWM68AQVPQ35`,
  );
  console.log(res);
  const { status } = await res.json();
  return status;
};

export const transactionIsConfirm = async (
  changeState,
  hash,
  confirmationCount = 10,
) => {
  setTimeout(async () => {
    const transaction = await getTransactionCount(hash);
    if (transaction !== undefined) {
      if (
        transaction.confirmations >= confirmationCount &&
        transaction.status
      ) {
        changeState(false);
        return;
      }
      await transactionIsConfirm(hash);
    }
  }, 15 * 1000);
};

export const getPriceForToken = async (wallet, fromToken, toToken) => {
  if (wallet.signer !== 'signer') {
    const rout = await updateOutPutAmountForRouter();
    const fromPath = ethers.utils.getAddress(fromToken.address);
    const toPath = ethers.utils.getAddress(toToken.address);
    const valueToCheck = 1;
    const checkPriceOfOne = Web3.utils.toWei(valueToCheck.toString());
    const getValue =
      fromPath === toPath
        ? '1000000000000000000,1000000000000000000'
        : await rout.getAmountsOut(checkPriceOfOne, [fromPath, toPath]);
    return getValue.toString();
  }
};
// 150000
