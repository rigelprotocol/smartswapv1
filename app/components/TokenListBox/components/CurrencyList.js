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
import AutoSizer from 'react-virtualized-auto-sizer';
import ReactList from 'react-list';
import ArrowDownImage from '../../../assets/arrow-down.svg';

const CurrencyList = ({
  Row,
  list,
  isOpen,
  onClose,
  searchToken,
  toggleDisplay,
  setSearchToken,
  setManageToken,
  setShowCurrencyList,
}) => {
  const isItemLoaded = ({ index }) => !!list[index];
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#120136"
        color="#fff"
        padding-top="15px"
        borderRadius="20px"
        width="90vw"
        minHeight="60vh"
      >
        <ModalCloseButton
          width="24px"
          height="24px"
          padding="5px"
          bg="#fff"
          border="0px"
          color="#000"
          borderRadius="50%"
          cursor="pointer"
          _focus={{ outline: 'none', backgroundColor: '#fff', color: '#000' }}
          _hover={{ backgroundColor: '#fff', color: '#000' }}
          marginTop="15px"
          marginRight="8px"
        />
        <ModalHeader
          fontFamily="Roboto"
          fontStyle="normal"
          fontWeight="500"
          fontSize="16px"
          marginTop="15px"
        >
          Select token
        </ModalHeader>
        <ModalBody mt={4}>
          <Input
            placeholder="Search by name or paste address"
            borderColor="#29235E"
            marginTop="-10px"
            color="#fff"
            fontWeight="800"
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
            <hr style={{ width: '100vw', border: '1px solid #29235E' }} />
          </Flex>
          {toggleDisplay && (
            <div
              style={{
                overflow: 'auto',
                maxHeight: 300,
                marginRight: '-10px',
                paddingRight: '10px',
              }}
            >
              <ReactList
                itemRenderer={Row}
                length={list.length}
                type="uniform"
              />
            </div>
          )}
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
              fontFamily="Roboto"
              fontWeight="500"
              fontSize="16px"
            >
              Manage Token
            </Text>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
CurrencyList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  Row: PropTypes.func,
  list: PropTypes.array,
  toggleDisplay: PropTypes.bool,
  searchToken: PropTypes.string,
  setSearchToken: PropTypes.func,
  setManageToken: PropTypes.func,
  setShowCurrencyList: PropTypes.func,
};
export default CurrencyList;
