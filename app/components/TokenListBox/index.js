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
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Input } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { tokenList } from 'utils/constants';
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
}) {
  const [list, setList] = useState(tokenList);
  const [balanceIsSet, setBalanceIsSet] = useState(false);
  const [searchToken, setSearchToken] = useState('');
  const account = wallet.wallet;
  useEffect(() => {
    getTokenListBalance(list, account, setBalanceIsSet);
  }, [isOpen, account]);
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
          {list.map(token => (
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                isFunc(setSelectedToken) && setSelectedToken(token);
                isFunc(setSelectedToToken) && setSelectedToToken(token);
                isFunc(setPathToArray) &&
                  setPathToArray(token.address, token.symbol);
                isFunc(setPathArray) &&
                  setPathArray(token.address, token.symbol);
                isFunc(getToAmount) && getToAmount();
                isFunc(onClose) && onClose();
              }}
            >
              <Flex alignItems="center">
                <span className={`icon icon-${token.symbol.toLowerCase()}`} />
                <Text fontSize="md" fontWeight="regular" color="#ffinf" ml={2}>
                  {token.symbol}
                </Text>
                <Text mx={3}>
                  <small style={{ display: 'block', color: '#b3b3b3' }}>
                    {token.name}
                  </small>
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {!balanceIsSet ? '0.0' : token.balance}
              </Text>
            </Flex>
          ))}
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
};
const mapStateToProps = ({ wallet }) => ({ wallet });

export default connect(
  mapStateToProps,
  {},
)(TokenListBox);
