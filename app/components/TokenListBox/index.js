/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/**
 *
 * TokenListBox
 *
 */
import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isFunc, isNotEmpty, isValidJson } from 'utils/UtilFunc';
import { getTokenList, getTokenDetails, isItAddress } from 'utils/tokens';
import { Image, Spinner } from '@chakra-ui/react';
import {
  storeUserToken,
  deleteUserTokenList,
  importUriTokenList,
  toggleDefaultTokenList,
  toggleMainTokenList,
  toggleUserTokenList,
  setTokenList,
} from 'containers/WalletProvider/actions';
import { ethers } from 'ethers';
import NewTokenModal from './NewTokenModal';
import CurrencyList from './components/CurrencyList';
import ManageToken from './components/ManageToken';
import NullImage24 from '../../assets/Null-48.svg';

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
  toggleDefaultTokenList,
  toggleMainTokenList,
  toggleUserTokenList,
}) {
  const account = wallet.wallet;
  const {
    appTokenList,
    allTokenList,
    toggleDisplay,
    userTokenList,
    mainTokenList,
    defaultTokenList,
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
  useEffect(() => {
    (async () => {
      try {
        const updateTokenListBalance = await setTokenList(
          ExtendedTokenList,
          account,
        );
        setList(updateTokenListBalance);
        setBalanceIsSet(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isOpen, account, manageToken, showCurrencyList, ExtendedTokenList]);

  const deleteToken = address => {
    deleteUserTokenList(address);
    setDeletedToken(true);
  };

  useEffect(() => {
    searchTokens();
  }, [searchToken]);

  const toggleDefaultTokenState = option => toggleDefaultTokenList(option);

  const toggleMainTokenState = option => toggleMainTokenList(option);

  const toggleUserTokenState = option => toggleUserTokenList(option);

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
        appTokenList,
      );
      return setList(tokenArrayList);
    }
    setList(appTokenList);
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

  const Row = (index, key, _style) => (
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
        <NullImage24
          style={{ margin: '17px', borderRadius: '100%', width: '80px' }}
        />
      ) : (
        <Image
          margin="17px"
          src={list[index].logoURI}
          alt=" "
          borderRadius="100%"
          background="whitesmoke"
        />
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
      <Text
        fontSize="md"
        width="100%"
        fontWeight="regular"
        textAlign="right"
        color="#fff"
      >
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
          onOpenModal={onOpenModal}
          allTokenList={allTokenList}
          errorMessage={errorMessage}
          toggleDisplay={toggleDisplay}
          customTokenBox={customTokenBox}
          userTokenState={userTokenList}
          defaultTokenState={defaultTokenList}
          mainTokenState={mainTokenList}
          tokenImportUri={tokenImportUri}
          userCustomToken={userCustomToken}
          userCustomTokenList={userTokenList}
          userTokenAddress={userTokenAddress}
          showErrorMessage={showErrorMessage}
          importCustomToken={importCustomToken}
          userCustomURIList={userCustomURIList}
          deleteToken={deleteToken}
          setManageToken={setManageToken}
          importUriToken={importUriToken}
          setTokenImportUri={setTokenImportUri}
          setUserTokenAddress={setUserTokenAddress}
          setCustomTokenBox={setCustomTokenBox}
          setShowCurrencyList={setShowCurrencyList}
          setSelectedTokenForModal={setSelectedTokenForModal}
          toggleDefaultTokenState={toggleDefaultTokenState}
          toggleMainTokenState={toggleMainTokenState}
          toggleUserTokenState={toggleUserTokenState}
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
    toggleDefaultTokenList,
    toggleMainTokenList,
    toggleUserTokenList,
  },
)(TokenListBox);
