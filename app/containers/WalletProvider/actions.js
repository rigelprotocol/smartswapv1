/* eslint-disable prettier/prettier */
/*
 *
 * WalletProvider actions
 *
 */

import { NOTICE } from 'containers/NoticeProvider/constants';
import {
  connectMetaMask,
  provider,
  signer,
} from 'utils/wallet-wiget/connection';
import { ethers } from 'ethers';
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
    //
    return dispatch({
      type: WALLET_CONNECTED, wallet: {
        address: res[0], balance: ethers.utils.formatEther(balance).toString(),
        provider: ethProvider, signer: walletSigner, chainId,
      },
    });
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
  console.log(option);
  return dispatch => {
    dispatch({
      type: option ? LOADING_WALLET : CLOSE_LOADING_WALLET,
      payload: !!option,
    });
  };
}
