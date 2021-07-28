/**
 *
 * ImportTokenModal
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
import { Flex, Text, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { PropTypes } from 'prop-types';
import React from 'react';
import { FormControl, FormLabel } from '@chakra-ui/react';

const ImportTokenModal = ({
  userCustomURIList,
  importUriToken,
  onCloseImportModal,
  isOpenImportModal,
}) => (
  <>
    <Modal onClose={onCloseImportModal} isOpen={isOpenImportModal} isCentered>
      <ModalOverlay />
      <ModalContent bg="#120136" color="#fff" borderRadius="20px">
        <ModalCloseButton
          onClick={onCloseImportModal}
          bg="none"
          border="0px"
          color="#fff"
          cursor="pointer"
          _focus={{ outline: 'none' }}
        />
        <ModalHeader>Import</ModalHeader>

        <ModalBody>
          <Flex justifyContent="center">
            <Flex
              textAlign="center"
              w="60px"
              h="60px"
              borderRadius="50%"
              border="2px solid white"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
            >
              <Text fontSize="35px"> ! </Text>
            </Flex>
          </Flex>
          <Box textAlign="center">
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
                      ? `https://cloudflare-ipfs.com/${userCustomURIList.logoURI.split('://')[0]
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
                  <FormLabel htmlFor="sa" mb="0" style={{ margin: '0px auto' }}>
                    {userCustomURIList.name}
                    <p style={{ margin: '1px' }}>
                      {userCustomURIList.tokens.length} tokens
                    </p>
                  </FormLabel>
                </FormControl>
              </Flex>
            )}
            <Text textAlign="justify" lineHeight="1.5em">
              Import at your own risk By adding this list you are implicitly
              trusting that the data is correct. Anyone can create a list,
              including creating fake versions of existing lists and lists that
              claim to represent projects that do not have one.
            </Text>
            <p>
              <small>By Clicking Import you agree to the above statement</small>
            </p>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            my="2"
            mx="auto"
            color="#40BAD5"
            width="100%"
            background="rgba(64, 186, 213, 0.15)"
            cursor="pointer"
            border="none"
            borderRadius="13px"
            padding="10px"
            height="50px"
            fontSize="16px"
            _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
            onClick={() => {
              importUriToken(userCustomURIList);
              onCloseImportModal();
            }}
          >
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

ImportTokenModal.propTypes = {
  onCloseImportModal: PropTypes.func,
  isOpenImportModal: PropTypes.bool,
  userCustomURIList: PropTypes.object,
  importUriToken: PropTypes.func,
};

export default ImportTokenModal;
