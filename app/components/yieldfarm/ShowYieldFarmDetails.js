import React, { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Square,
  Text,
  Circle,
  InputGroup,
  InputRightElement,
  Divider,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import styles from '../../styles/yieldFarmdetails.css';
const ShowYieldFarmDetails = ({
  content,
}) => {
  const [depositValue, setDepositValue] = useState('Confirm');
  const [deposit, setDeposit] = useState(false);
  const [unstakeButtonValue, setUnstakeButtonValue] = useState('Confirm');
  const [approveValue, setApproveValue] = useState(false);
  const [approveButtonColor, setApproveButtonColor] = useState(true);
  const modal1Disclosure = useDisclosure();
  const modal2Disclosure = useDisclosure();
  const open = () => {
    if (approveValue) {
      modal1Disclosure.onOpen();

    }
  };
  const close = () => {
    modal1Disclosure.onClose();
  };
  const closeModal = () => {
    modal2Disclosure.onClose();
  };
  const confirmDeposit = () => {
    setDepositValue('Pending Confirmation');
    setDeposit(true)
    setApproveValue(true);
    setApproveButtonColor(true)
  };
  const confirmUnstakeDeposit = () => {
    setUnstakeButtonValue('Pending Confirmation');
  };
  const setApprove = () => {
    setApproveValue(!approveValue);
    setApproveButtonColor(!approveButtonColor)
    if (approveValue && deposit) {
      modal2Disclosure.onOpen();
    }
  };
  return (
    <>
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
        color="white"
        margin="0 auto"
        background="#29235E"
        padding="0 20px"
        paddingBottom="4px"
        width="90%"
        borderBottomRadius="14px"
      >
        <Box width="90%" marginRight="30px">
          <Flex>
            <Text fontSize="30px" marginRight="30px">
              {content.tokensStaked[1]}
            </Text>{' '}
            <Text color="gray.400" marginTop="40px">
              {' '}
              {content.tokensStaked[0]} Tokens Staked
            </Text>
          </Flex>

          <Flex>
            <Button
              w="60%"
              h="50px"
              borderRadius="12px"
              bg={approveButtonColor ? 'rgba(64, 186, 213, 0.1)' : '#444159'}
              color={approveButtonColor ? '#40BAD5' : 'rgba(190, 190, 190, 1)'}
              border="0"
              mb="4"
              mr="6"
              cursor="pointer"
<<<<<<< HEAD
              _hover={approveButtonColor ? { color: '#423a85' } : { color: "white" }}
=======
              _hover={approveButtonColor ? { color: '#423a85' } : { color: "white       " }}
>>>>>>> dev
              onClick={setApprove}
            >
              {approveValue ? 'unstake' : 'Approve'}
            </Button>
            <Square
              size="40px"
              borderRadius="12px"
              color="white"
              cursor="pointer"
              marginTop="5px"
              bg="rgba(64, 186, 213, 0.1);"
            >
              <AddIcon onClick={open} disabled={!approveValue} />
            </Square>
          </Flex>
        </Box>
        <Divider orientation="vertical" colorScheme="yellow" />
        <Box width="100%">
          <Flex>
            <Text fontSize="30px" marginRight="30px">
              {content.RGPEarned}
            </Text>{' '}
            <Text color="gray.400" marginTop="40px">
              RGP Earned
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Button
              w="50%"
              h="50px"
              borderRadius="12px"
              bg="#444159"
              color="rgba(190, 190, 190, 1)"
              border="0"
              mb="4"
              mr="6"
              cursor="pointer"
              _hover={{ bg: '#444159' }}
            >
              Harvest
            </Button>
            <Text marginTop="15px">Auto-Harvest</Text>
            <label className={styles.themeSwitch}>
              <input
                type="checkbox"
                id="checkbox"
                name="influencer"
                className={styles.input}
              />
              <div className={`${styles.slider} ${styles.round}`} />
            </label>
            <Circle size="20px" bg="#fff" marginTop="14px">
              <Tooltip label="Auto Harvest (weekly)" fontSize="md">
                <QuestionOutlineIcon color="#120136" cursor="pointer" />
              </Tooltip>
            </Circle>
          </Flex>
        </Box>
      </Flex>
      <Modal isOpen={modal1Disclosure.isOpen} onClose={close} isCentered="true">
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalHeader
            fontSize="18px"
            fontWeight="regular"
            align="center"
            className={styles.header}
          >
            Deposit {content.deposit} Tokens
          </ModalHeader>
          <ModalBody className={styles.body}>
            <Text color="gray.400" align="right">
              {content.availableToken} {content.deposit} Available
            </Text>
            <InputGroup size="md">
              <Input
                type="text"
                color="#fff"
                placeholder="Available Token"
                bg="#29235E"
                disabled
                opacity="0.5"
                h="50px"
                borderRadius="20px"
                name="availableToken"
                value={content.availableToken}
                border="0"
              />
              <InputRightElement marginRight="15px">
                <Text
                  color="rgba(64, 186, 213, 1)"
                  border="none"
                  borderRadius="6px"
                  fontSize="13px"
                  bg="rgba(53, 44, 129, 0.3)"
                  p="1"
                  mt="22px"
                >
                  MAX
                </Text>
              </InputRightElement>
            </InputGroup>
            <Box mt={4}>
              <Button
                my="2"
                mx="auto"
                color={
                  depositValue === 'Confirm'
                    ? 'rgba(190, 190, 190, 1)'
                    : '#40BAD5'
                }
                width="100%"
                background={
                  depositValue === 'Confirm'
                    ? 'rgba(64, 186, 213, 0.15)'
                    : '#444159'
                }
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                onClick={confirmDeposit}
              >
                {depositValue}
              </Button>
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
                onClick={close}
              >
                Cancel
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={modal2Disclosure.isOpen}
        onClose={closeModal}
        isCentered="true"
      >
        <ModalOverlay />
        <ModalContent bg="#120136" color="#fff" borderRadius="20px" width="90%">
          <ModalHeader
            fontSize="18px"
            fontWeight="regular"
            align="center"
            className={styles.header}
          >
            Unstake {content.deposit} Tokens
          </ModalHeader>
          <ModalBody className={styles.body}>
            <Text color="gray.400" align="right">
              {content.availableToken} {content.deposit} Staked
            </Text>
            <InputGroup size="md">
              <Input
                type="text"
                color="#fff"
                placeholder="Available Token"
                bg="#29235E"
                disabled
                opacity="0.5"
                h="50px"
                borderRadius="20px"
                name="availableToken"
                value={content.availableToken}
                border="0"
              />
              <InputRightElement marginRight="15px">
                <Text
                  color="#40BAD5"
                  border="none"
                  borderRadius="6px"
                  fontSize="13px"
                  bg="#fff"
                  p="1"
                  mt="22px"
                >
                  MAX
                </Text>
              </InputRightElement>
            </InputGroup>
            <Box mt={4}>
              <Button
                my="2"
                mx="auto"
                color={
                  unstakeButtonValue === 'Confirm'
                    ? 'rgba(190, 190, 190, 1)'
                    : '#40BAD5'
                }
                width="100%"
                background={
                  unstakeButtonValue === 'Confirm'
                    ? 'rgba(64, 186, 213, 0.15)'
                    : '#444159'
                }
                cursor="pointer"
                border="none"
                borderRadius="13px"
                padding="10px"
                height="50px"
                fontSize="16px"
                _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                onClick={confirmUnstakeDeposit}
              >
                {unstakeButtonValue}
              </Button>
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
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
ShowYieldFarmDetails.propTypes = {
  content: PropTypes.object.isRequired,
};
export default ShowYieldFarmDetails;
