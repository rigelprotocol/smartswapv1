// @ts-nocheck
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
import { formatBalance } from 'utils/UtilFunc';
import {
  WALLET_CONNECTED,
  WALLET_PROPS,
  LOADING_WALLET,
  CLOSE_LOADING_WALLET,
  CLEAR_WALLET,
  CHANGE_DEADLINE
} from './constants';
import { assignRef } from '@chakra-ui/react';

export const reConnect = (wallet) => async dispatch => {
  try {
    const { selectedAddress, chainId } = wallet;
    const ethProvider = await provider();
    const walletSigner = await signer();
    const balance = formatBalance(ethers.utils.formatEther(await ethProvider.getBalance(selectedAddress))).toString();
    console.log(TOKENS_CONTRACT.RGP)
    const rgpBalance = await getAddressTokenBalance(selectedAddress, TOKENS_CONTRACT.RGP, walletSigner);
    dispatch({
      type: WALLET_CONNECTED, wallet: {
        address: selectedAddress,
        provider: ethProvider, signer: walletSigner, chainId, balance
      },
    })
    dispatch({ type: WALLET_PROPS, payload: { rgpBalance } });

  } catch (e) {
    return dispatch({
      type: NOTICE, message: {
        title: 'Connection Error:',
        body: e.message,
        type: 'error',
      }
    });
  }

}

export const connectWallet = () => async dispatch => {
  try {
    dispatch({ type: LOADING_WALLET, payload: true });
    const ethProvider = await provider();
    const walletSigner = await signer()
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const res = await connectMetaMask();
    dispatch({ type: CLOSE_LOADING_WALLET, payload: false });
    const balance = await ethProvider.getBalance(res[0]);
    const rgpBalance = await getAddressTokenBalance(res[0], TOKENS_CONTRACT.RGP, walletSigner);
    dispatch({
      type: WALLET_CONNECTED, wallet: {
        address: res[0], balance: formatBalance(ethers.utils.formatEther(balance)),
        provider: ethProvider, signer: walletSigner, chainId,
      },
    });
    dispatch({ type: WALLET_PROPS, payload: { rgpBalance } });
    return dispatch({
      type: NOTICE, message: {
        title: 'Success:',
        body: 'Connection was successful',
        type: 'success',
      }
    })
  } catch (e) {
    dispatch({ type: CLOSE_LOADING_WALLET, payload: false });
    return dispatch({
      type: NOTICE, message: {
        title: 'Connection Error:',
        body: e.message,
        type: 'error',
      }
    });
  }

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

export const disconnectWallet = () => dispatch => {
  dispatch({ type: CLEAR_WALLET, payload: null });
}
export const changeDeadlineValue = value => dispatch => {
  dispatch({ type: CHANGE_DEADLINE, payload: value })
}
