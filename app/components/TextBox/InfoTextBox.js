import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import {
  Text,
  Circle,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

const InfoTextBox = ({children}) => {
    console.log(children)
    return (
        <Box  bg="#29235e21" w="90%" m="0 auto" color="rgba(255, 255, 255, 0.555)" borderRadius="15px" padding="15px">
           {children}
        </Box>
    )
}

export default InfoTextBox
