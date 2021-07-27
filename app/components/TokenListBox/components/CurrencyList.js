import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { FixedSizeList } from 'react-window';
import { Input } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import ArrowDownImage from '../../../assets/arrow-down.svg';

const CurrencyList = ({
  Row,
  list,
  isOpen,
  onClose,
  searchToken,
  setSearchToken,
  setManageToken,
  setShowCurrencyList,
}) => (
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
        <FixedSizeList
          width={400}
          height={300}
          itemCount={list.length}
          itemSize={10}
        >
          {Row}
        </FixedSizeList>
      </ModalBody>
      <ModalFooter justifyContent="center">
        <div>
          {' '}
          <Text
            onClick={() => {
              setManageToken(true);
              setShowCurrencyList(false);
            }}
            cursor="pointer"
          >
            Manage Token
          </Text>
        </div>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
CurrencyList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  Row: PropTypes.func,
  list: PropTypes.array,
  searchToken: PropTypes.string,
  setSearchToken: PropTypes.func,
  setManageToken: PropTypes.func,
  setShowCurrencyList: PropTypes.func,
};
export default CurrencyList;
