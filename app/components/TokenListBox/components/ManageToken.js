/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import {
  Input,
  Box,
  Switch,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
  extendTheme,
} from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import { ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons';
import styles from '../../../styles/token-list-manager.css';
import RGP from '../../../assets/rgp.png';
import NullImage24 from '../../../assets/Null-24.svg';
import ImportTokenModal from './ImportTokenModal';

const ManageToken = ({
  isOpen,
  onClose,
  customTokenBox,
  setManageToken,
  tokenImportUri,
  setTokenImportUri,
  setCustomTokenBox,
  userTokenAddress,
  setUserTokenAddress,
  setShowCurrencyList,
  userCustomToken,
  importCustomToken,
  setSelectedTokenForModal,
  onOpenModal,
  userCustomTokenList,
  deleteToken,
  showErrorMessage,
  errorMessage,
  userCustomURIList,
  importUriToken,
  allTokenList,
  toggleDefaultTokenState,
  toggleMainTokenState,
  toggleUserTokenState,
  userTokenState,
  defaultTokenState,
  mainTokenState,
}) => {
  const {
    isOpen: isOpenImportModal,
    onOpen: onOpenImportModal,
    onClose: onCloseImportModal,
  } = useDisclosure();

  return (
    <>
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
            width="24px"
            height="24px"
            padding="5px"
            bg="#fff"
            border="0px"
            color="#000"
            borderRadius="50%"
            marginRight="15px"
            cursor="pointer"
            _focus={{ outline: 'none', backgroundColor: '#fff', color: '#000' }}
            _hover={{ backgroundColor: '#fff', color: '#000' }}
            marginTop="10px"
            onClick={() => {
              setManageToken(false);
              setShowCurrencyList(true);
            }}
          />
          <ModalHeader fontWeight="bold">
            <ArrowBackIcon
              w={10}
              h={6}
              cursor="pointer"
              onClick={() => {
                setManageToken(false);
                setShowCurrencyList(true);
              }}
            />
            <Flex
              flexDirection="row"
              justifyContent="space-evenly"
              marginTop="-42px"
            >
              <Text marginLeft="-200px" marginTop="22px" fontSize="16px">
                Manage
              </Text>
            </Flex>
          </ModalHeader>
          <Flex justifyContent="space-between" mt={-1}>
            <hr style={{ width: '100vw', border: '1px solid #29235E' }} />
          </Flex>
          <ModalBody mt={4}>
            <Box className={styles.tabContainer}>
              <Box
                onClick={() => setCustomTokenBox(false)}
                className={
                  !customTokenBox
                    ? styles.activeToggleButton
                    : styles.inactiveToggleButton
                }
              >
                <Text fontFamily="Roboto" fontSize="14px" fontWeight="500">
                  Lists
                </Text>
              </Box>
              <Box
                onClick={() => setCustomTokenBox(true)}
                className={
                  customTokenBox
                    ? styles.activeToggleButton
                    : styles.inactiveToggleButton
                }
              >
                <Text fontFamily="Roboto" fontSize="14px" fontWeight="500">
                  Tokens
                </Text>
              </Box>
            </Box>
            <Flex mt={5} flexDirection="column">
              {!customTokenBox ? (
                <>
                  <Input
                    placeholder="https:// or ipfs:// or ENS"
                    borderColor="#29235E"
                    backgroundColor="#120136"
                    color="#EEE6FF"
                    rounded="2xl"
                    h="40px"
                    fontSize="14px"
                    fontWeight="normal"
                    variant="outline"
                    value={tokenImportUri}
                    onChange={e => {
                      setTokenImportUri(e.target.value);
                    }}
                  />
                  {userCustomURIList.name && (
                    <Flex
                      mt={5}
                      flexDirection="row"
                      backgroundColor="#29235E"
                      padding="2"
                      border="1px solid #9790D6"
                      borderRadius="16px"
                      justifyContent="space-between"
                      h="16"
                    >
                      <img
                        src={
                          userCustomURIList.logoURI.includes('ipfs')
                            ? `https://cloudflare-ipfs.com/${
                                userCustomURIList.logoURI.split('://')[0]
                              }/${userCustomURIList.logoURI.split('://')[1]}/`
                            : userCustomURIList.logoURI
                        }
                        style={{
                          width: 'auto',
                          height: '100%',
                          borderRadius: '100%',
                          margin: '0px 2em',
                        }}
                        alt=""
                      />
                      <FormControl display="flex" alignItems="center">
                        <FormLabel
                          htmlFor="sa"
                          mb="0"
                          style={{ margin: '0px auto' }}
                        >
                          {userCustomURIList.name}
                          <p style={{ margin: '1px' }}>
                            {userCustomURIList.tokens.length} tokens
                          </p>
                        </FormLabel>
                        <Button
                          padding="1 2"
                          border={0}
                          background="#9790D6"
                          color="white"
                          _hover={{ background: '#29235E' }}
                          onClick={() => onOpenImportModal()}
                          cursor="pointer"
                        >
                          Import
                        </Button>
                      </FormControl>
                    </Flex>
                  )}
                  {allTokenList.length > 0 &&
                    allTokenList.map(list => (
                      <Flex
                        mt={5}
                        flexDirection="row"
                        backgroundColor="#29235E"
                        padding="2"
                        border="1px solid #9790D6"
                        borderRadius="16px"
                        justifyContent="space-between"
                        h="16"
                      >
                        <img
                          src={
                            list.logoURI.includes('ipfs')
                              ? `https://cloudflare-ipfs.com/${
                                  list.logoURI.split('://')[0]
                                }/${list.logoURI.split('://')[1]}/`
                              : list.logoURI
                          }
                          style={{
                            width: 'auto',
                            height: '100%',
                            borderRadius: '100%',
                            margin: '0px 2em',
                          }}
                          alt=""
                        />
                        <FormControl display="flex" alignItems="center">
                          <FormLabel
                            htmlFor={list.name}
                            mb="0"
                            style={{ margin: '0px auto' }}
                          >
                            {list.name}
                            <p style={{ margin: '1px' }}>
                              {list.tokens.length} token
                            </p>
                          </FormLabel>
                          <Switch defaultChecked id={list.name} size="lg" />
                        </FormControl>
                      </Flex>
                    ))}

                  <Flex
                    mt={5}
                    flexDirection="row"
                    backgroundColor={
                      defaultTokenState[0].show === true ? '#29235E' : '#120136'
                    }
                    padding="2"
                    border={
                      defaultTokenState[0].show === true
                        ? '1px solid #9790D6'
                        : '1px solid #29235E'
                    }
                    borderRadius="16px"
                    justifyContent="space-between"
                    h="16"
                  >
                    {/* <RGP className={styles.logo} width="45%" height="100%" /> */}
                    <img
                      src={RGP}
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '10px',
                        marginTop: '1px',
                        marginRight: '20px',
                      }}
                    />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel
                        htmlFor="top-ten"
                        mb="0"
                        style={{ margin: '0px auto', marginLeft: '1px' }}
                      >
                        <Text
                          fontFamily="Roboto"
                          fontSize="14px"
                          lineHeight="16px"
                          fontWeight="500"
                          fontStyle="normal"
                        >
                          Rigel Default Token List
                        </Text>
                        <p
                          style={{
                            marginTop: '-10px',
                            fontSize: '12px',
                            fontFamily: 'Roboto',
                            fontWeight: 'normal',
                          }}
                        >
                          {defaultTokenState[1].token.length} tokens
                        </p>
                      </FormLabel>
                      <Switch
                        onChange={e => {
                          toggleDefaultTokenState(e.target.checked);
                        }}
                        defaultChecked={defaultTokenState[0].show}
                        id="top-ten"
                        size="lg"
                        // colorScheme="#9790D5"
                        // color="#9790D5"
                        colorScheme="purple"
                      />
                    </FormControl>
                  </Flex>
                  <Flex
                    mt={5}
                    flexDirection="row"
                    backgroundColor={
                      mainTokenState[0].show === true ? '#29235E' : '#120136'
                    }
                    padding="2"
                    border={
                      mainTokenState[0].show === true
                        ? '1px solid #9790D6'
                        : '1px solid #29235E'
                    }
                    borderRadius="16px"
                    justifyContent="space-between"
                    h="16"
                  >
                    {/* <RGP className={styles.logo} width="45%" height="100%" /> */}
                    <img
                      src={RGP}
                      style={{
                        width: '40px',
                        height: '40px',
                        margin: '10px',
                        marginTop: '1px',
                        marginRight: '20px',
                      }}
                    />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel
                        htmlFor="main-list"
                        mb="0"
                        style={{
                          margin: '0px auto',
                          marginLeft: '1px',
                        }}
                      >
                        <Text
                          fontFamily="Roboto"
                          fontSize="14px"
                          lineHeight="16px"
                          fontWeight="500"
                          fontStyle="normal"
                        >
                          Rigel Main Token List
                        </Text>

                        <p
                          style={{
                            marginTop: '-10px',
                            fontSize: '12px',
                            fontFamily: 'Roboto',
                            fontWeight: 'normal',
                          }}
                        >
                          {mainTokenState[1].token.length} tokens
                        </p>
                      </FormLabel>
                      <Switch
                        onChange={e => {
                          toggleMainTokenState(e.target.checked);
                        }}
                        defaultChecked={mainTokenState[0].show}
                        id="main-list"
                        size="lg"
                        colorScheme="purple"
                      />
                    </FormControl>
                  </Flex>
                  {userCustomTokenList[1].token.length > 0 && (
                    <Flex
                      mt={5}
                      flexDirection="row"
                      backgroundColor={
                        userTokenState[0].show === true ? '#29235E' : '#120136'
                      }
                      padding="2"
                      border={
                        userTokenState[0].show === true
                          ? '1px solid #9790D6'
                          : '1px solid #29235E'
                      }
                      borderRadius="16px"
                      justifyContent="space-between"
                      h="16"
                    >
                      {/* <RGP className={styles.logo} width="45%" height="100%" /> */}
                      <img
                        src={RGP}
                        style={{
                          width: '40px',
                          height: '40px',
                          margin: '10px',
                          marginTop: '1px',
                          marginRight: '20px',
                        }}
                      />
                      <FormControl display="flex" alignItems="center">
                        <FormLabel
                          htmlFor="user-list"
                          mb="0"
                          style={{ margin: '0px auto', marginLeft: '1px' }}
                        >
                          <Text
                            fontFamily="Roboto"
                            fontSize="14px"
                            lineHeight="16px"
                            fontWeight="500"
                            fontStyle="normal"
                          >
                            User Token List
                          </Text>

                          <p
                            style={{
                              marginTop: '-10px',
                              fontSize: '12px',
                              fontFamily: 'Roboto',
                              fontWeight: 'normal',
                            }}
                          >
                            {userCustomTokenList[1].token.length} tokens
                          </p>
                        </FormLabel>
                        <Switch
                          onChange={e => {
                            toggleUserTokenState(e.target.checked);
                          }}
                          defaultChecked={userTokenState[0].show}
                          id="user-list"
                          size="lg"
                          disabled
                          colorScheme="purple"
                        />
                      </FormControl>
                    </Flex>
                  )}
                </>
              ) : (
                <>
                  <Input
                    placeholder="0x0000"
                    borderColor="#29235E"
                    color="white"
                    rounded="2xl"
                    h="40px"
                    fontSize="sm"
                    variant="outline"
                    value={userTokenAddress}
                    onChange={e => {
                      setUserTokenAddress(e.target.value);
                    }}
                  />
                  {showErrorMessage && (
                    <Flex background="gray.100">
                      <Text color="red.900" fontSize="sm">
                        {errorMessage}
                      </Text>
                    </Flex>
                  )}
                  {importCustomToken && (
                    <Flex
                      mt="5"
                      flexDirection="row"
                      justifyContent="space-evenly"
                    >
                      <Text style={{ fontSize: 'small' }}>
                        {userCustomToken.symbol}
                      </Text>
                      <Text style={{ fontSize: 'small' }}>
                        {userCustomToken.name}
                      </Text>
                      <Text style={{ fontSize: 'small' }}>
                        {`${userCustomToken.address.substr(
                          0,
                          4,
                        )}...${userCustomToken.address.slice(
                          -4,
                          userCustomToken.address.length,
                        )}`}
                      </Text>
                      <Button
                        padding="1 2"
                        border={0}
                        background="#9790D6"
                        color="white"
                        _hover={{ color: '#9790D6' }}
                        onClick={() => {
                          setSelectedTokenForModal(userCustomToken);
                          onOpenModal();
                        }}
                      >
                        Import {userCustomToken.symbol}
                      </Button>
                    </Flex>
                  )}
                  <Flex flexDirection="column" justifyContent="space-between">
                    <Box>
                      <Text>
                        {userCustomTokenList[1].token.length <= 1 ? (
                          <p
                            style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#eee6ff',
                            }}
                          >
                            {userCustomTokenList[1].token.length} Custom Token
                          </p>
                        ) : (
                          <p
                            style={{
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#eee6ff',
                            }}
                          >
                            {userCustomTokenList[1].token.length} Custom Token
                          </p>
                        )}
                      </Text>
                    </Box>
                    <Box
                      height="200"
                      overflow="auto"
                      marginTop="5"
                      paddingTop="4"
                    >
                      {userCustomTokenList[1].token.map((t, index) => (
                        <Box
                          key={index}
                          display="flex"
                          flexDirection="row"
                          justifyContent="space-between"
                        >
                          <NullImage24 />
                          <Text style={{ fontSize: 'small', marginTop: '5px' }}>
                            {t.name}
                          </Text>
                          <Text style={{ fontSize: 'small', marginTop: '5px' }}>
                            {`${t.address.substr(0, 4)}...${t.address.slice(
                              -4,
                              t.address.length,
                            )}`}
                          </Text>
                          <DeleteIcon
                            cursor="pointer"
                            onClick={() => deleteToken(t.address)}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Flex>
                </>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <ImportTokenModal
        userCustomURIList={userCustomURIList}
        importUriToken={importUriToken}
        isOpenImportModal={isOpenImportModal}
        onCloseImportModal={onCloseImportModal}
      />
    </>
  );
};

ManageToken.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  customTokenBox: PropTypes.bool,
  userTokenState: PropTypes.array,
  defaultTokenState: PropTypes.array,
  mainTokenState: PropTypes.array,
  toggleDefaultTokenState: PropTypes.func,
  toggleMainTokenState: PropTypes.func,
  toggleUserTokenState: PropTypes.func,
  setManageToken: PropTypes.func,
  tokenImportUri: PropTypes.string,
  setTokenImportUri: PropTypes.func,
  userTokenAddress: PropTypes.string,
  setUserTokenAddress: PropTypes.func,
  setCustomTokenBox: PropTypes.func,
  userCustomToken: PropTypes.object,
  importCustomToken: PropTypes.bool,
  setSelectedTokenForModal: PropTypes.func,
  onOpenModal: PropTypes.func,
  setShowCurrencyList: PropTypes.func,
  userCustomTokenList: PropTypes.array,
  allTokenList: PropTypes.array,
  userCustomURIList: PropTypes.object,
  deleteToken: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  errorMessage: PropTypes.string,
  importUriToken: PropTypes.func,
};

export default ManageToken;
