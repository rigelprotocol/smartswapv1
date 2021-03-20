import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { notify } from 'containers/NoticeProvider/actions';

export const provider = async () => {
  try {
    let ethProvider = await detectEthereumProvider();
    if (ethProvider !== window.ethereum && window.ethereum !== 'undefined') {
      ethProvider = window.ethereum;
      return new ethers.providers.Web3Provider(ethProvider);
    }
    return new ethers.providers.Web3Provider(ethProvider);
  } catch (e) {
    return notify({
      title: 'System Error',
      body: 'You have not installed MetaMask Wallet',
      type: 'error',
    });
  }
};

export const signer = async () => (await provider()).getSigner();

export const connectMetaMask = async () =>
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

export const getAddressTokenBalance = async (
  address,
  tokenAddress,
  ABI,
  walletSigner,
) =>
  ethers.utils
    .formatEther(
      await new ethers.Contract(tokenAddress, ABI, walletSigner).balanceOf(
        address,
      ),
    )
    .toString();

// Object.fromEntries( Object.entries(TOKENS_CONTRACT).filter(([key, value]) => key === symbol))