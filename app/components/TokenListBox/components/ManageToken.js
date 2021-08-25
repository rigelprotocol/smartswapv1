/* eslint-disable react/no-array-index-key */
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
import {
  Input,
  Box,
  Switch,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import { DeleteIcon } from '@chakra-ui/icons';
import styles from '../../../styles/token-list-manager.css';
import RGP from '../../../assets/rgp.svg';
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
  offDefaultTokenList,
  toggleDisplay,
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
            bg="none"
            border="0px"
            color="#fff"
            cursor="pointer"
            _focus={{ outline: 'none' }}
            onClick={() => {
              setManageToken(false);
              setShowCurrencyList(true);
            }}
          />
          <ModalHeader fontWeight="light">Manage</ModalHeader>
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
                <Text>Lists</Text>
              </Box>
              <Box
                onClick={() => setCustomTokenBox(true)}
                className={
                  customTokenBox
                    ? styles.activeToggleButton
                    : styles.inactiveToggleButton
                }
              >
                <Text>Tokens</Text>
              </Box>
            </Box>
            <Flex mt={5} flexDirection="column">
              {!customTokenBox ? (
                <>
                  <Input
                    placeholder="https:// or ipfs:// or ENS"
                    borderColor="#40BAD5"
                    color="white"
                    rounded="2xl"
                    h="40px"
                    fontSize="sm"
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
                              {list.tokens.length} tokens
                            </p>
                          </FormLabel>
                          <Switch defaultChecked id={list.name} size="lg" />
                        </FormControl>
                      </Flex>
                    ))}
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
                    <RGP className={styles.logo} width="45%" height="100%" />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="top-ten" mb="0">
                        Rigel Default Token List
                      </FormLabel>
                      <Switch
                        onChange={e => offDefaultTokenList(e.target.checked)}
                        isChecked={toggleDisplay}
                        id="top-ten"
                        size="lg"
                      />
                    </FormControl>
                  </Flex>
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
                    <RGP className={styles.logo} width="45%" height="100%" />
                    <FormControl display="flex" alignItems="center">
                      <FormLabel htmlFor="extended-list" mb="0">
                        Rigel Extended Token List
                      </FormLabel>
                      <Switch id="extended-list" size="lg" disabled />
                    </FormControl>
                  </Flex>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Custom Token Address 0x00"
                    borderColor="#40BAD5"
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
                      <Text>Your Custom Tokens</Text>
                    </Box>
                    <Box
                      height="200"
                      overflow="auto"
                      marginTop="5"
                      paddingTop="4"
                    >
                      {userCustomTokenList.map((t, index) => (
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
  toggleDisplay: PropTypes.bool,
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
  offDefaultTokenList: PropTypes.func,
};

export default ManageToken;
