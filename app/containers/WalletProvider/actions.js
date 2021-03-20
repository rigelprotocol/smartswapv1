/* eslint-disable prettier/prettier */
/*
 *
 * WalletProvider actions
 *
 */

import { NOTICE } from 'containers/NoticeProvider/constants';
import {
  connectMetaMask,
  getAddressTokenBalance,
  provider,
  signer,
} from 'utils/wallet-wiget/connection';
import { ethers } from 'ethers';
import { TOKENS_CONTRACT } from 'utils/constants';
import RigelToken from 'utils/abis/RigelToken.json';
import {
  DEFAULT_ACTION,
  WALLET_CONNECTED,
  WALLET_PROPS,
  LOADING_WALLET,
  CLOSE_LOADING_WALLET,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const connectWallet = () => async dispatch => {
  dispatch({ type: LOADING_WALLET, payload: true });
  const ethProvider = await provider();
  const walletSigner = await signer()
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  connectMetaMask().then(async (res) => {
    dispatch({
      type: NOTICE, message: {
        title: 'Success:',
        body: 'Connection was successful',
        type: 'success',
      }
    })
    dispatch({ type: CLOSE_LOADING_WALLET, payload: false });
    dispatch({
      type: WALLET_CONNECTED, wallet: {
        address: res[0],
        provider: ethProvider, signer: walletSigner, chainId,
      },
    })
    const balance = await ethProvider.getBalance(res[0]);
    dispatch({
      type: WALLET_CONNECTED, wallet: {
        address: res[0], balance: ethers.utils.formatEther(balance).toString(),
        provider: ethProvider, signer: walletSigner, chainId,
      },
    });
    return dispatch({ type: WALLET_PROPS, payload: { rgp: await getAddressTokenBalance(res[0], TOKENS_CONTRACT.RGP, RigelToken, walletSigner) } });

  })
    .catch(e => {
      dispatch({ type: CLOSE_LOADING_WALLET, payload: false });
      return dispatch({
        type: NOTICE, message: {
          title: 'Connection Error:',
          body: e.message,
          type: 'error',
        }
      });
    })
};

export const setWalletProps = wallet => dispatch =>
  dispatch({
    type: WALLET_PROPS,
    payload: wallet,
  });

export function connectingWallet(option) {
  return dispatch => {
    dispatch({
      type: option ? LOADING_WALLET : CLOSE_LOADING_WALLET,
      payload: !!option,
    });
  };
}

/**
 *
 * @param {*} tokens
 */
// export const getTokenBalance = async (tokens = []) => {
//   for (let index = 0; index < tokens.length; index++) {
//     const element = array[index];
//     await getAddressTokenBalance('wallet_address', 'tokenAddress', 'TokenAbi', 'signer')

//   }
// }
