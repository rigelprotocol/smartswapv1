/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable no-param-reassign */
import { ethers } from 'ethers';
import { getAddressTokenBalance } from 'utils/wallet-wiget/connection';
import { formatBalance } from 'utils/UtilFunc';
import Web3 from 'web3';
import { approveAbi, allowanceAbi, SMART_SWAP } from '../constants';

export const getTokenListBalance = async (tokenList, account, checker) => {
  tokenList.map(async token => {
    // typeof token.address !== 'undefined' &&
    // account.signer !== 'signer' &&
    if (
      typeof token.address !== 'undefined' &&
      account.signer !== 'signer' &&
      token.symbol === 'BNB'
    ) {
      token.balance = account.balance;
    }
    if (
      typeof token.address !== 'undefined' &&
      account.signer !== 'signer' &&
      token.symbol !== 'BNB'
    ) {
      try {
        token.balance = await getAddressTokenBalance(
          account.address,
          token.address,
          account.signer,
        );
        checker(true);
      } catch (e) {
        console.log(e);
      }
    }
  });
};

export const approveToken = async (
  walletAddress,
  tokenAddress,
  walletSigner,
  amount
) => {
  const walletBal = Number(amount) + 10;
  return await new ethers.Contract(
    tokenAddress,
    approveAbi,
    walletSigner,
  ).approve(SMART_SWAP.SMART_SWAPPING, Web3.utils.toWei(walletBal.toString()), {
    from: walletAddress,
  });
};

export const runApproveCheck = async (token, walletAddress, walletSigner) => {
  if (
    typeof token.address !== 'undefined' &&
    walletSigner !== 'signer' &&
    token.symbol !== 'ETH'
  ) {
    return formatBalance(
      ethers.utils.formatEther(
        await new ethers.Contract(
          token.address,
          allowanceAbi,
          walletSigner,
        ).allowance(walletAddress, SMART_SWAP.SMART_SWAPPING, {
          from: walletAddress,
        }),
      ),
    );
  }
};

/**
export function setPathObject(path, target) {
  const pathObject = path.find(value => value.hasOwnProperty('fromPath'));
  if (pathObject) pathObject.fromPath = target;
  else path.push({ fromPath: target });
}

export async function RGPCheckAllowance() {
  if (wallet.signer !== 'signer') {
    const rgp = await rigelToken();
    const walletBal = await rgp.balanceOf(wallet.address);
    return await rgp.allowance(wallet.address, SMART_SWAP.MasterChef, { from: wallet.address });
  }
}

export async function ETHCheckAllowance() {
  if (wallet.signer !== 'signer') {
    const eth = await WETH();
    const walletBal = await eth.balanceOf(wallet.address);
    return await eth.allowance(wallet.address, SMART_SWAP.router, { from: wallet.address });
  }
}

export async function BUSDCheckAllowance() {
  if (wallet.signer !== 'signer') {
    const busd = await BUSDToken();
    return await busd.allowance(wallet.address, SMART_SWAP.router, { from: wallet.address });
  }
}

export const checkUser = async (wallet, setIsNewUser) => {
  const rgp = await rigelToken();
  if (wallet.signer !== 'signer') {
    const checkAllow = await rgp.allowance(wallet.address, SMART_SWAP.MasterChef);
    if (checkAllow == setIsNewUser(true)) {
      return setIsNewUser(true)
    }
    return setIsNewUser(false)
  }
  if (ethers.utils.formatEther(checkAllow).toString() > 0) {
    return setIsNewUser(false)
  }
  return setIsNewUser(true)
} */
