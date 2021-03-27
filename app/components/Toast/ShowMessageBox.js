import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const ShowMessageBox = ({ boxMessage }) => {
  const [message, setMessage] = useState(
    'Hello!, so sorry something went wrong please wait while we fix it',
  );
  return (
    <Box
      color="#fff"
      bg="rgba(21, 61, 111, 0.44)"
      h="100%"
      mb="10px"
      justifyContent="space-between"
      px={4}
      rounded="2xl"
      mt="12px"
    >
      <Flex justifyContent="space-between" mb={1}>
        <Text fontSize="md" color="#40BAD5">
          {boxMessage === '' ? message : boxMessage}
        </Text>
      </Flex>
    </Box>
  );
};

export default ShowMessageBox;
