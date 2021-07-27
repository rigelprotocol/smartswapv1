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
import { Input, Box, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import PropTypes from 'prop-types';
import styles from '../../../styles/token-list-manager.css';
import RGP from '../../../assets/rgp.svg';

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
                    Rigel Top 10 Token List
                  </FormLabel>
                  <Switch defaultChecked id="top-ten" size="lg" />
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
                  <Switch id="extended-list" size="lg" />
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
              {importCustomToken && (
                <Flex flexDirection="row" justifyContent="space-between">
                  <Text>{userCustomToken.name}</Text>
                  <Text>{userCustomToken.symbol}</Text>
                  <Text>{userCustomToken.address}</Text>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      setSelectedTokenForModal(userCustomToken);
                      onOpenModal();
                    }}
                  >
                    Import {userCustomToken.symbol}
                  </button>
                </Flex>
              )}
              <Flex>
                <Text>Custom Tokens</Text>
              </Flex>
            </>
          )}
        </Flex>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  </Modal>
);

ManageToken.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  customTokenBox: PropTypes.bool,
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
};

export default ManageToken;
