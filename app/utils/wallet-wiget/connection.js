import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { notify } from 'containers/NoticeProvider/actions';
import configureStore from 'configureStore';
import { WALLET_CONNECTED } from 'containers/WalletProvider/constants';
import { formatBalance } from 'utils/UtilFunc';
import { balanceAbi } from '../constants';
const store = configureStore();

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
  walletSigner,
) =>
  formatBalance(
    ethers.utils.formatEther(
      await new ethers.Contract(
        tokenAddress,
        balanceAbi,
        walletSigner,
      ).balanceOf(address),
    ),
  );
/**
 *
 * @param {*} wallet
 * @returns {*} dispatch
 */
export const connectionEventListener = wallet => dispatch => {
  if (
    window.ethereum.isConnected() &&
    window.ethereum.selectedAddress &&
    window.ethereum.isMetaMask
  ) {
    const reduxWallet = store.getStore().wallet;
    window.ethereum.on('connect', (...args) => {
      console.log('Hello>>> ', args);
      dispatch({
        type: WALLET_CONNECTED,
      });
    });
    window.ethereum.on('chainChanged', chainId => {
      dispatch({
        type: WALLET_CONNECTED,
        wallet: { ...reduxWallet, chainId },
      });
      console.log(chainId);
    });

    window.ethereum.on('accountsChanged', async accounts => {
      if (accounts.length === 0) {
        disconnectUser();
        console.log('>>> are you leaving');
      } else if (accounts[0] !== wallet.address) {
        const address = accounts[0];
      }
    });
    window.ethereum.on('disconnect', error => {
      disconnectUser();
    });
  }
  console.log('Hello All');
  return true;
};

export function disconnectUser() {
  console.log('>>>> Hello All');
}
// Object.fromEntries( Object.entries(TOKENS_CONTRACT).filter(([key, value]) => key === symbol))
export const setupNetwork = async () => {
  console.log('Check Network')
  const walletProvider = window.ethereum;
  if (walletProvider !== undefined && walletProvider.isTrust) {
    const chainId = 38;
    const deviceChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });
    if (deviceChainId !== '0x38') {
      try {
        await walletProvider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString()}`,
              chainName: 'Smart Chain',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'bnb',
                decimals: 18,
              },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ],
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};
