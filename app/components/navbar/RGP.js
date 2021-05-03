/* eslint-disable camelcase */
import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { PropTypes } from 'prop-types';
import {
  ModalOverlay,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Modal,
  useDisclosure,
} from '@chakra-ui/react';
import { connect } from 'react-redux';
import BreakdownBg from '../../assets/breakdown-bg.svg';
import RGPImage from '../../assets/rgp.svg';

const RGP = ({ wallet_props }) => {
  const modal2Disclosure = useDisclosure();
  return (
    <>
      <Button
        onClick={modal2Disclosure.onOpen}
        border="0px"
        fontWeight="light"
        fontSize="sm"
        cursor="pointer"
        backgroundImage="linear-gradient(to right, rgb(64,186,213),rgb(3,90,166))"
        borderColor="#40BAD5"
        color="#fff"
        rounded="xl"
        _hover={{
          background:
            'linear-gradient(to right, rgb(64,186,213),rgb(3,90,166))',
        }}
      >
        {wallet_props} RGP
      </Button>
      <Modal
        isOpen={modal2Disclosure.isOpen}
        onClose={modal2Disclosure.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bg="#120136"
          color="#fff"
          borderRadius="20px"
          minHeight="40vh"
          w="89vw"
        >
          <ModalCloseButton
            bg="none"
            cursor="pointer"
            border="0"
            mt="15px"
            color="#fff"
            _focus={{ outline: 'none' }}
          />
          <ModalHeader mt="15px" fontWeight="light" fontSize="lg">
            Your RGP breakdown
          </ModalHeader>
          <ModalBody mt={4}>
            <Flex w="100%" position="absolute" opacity="0.3">
              <BreakdownBg />
            </Flex>
            <Flex
              mt="25px"
              color="#fff"
              flexDirection="column"
              h="170px"
              alignItems="center"
              justifyContent="center"
              px={4}
              rounded="md"
            >
              <RGPImage />
              <Text zIndex="10" color="#fff" fontSize="4xl" fontWeight="bold">
                {wallet_props} RGP
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb={2}>
              <Text zIndex="10" fontSize="16px" color="rgba(255, 255, 255,0.5)">
                RGP price:
              </Text>
              <Text zIndex="10" fontSize="16px" color="gray.200">
                $2.38
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb={2}>
              <Text fontSize="16px" color="rgba(255, 255, 255,0.5)">
                RGP in circulation:
              </Text>
              <Text fontSize="16px" color="gray.200">
                625,000 RGP
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb={2}>
              <Text fontSize="16px" color="rgba(255, 255, 255,0.5)">
                Total RGP chain maximum supply:
              </Text>
              <Text fontSize="16px" color="gray.200">
                20,000,000
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

RGP.propTypes = {
  wallet_props: PropTypes.string,
};

const mapStateToProps = ({ wallet }) => wallet;
export default connect(
  mapStateToProps,
  null,
)(RGP);
