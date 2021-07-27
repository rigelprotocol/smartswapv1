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
import { getAddressTokenBalance } from 'utils/wallet-wiget/connection';
import { isFunc } from 'utils/UtilFunc';
import { getTokenList, getTokenDetails } from 'utils/tokens';
import NewTokenModal from './NewTokenModal';
import CurrencyList from './components/CurrencyList';
import ManageToken from './components/ManageToken';

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
}) {
  const account = wallet.wallet;
  const { tokenList } = ExtendedTokenList;
  const [list, setList] = useState(tokenList);
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

  useEffect(() => {
    (async () => {
      try {
        const updatedToken = await list.map(async (token, index) => {
          const { signer } = account;
          let { balance, symbol, address } = token;
          balance =
            symbol === 'BNB' && signer !== 'signer'
              ? account.balance
              : address !== undefined &&
              signer !== 'signer' &&
              (await getAddressTokenBalance(
                account.address,
                address,
                signer,
              ));
          return { ...token, balance };
        });
        setBalanceIsSet(true);
        setList(await Promise.all(updatedToken));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isOpen, account]);

  useEffect(() => {
    searchTokens();
    return setList(tokenList);
  }, [searchToken]);

  useEffect(() => {
    if (userTokenAddress !== '') {
      (async () => {
        const tokenData = await getTokenDetails(userTokenAddress);
        if (!isNotEmpty(tokenData) && tokenData !== null) {
          setUserCustomToken(tokenData);
          return setImportCustomToken(true);
        }
      })();
    }
  }, [userTokenAddress]);

  const searchTokens = async () => {
    if (searchToken !== '') {
      const tokenArrayList = await getTokenList(searchToken, account, list);
      return setList(tokenArrayList);
    }
  };

  const importToken = token => {
    if (importCustomToken) {
      storeUserToken(token);
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
  ExtendedTokenList: PropTypes.object,
};
const mapStateToProps = ({ wallet, ExtendedTokenList }) => ({
  wallet,
  ExtendedTokenList,
});

export default connect(
  mapStateToProps,
  {},
)(TokenListBox);
