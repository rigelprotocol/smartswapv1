import { Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import {
  ModalOverlay,
  Button,
  Menu,
  ModalContent,
  ModalFooter,
  Modal,
  useDisclosure,
  MenuButton,
  MenuList,
  MenuItem,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { connectingWallet } from 'containers/WalletProvider/actions';
import styles from '../../styles/navbar.css';

import Options from './Options';
import Loading from './Loading';
import Binance from '../../assets/bnb.svg';
import Ethereum from '../../assets/eth.svg';

const Wallet = ({ loading, show, connectingWallet }) => {
  const modal1Disclosure = useDisclosure();

  const open = () => {
    modal1Disclosure.onOpen();
  };

  const close = () => {
    modal1Disclosure.onClose();
  };

  return (
    <>
      <Menu mr={4}>
        <MenuButton
          as={Button}
          border="none"
          fontWeight="regular"
          fontSize="md"
          rounded="xl"
          cursor="pointer"
          bg="rgba(64, 186, 213,0.25)"
          color="#40BAD5"
          _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
          _active={{ outline: '#29235E' }}
          _expanded={{ bg: '#29235E' }}
          rightIcon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Connect
        </MenuButton>
        <MenuList
          className={styles.trade__button__list}
          color="white"
          bg="#120136"
          rounded="2xl"
          border=" 1px solid rgba(255, 255, 255,0.15) "
        >
          <MenuItem
            onClick={open}
            _hover={{ background: '#29235E' }}
            _focus={{ outline: 0, background: '#29235E' }}
            cursor="pointer"
            fontSize="14px"
            rounded="xl"
            className={styles.trade__button__item}
          >
            <Binance />
            <Text ml={5} fontSize="sm" color="gray.400">
              Binance Smart Chain Network
            </Text>
          </MenuItem>
          <MenuItem
            onClick={open}
            _hover={{ background: '#29235E' }}
            _focus={{ outline: 0, background: '#29235E' }}
            cursor="pointer"
            rounded="xl"
            fontSize="14px"
            className={styles.trade__button__item}
          >
            <Ethereum />
            <Text ml={5} fontSize="sm" color="gray.400">
              Ethereum Network
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={modal1Disclosure.isOpen} onClose={close} isCentered>
        <ModalOverlay />
        <ModalContent
          bg="#120136"
          color="#fff"
          width="90vw"
          borderRadius="20px"
          minHeight="40vh"
        >
          <ModalCloseButton
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={() => connectingWallet(false)}
          />

          {loading ? <Loading /> : <Options />}

          <ModalFooter className={styles.footer}>
            <Text color="#40B">Learn more about wallet.</Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
const mapStateToProps = ({ wallet }) => {
  const { loading } = wallet;
  return {
    loading,
  };
};
export default connect(
  mapStateToProps,
  { connectingWallet },
)(Wallet);
