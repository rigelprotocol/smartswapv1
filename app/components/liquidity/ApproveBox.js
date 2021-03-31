import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Text, Circle } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
function ApproveBox(props) {
  return (
    <Box
      bg="#120136"
      borderRadius="20px"
      width="220px"
      position="fixed"
      right="150px"
      top="150px"
      p="2"
      zIndex="99999"
      border="1px solid rgba(255, 255, 255,0.25)"
    >
      <Flex>
        <Box pt="2" mr="4">
          <Circle size="30px" borderRadius="50%" bg="#68C18A" border="0">
            <CheckIcon color="white" />
          </Circle>
        </Box>
        <Box>
          <Text color="white">{props.popupText}</Text>
          <a href={`https://bscscan.com/${props.hash}`} target="_blank">
            <Text color="#f0f0f0">Confirm the Transaction on your wallet</Text>
          </a>
        </Box>
      </Flex>
    </Box>
  );
}

export default ApproveBox;
