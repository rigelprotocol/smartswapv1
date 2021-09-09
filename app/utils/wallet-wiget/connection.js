import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { notify } from 'containers/NoticeProvider/actions';
import configureStore from 'configureStore';
import { WALLET_CONNECTED } from 'containers/WalletProvider/constants';
import { formatBalance, convertFromWei } from 'utils/UtilFunc';
import {supportedChainIds} from 'utils/wallet-wiget/connection'
import { balanceAbi, decimalAbi } from '../constants';
import {BscConnector} from "@binance-chain/bsc-connector"
const { store } = configureStore();

// CREATE A BSCPROVIDER AND BSCSIGNER THAT WILL INTERACT WITH BINANCE WALLET
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
export const bsc = new BscConnector({
  supportedChainIds // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})
export const binanceProvider = ()=>{
  let newProvider
  try {
    if (window.BinanceChain !== 'undefined') {
     newProvider = window.BinanceChain;
    return new ethers.providers.Web3Provider(newProvider);
    }
    // return new ethers.providers.Web3Provider(bscProvider);
  } catch (e) {
    return notify({
      title: 'System Error',
      body: 'You have not installed Binance Wallet',
      type: 'error',
    });
  }
}

export const signer = async () => (await provider()).getSigner();

export const binanceSigner = () => (binanceProvider()).getSigner();

export const connectMetaMask = async () =>
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
export const connectBinance = async () =>
 await window.BinanceChain.request({
    method: 'eth_requestAccounts',
  })


export const getAddressTokenBalance = async (
  address,
  tokenAddress,
  walletSigner,
) =>
  {
    return formatBalance(
    convertFromWei(
      await new ethers.Contract(
        tokenAddress,
        balanceAbi,
        walletSigner,
      ).balanceOf(address),
      await new ethers.Contract(
        tokenAddress,
        decimalAbi,
        walletSigner,
      ).decimals(),
    ),
  );}
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

export function disconnectUser() {}
// Object.fromEntries( Object.entries(TOKENS_CONTRACT).filter(([key, value]) => key === symbol))
export const setupNetwork = async () => {
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
        return false;
      }
    }
  }
};

export const supportedNetworks = ['0x61', '0x38', 'chainId'];

export const isSupportedNetwork = chainId =>
  supportedNetworks.includes(chainId);

const checkMetamask = async () => {
  const provider = await detectEthereumProvider();
  return !!provider;
};

export const switchToBSC = async () => {
  if ( window.ethereum &&
    window.ethereum.isConnected() &&
    window.ethereum.selectedAddress &&
    window.ethereum.isMetaMask &&
    props.state.wallet.connected) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        addBSCToMetamask();
      }
      // handle other  errors codes
    }
  }else if(window.BinanceChain && window.BinanceChain.isConnected()){
    try {
      // await window.BinanceChain.request({
      //   method: 'switchNetwork',
      //   params: [{ chainId: '0x38' }],
      // });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
      }
      // handle other  errors codes
    }
  }
};

const addBSCToMetamask = async () => {
  try {
    await ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x38',
          chainName: 'Smart Chain',
          nativeCurrency: {
            name: 'BSC Mainet',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://bsc-dataseed.binance.org/'],
          blockExplorerUrls: ['https://bscscan.com/'],
        },
      ],
    });
  } catch (addError) {
    console.log(addError);
  }
};
