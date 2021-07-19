/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// @ts-nocheck
/**
 *
 * TokenListBox
 *
 */

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React, { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Input } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getAddressTokenBalance } from 'utils/wallet-wiget/connection';
import { getTokenListBalance } from 'utils/wallet-wiget/TokensUtils';
import { isFunc } from 'utils/UtilFunc';
import ArrowDownImage from '../../assets/arrow-down.svg';

function TokenListBox({
  setSelectedToken,
  setPathArray,
  getToAmount,
  setSelectedToToken,
  setPathToArray,
  isOpen,
  onClose,
  wallet,
  ExtendedTokenList,
}) {
  const [balanceIsSet, setBalanceIsSet] = useState(false);
  const [searchToken, setSearchToken] = useState('');
  const account = wallet.wallet;
  const { tokenList } = ExtendedTokenList;
  const [list, setList] = useState(tokenList);
  useEffect(() => {
    (async () => {
      try {
        const updatedToken = await list.map(async (token, index) => {
          const { signer } = account;
          let { balance, name, symbol, address, logoURI } = token;
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
          return { balance, name, symbol, address, logoURI };
        });
        setBalanceIsSet(true);
        setList(await Promise.all(updatedToken));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isOpen, account]);
  useEffect(() => {
    setList(tokenList);
  }, [tokenList]);
  useEffect(() => {
    if (searchToken !== '') {
      const filteredTokenList = tokenList.filter(
        token =>
          token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
          token.name.toLowerCase().includes(searchToken.toLowerCase()),
      );
      return setList(filteredTokenList);
    }
    return setList(tokenList);
  }, [searchToken]);
  const Row = ({ index, key, style }) => (
    <Flex
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
        {!balanceIsSet ? '0.0' : list[index].balance}
      </Text>
    </Flex>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#120136"
        color="#fff"
        borderRadius="20px"
        width="90vw"
        minHeight="60vh"
      >
        <ModalCloseButton
          bg="none"
          border="0px"
          color="#fff"
          cursor="pointer"
          _focus={{ outline: 'none' }}
        />
        <ModalHeader fontWeight="light">Select a token</ModalHeader>
        <ModalBody mt={4}>
          <Input
            placeholder="Search by name or paste address"
            borderColor="#40BAD5"
            color="gray.500"
            rounded="2xl"
            h="50px"
            fontSize="sm"
            variant="outline"
            value={searchToken}
            onChange={e => {
              setSearchToken(e.target.value);
            }}
          />
          <Flex justifyContent="space-between" mt={5}>
            <Text fontSize="sm" fontWeight="light" color="#fff">
              Token
            </Text>
            <ArrowDownImage />
          </Flex>
          <List width={400} height={300} itemCount={list.length} itemSize={10}>
            {Row}
          </List>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
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
