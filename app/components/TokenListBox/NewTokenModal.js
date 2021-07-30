/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// @ts-nocheck
/**
 *
 * NewTokenModal
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
import NullImage48 from '../../assets/Null-48.svg';
import NullImage24 from '../../assets/Null-24.svg';

const NewTokenModal = ({
  onCloseModal,
  isOpenModal,
  selectedTokenForModal,
  importToken,
}) => (
  <>
    <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
      <ModalOverlay />
      <ModalContent bg="#120136" color="#fff" borderRadius="20px">
        <ModalCloseButton
          onClick={onCloseModal}
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
            <Text>
              This token doesn't appear on the active token list(s). Make sure
              this is the token that you want to trade.
            </Text>
            <Box
              bg="#29235e21"
              w="90%"
              m="0 auto"
              borderRadius="15px"
              padding="15px"
            >
              {selectedTokenForModal &&
                !selectedTokenForModal.available &&
                selectedTokenForModal.img ? (
                selectedTokenForModal.img
              ) : (
                <NullImage48 />
              )}
              <h3 style={{ color: 'white' }}>
                {selectedTokenForModal && !selectedTokenForModal.available
                  ? selectedTokenForModal.symbol
                  : ''}
              </h3>
              <h5 style={{ color: '#444159' }}>
                {selectedTokenForModal && !selectedTokenForModal.available
                  ? selectedTokenForModal.name
                  : ''}
              </h5>
              <h6 style={{ color: 'rgba(255, 255, 255, 0.555)' }}>
                {selectedTokenForModal && !selectedTokenForModal.available
                  ? selectedTokenForModal.address
                  : ''}
              </h6>
              <Button
                padding="1 2"
                border={0}
                background="#E8006F"
                color="white"
                _hover={{ color: 'E8006F' }}
              >
                <NullImage24 /> unknown source
              </Button>
            </Box>
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
            onClick={() => importToken(selectedTokenForModal)}
          >
            Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
NewTokenModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setSelectedToken: PropTypes.func,
  setPathArray: PropTypes.func,
  getToAmount: PropTypes.func,
  setSelectedToToken: PropTypes.func,
  setPathToArray: PropTypes.func,
};

export default NewTokenModal;
