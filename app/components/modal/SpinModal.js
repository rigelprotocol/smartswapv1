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
import Spinner from "../spinner/spinner"
const SpinModal = ({ onCloseModal, isOpenModal, title, children }) => {

    return (
        <>
            <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
                <ModalOverlay />
                <ModalContent bg="#120136" color="#fff" borderRadius="20px">
                    <ModalHeader
                     fontSize="18px"
                     fontWeight="regular"
                     align="center"
                    >{title}</ModalHeader>
                    <ModalBody>
                    <Spinner />
                    
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default SpinModal