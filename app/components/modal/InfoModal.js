import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Box,
    Button,
    Link,
    ListItem, OrderedList,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

const InfoModal = ({ onCloseModal, isOpenModal, title, children }) => {

    return (
        <>
            <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
                <ModalOverlay />
                <ModalContent bg="#120136" color="#fff" borderRadius="20px">
                    <ModalHeader>{title}</ModalHeader>

                    <ModalBody>
                        {children}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            my="2"
                            mx="auto"
                            color="#40BAD5"
                            width="100%"
                            background="#120136"
                            cursor="pointer"
                            border="none"
                            borderRadius="13px"
                            padding="10px"
                            height="50px"
                            fontSize="16px"
                            _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
                            onClick={onCloseModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InfoModal