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
  Tooltip,
  ModalCloseButton,
  Spinner,

} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { connectingWallet } from 'containers/WalletProvider/actions';
import styles from '../../styles/navbar.css';
import { isSupportedNetwork, switchToBSC } from '../../utils/wallet-wiget/connection'

import Options from './Options';
import Loading from './Loading';
import Binance from '../../assets/bnb.svg';
import Ethereum from '../../assets/eth.svg';
import InfoModal from 'components/modal/InfoModal'


const Wallet = ({ loading, show, connectingWallet, chainId }) => {
  const modal1Disclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const open = () => {
    modal1Disclosure.onOpen();
  };

  const close = () => {
    modal1Disclosure.onClose();
  };
  const switchNetwork = () => {
    onOpen();
    switchToBSC()
  }

  if (loading) {
    return (


      <Button
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
        rightIcon={<Spinner size="xs" />}
      >
        Connecting..
      </Button>

    )
  }

  if (!isSupportedNetwork(chainId)) {
    return (
      <>
        <InfoModal
          isOpenModal={isOpen}
          onCloseModal={onClose}
          title="UNSUPPORTED NETWORK"
        >
          Please switch your wallet to Binance Smart Chain Mainnet
        </ InfoModal>
        <Button
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
          onClick={switchNetwork}
        >
          Unsupported Network
        </Button>
      </>
    )
  }

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
          <Tooltip label="Coming Soon" aria-label="A tooltip">
            <MenuItem
              onClick={e => {
                e.preventDefault();
              }}
              _hover={{ background: '#29235E' }}
              _focus={{ outline: 0, background: '#29235E' }}
              cursor="not-allowed"
              rounded="xl"
              fontSize="14px"
              opacity="0.465"
              className={styles.trade__button__item}
            >
              <Ethereum />
              <Text ml={5} fontSize="sm" color="gray.400">
                Ethereum Network
              </Text>
            </MenuItem>
          </Tooltip>
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
  const { loading, wallet: { chainId } } = wallet;
  return {
    loading,
    chainId
  };
};
export default connect(
  mapStateToProps,
  { connectingWallet },
)(Wallet);