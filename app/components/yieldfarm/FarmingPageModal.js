import React, { useEffect } from 'react';
import {
  Text,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
  useDisclosure,
  ModalBody,
  Button
} from '@chakra-ui/react';
import styles from '../../styles/yieldFarmdetails.css';
const FarmingPageModal = ({ farmingModal, setFarmingModal, farmingFee }) => {
  const modal3Disclosure = useDisclosure();
  useEffect(() => {
    if (farmingModal) {
      openModal3();
    }
  }, [farmingModal]);
  const openModal3 = () => {
    modal3Disclosure.onOpen();
  };
  const closeModal3 = () => {
    modal3Disclosure.onClose();
    setFarmingModal(false);
  };
  return (
    <Modal
      isOpen={modal3Disclosure.isOpen}
      onClose={closeModal3}
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
          RGP FARMING FEE
        </ModalHeader>
        <ModalBody className={styles.body}>
          <Text color="gray.400">
            You will be required to pay atleast{' '}
            <span style={{ fontSize: '20px', color: 'white' }}>
              {farmingFee}
            </span>{' '}
            RGP to join any pool.
          </Text>
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
                onClick={closeModal3}
              >
                OK
              </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default FarmingPageModal;
