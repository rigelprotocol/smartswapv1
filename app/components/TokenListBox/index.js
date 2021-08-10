/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// @ts-nocheck
/**
 *
 * TokenListBox
 *
 */
import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { isFunc, isNotEmpty, isValidJson } from 'utils/UtilFunc';
import { getTokenList, getTokenDetails, isItAddress } from 'utils/tokens';
import { Image, Spinner } from '@chakra-ui/react';
import {
  storeUserToken,
  deleteUserTokenList,
  importUriTokenList,
  updateTokenListAction,
  toggleDefaultTokenList,
} from 'containers/WalletProvider/actions';
import { ethers } from 'ethers';
import { balanceAbi } from 'utils/constants';
import { getAddressTokenBalance } from 'utils/wallet-wiget/connection';
import NewTokenModal from './NewTokenModal';
import CurrencyList from './components/CurrencyList';
import ManageToken from './components/ManageToken';
import NullImage24 from '../../assets/Null-24.svg';

function TokenListBox({
  setSelectedToken,
  setPathArray,
  getToAmount,
  setSelectedToToken,
  setPathToArray,
  isOpen,
  wallet,
  onClose,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  ExtendedTokenList,
  checkIfLiquidityPairExist,
  storeUserToken,
  importUriTokenList,
  deleteUserTokenList,
  updateTokenListAction,
  toggleDefaultTokenList,
}) {
  const account = wallet.wallet;
  const {
    tokenList,
    userTokenList,
    allTokenList,
    toggleDisplay,
  } = ExtendedTokenList;
  const [list, setList] = useState([]);
  const [searchToken, setSearchToken] = useState('');
  const [manageToken, setManageToken] = useState(false);
  const [balanceIsSet, setBalanceIsSet] = useState(false);
  const [tokenImportUri, setTokenImportUri] = useState('');
  const [userCustomToken, setUserCustomToken] = useState({});
  const [importCustomToken, setImportCustomToken] = useState(false);
  const [customTokenBox, setCustomTokenBox] = useState(false);
  const [userTokenAddress, setUserTokenAddress] = useState('');
  const [showCurrencyList, setShowCurrencyList] = useState(true);
  const [selectedTokenForModal, setSelectedTokenForModal] = useState({});
  const [userCustomTokenList, setUserCustomTokenList] = useState(userTokenList);
  const [userCustomURIList, setUserCustomURIList] = useState({});
  const [updatedToken, setUpdatedToken] = useState(false);
  const [deletedToken, setDeletedToken] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const updateTokenListReducer = async () => {
    const updatedList = await Promise.all(
      tokenList.map(async (token, index) => {
        const { signer } = account;
        let { balance } = token;
        const { symbol, address } = token;
        if (symbol === 'BNB' && signer !== 'signer') {
          ({ balance } = account);
        }
        if (address !== undefined && signer !== 'signer' && symbol !== 'BNB') {
          balance = await getAddressTokenBalance(
            account.address,
            address,
            signer,
          );
        }
        return { ...token, balance };
      }),
    );
    const sortedList = updatedList.sort(
      (a, b) =>
        a.symbol !== 'SELECT A TOKEN' &&
        (a.symbol !== 'RGP' && a.symbol.localeCompare(b.symbol)),
    );
    updateTokenListAction(sortedList);
    return sortedList;
  };
  useEffect(() => {
    (async () => {
      try {
        const updateTokenListBalance = await updateTokenListReducer();
        setList(updateTokenListBalance);
        setBalanceIsSet(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isOpen, account]);

  const deleteToken = address => {
    deleteUserTokenList(address);
    setDeletedToken(true);
  };

  useEffect(() => {
    searchTokens();
  }, [searchToken]);
  const offDefaultTokenList = option => {
    toggleDefaultTokenList(option);
  };
  useEffect(() => {
    setShowErrorMessage(false);
    if (userTokenAddress !== '') {
      (async () => {
        try {
          if (!isItAddress(userTokenAddress)) {
            setUserCustomToken({});
            setImportCustomToken(false);
            throw new Error(
              'Invalid address, please the check address and try again',
            );
          }
          const tokenData = await getTokenDetails(userTokenAddress);
          if (!isNotEmpty(tokenData) && tokenData !== null) {
            setUserCustomToken(tokenData);
            return setImportCustomToken(true);
          }
        } catch (e) {
          setShowErrorMessage(true);
          return setErrorMessage(e.message);
        }
      })();
    }
    setUserCustomToken({});
    return setImportCustomToken(false);
  }, [userTokenAddress]);

  const searchTokens = async () => {
    if (searchToken !== '') {
      const tokenArrayList = await getTokenList(
        searchToken,
        account,
        tokenList,
      );
      return setList(tokenArrayList);
    }
    setList(tokenList);
  };

  useEffect(() => {
    if (updatedToken || deletedToken) {
      setUserCustomTokenList(userTokenList);
    }
  }, [updatedToken, deletedToken]);

  useEffect(() => {
    if (tokenImportUri) {
      (async () => {
        const resolveTokenList = await loadImportData(tokenImportUri);
        if (isValidJson(resolveTokenList)) {
          setUserCustomURIList(resolveTokenList);
        }
      })();
    }
  }, [tokenImportUri]);

  const loadImportData = async uri => ethers.utils.fetchJson(uri);

  const importToken = token => {
    if (importCustomToken) {
      storeUserToken(token);
      setUpdatedToken(true);
      setImportCustomToken(false);
      setUserTokenAddress('');
      isFunc(setSelectedToken) && setSelectedToken(token);
      isFunc(setSelectedToToken) && setSelectedToToken(token);
      isFunc(setPathToArray) && setPathToArray(token.address, token.symbol);
      isFunc(setPathArray) && setPathArray(token.address, token.symbol);
      isFunc(getToAmount) && getToAmount();
      onCloseModal();
      return;
    }
    const changeTokenAvailable = { ...token, available: true, imported: true };
    storeUserToken(changeTokenAvailable);
    isFunc(setSelectedToken) && setSelectedToken(token);
    isFunc(setSelectedToToken) && setSelectedToToken(token);
    isFunc(setPathToArray) && setPathToArray(token.address, token.symbol);
    isFunc(setPathArray) && setPathArray(token.address, token.symbol);
    isFunc(getToAmount) && getToAmount();
    onCloseModal();
    if (isFunc(onClose)) {
      onClose();
      setSearchToken('');
      setSelectedTokenForModal({});
    }
    checkIfLiquidityPairExist();
  };

  const importUriToken = newList => {
    importUriTokenList(newList);
    setTokenImportUri('');
    setUserCustomURIList({});
  };

  const Row = (index, key, style) => (
    <Flex
      key={key}
      justifyContent="space-between"
      mt={1}
      cursor={list[index].symbol !== 'SELECT A TOKEN' ? 'pointer' : 'no-drop'}
      onClick={() => {
        if (list[index].symbol !== 'SELECT A TOKEN') {
          isFunc(setSelectedToken) && setSelectedToken(list[index]);
          isFunc(setSelectedToToken) && setSelectedToToken(list[index]);
          isFunc(setPathToArray) &&
            setPathToArray(list[index].address, list[index].symbol);
          isFunc(setPathArray) &&
            setPathArray(list[index].address, list[index].symbol);
          isFunc(getToAmount) && getToAmount();
          isFunc(onClose) && onClose();
        }
        return null;
      }}
      opacity={list[index].symbol !== 'SELECT A TOKEN' ? 1 : 0.4}
      height="63px"
      borderRadius="10px"
      background="rgba(55, 38, 91, 0.15)"
    >
      {list[index].imported ? (
        <NullImage24 />
      ) : (
        <Image width="10%" margin="17px" src={list[index].logoURI} alt=" " />
      )}
      <Flex flexDirection="column" width="100%" justifyContent="space-around">
        <Text fontSize="md" fontWeight="regular" color="#fff" m={1}>
          {list[index].symbol}
        </Text>
        <Text m={1} style={{ display: 'block', color: '#b3b3b3' }}>
          {list[index].imported && (
            <small style={{ fontSize: 'x-small' }}>
              <em>Added by User </em>
            </small>
          )}
          {list[index].name}
        </Text>
      </Flex>
      <Text fontSize="md" fontWeight="regular" textAlign="left" color="#fff">
        {!balanceIsSet && list[index].available ? (
          '0.0'
        ) : list[index].balance == null && list[index].address !== undefined ? (
          <Spinner size="xs" color="blue.500" />
        ) : (
          list[index].name !== 'Select a token' &&
          list[index].available &&
          `${list[index].balance}`
        )}
        {!list[index].available && (
          <Button
            border="0"
            ml="1"
            bg="#29235eda"
            color="rgba(255, 255, 255, 0.555)"
            borderRadius="15px"
            cursor="pointer"
            _hover={{ color: 'white' }}
            onClick={() => {
              setSelectedTokenForModal(list[index]);
              onOpenModal();
            }}
          >
            Import
          </Button>
        )}
      </Text>
    </Flex>
  );

  return (
    <>
      {showCurrencyList && (
        <CurrencyList
          Row={Row}
          list={list}
          isOpen={isOpen}
          onClose={onClose}
          searchToken={searchToken}
          setSearchToken={setSearchToken}
          setManageToken={setManageToken}
          setShowCurrencyList={setShowCurrencyList}
          toggleDisplay={toggleDisplay}
        />
      )}
      {manageToken && (
        <ManageToken
          isOpen={isOpen}
          onClose={onClose}
          customTokenBox={customTokenBox}
          setManageToken={setManageToken}
          tokenImportUri={tokenImportUri}
          setTokenImportUri={setTokenImportUri}
          userTokenAddress={userTokenAddress}
          setUserTokenAddress={setUserTokenAddress}
          setCustomTokenBox={setCustomTokenBox}
          setShowCurrencyList={setShowCurrencyList}
          userCustomToken={userCustomToken}
          importCustomToken={importCustomToken}
          setSelectedTokenForModal={setSelectedTokenForModal}
          onOpenModal={onOpenModal}
          userCustomTokenList={userTokenList}
          deleteToken={deleteToken}
          showErrorMessage={showErrorMessage}
          errorMessage={errorMessage}
          userCustomURIList={userCustomURIList}
          importUriToken={importUriToken}
          allTokenList={allTokenList}
          toggleDisplay={toggleDisplay}
          offDefaultTokenList={offDefaultTokenList}
        />
      )}
      <NewTokenModal
        onCloseModal={onCloseModal}
        isOpenModal={isOpenModal}
        selectedTokenForModal={selectedTokenForModal}
        importToken={importToken}
      />
    </>
  );
}
TokenListBox.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setSelectedToken: PropTypes.func,
  setPathArray: PropTypes.func,
  getToAmount: PropTypes.func,
  setSelectedToToken: PropTypes.func,
  setPathToArray: PropTypes.func,
  wallet: PropTypes.object,
};
const mapStateToProps = ({ wallet, ExtendedTokenList }) => ({
  wallet,
  ExtendedTokenList,
});

export default connect(
  mapStateToProps,
  {
    storeUserToken,
    deleteUserTokenList,
    importUriTokenList,
    updateTokenListAction,
    toggleDefaultTokenList,
  },
)(TokenListBox);
