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
import {
  storeUserToken,
  deleteUserTokenList,
  importUriTokenList,
} from 'containers/WalletProvider/actions';
import { ethers } from 'ethers';
import NewTokenModal from './NewTokenModal';
import CurrencyList from './components/CurrencyList';
import ManageToken from './components/ManageToken';
import { balanceAbi } from '../../utils/constants';

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
  deleteUserTokenList,
  importUriTokenList,
}) {
  const account = wallet.wallet;
  const { tokenList, userTokenList, allTokenList } = ExtendedTokenList;
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
        setList(
          await Promise.all(
            tokenList.map(async (token, index) => {
              const { signer } = account;
              let { balance } = token;
              const { symbol, address } = token;
              if (symbol === 'BNB' && signer !== 'signer') {
                ({ balance } = account);
              }
              if (
                address !== undefined &&
                signer !== 'signer' &&
                symbol !== 'BNB'
              ) {
                balance = (await new ethers.Contract(
                  address,
                  balanceAbi,
                  signer,
                ).balanceOf(account.address)).toString();
              }
              return { ...token, balance };
            }),
          ),
        );
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
    return setList(tokenList);
  }, [searchToken]);

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
      const tokenArrayList = await getTokenList(searchToken, account, list);
      return setList(tokenArrayList);
    }
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
      onCloseModal();
      return;
    }
    token.available = true;
    token.imported = true;
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

  const Row = ({ index, key, style }) => (
    <Flex
      key={key}
      justifyContent="space-between"
      mt={1}
      cursor="pointer"
      onClick={() => {
        isFunc(setSelectedToken) && setSelectedToken(list[index]);
        isFunc(setSelectedToToken) && setSelectedToToken(list[index]);
        isFunc(setPathToArray) &&
          setPathToArray(list[index].address, list[index].symbol);
        isFunc(setPathArray) &&
          setPathArray(list[index].address, list[index].symbol);
        isFunc(getToAmount) && getToAmount();
        isFunc(onClose) && onClose();
      }}
    >
      <Flex alignItems="center">
        <img style={{ width: '7%' }} src={list[index].logoURI} alt=" " />
        <Text fontSize="md" fontWeight="regular" color="#fff" ml={2}>
          {list[index].symbol}
        </Text>
        <Text mx={3}>
          <small style={{ display: 'block', color: '#b3b3b3' }}>
            {list[index].name}
          </small>
        </Text>
      </Flex>
      <Text fontSize="md" fontWeight="regular" color="#fff">
        {!balanceIsSet && list[index].available ? '0.0' : list[index].balance}
        {!list[index].available && (
          <Button
            border="0"
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
  { storeUserToken, deleteUserTokenList, importUriTokenList },
)(TokenListBox);
