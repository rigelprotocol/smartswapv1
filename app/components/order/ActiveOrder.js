import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';


const ActiveOrder = ({ active }) => {
  return (
    <div>
      {active ? (
        <Box
          boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
          rounded="2xl"
          bg="#120136"
          p={5}
        >
          <Box
            color="#fff"
            bg="#29235E"
            width="100%"
            justifyContent="space-between"
            px={4}
            py={2}
            rounded="2xl"
          >
            <Text
              color="rgba(255, 255, 255,0.25)"
              fontSize="12px"
              lineHeight="0"
            >
              Operation
            </Text>
            <Flex>
              <Flex mr={4}>
                <img src="/rgp.svg" width={20} height={15} alt="Today" />
                <Text fontSize="sm" color="#fff" ml={2}>
                  20 RGP
                </Text>
              </Flex>
              <img src="/arrow-right.svg" width={15} height={15} alt="Today" />
              <Flex ml={4}>
                <img src="/bnb.svg" width={20} height={15} alt="Today" />
                <Text fontSize="sm" color="#fff" ml={2}>
                  30 BNB
                </Text>
              </Flex>
            </Flex>

            <Flex justifyContent="space-between">
              <Box>
                <Text
                  fontSize="12px"
                  lineHeight="0"
                  color="rgba(255, 255, 255,0.25)"
                >
                  Type
                </Text>
                <Text color="#fff" fontSize="14px" fontWeight="regular">
                  Manual
                </Text>
              </Box>
              <Box>
                <Text
                  color="rgba(255, 255, 255,0.25)"
                  fontSize="12px"
                  lineHeight="0"
                >
                  Type
                </Text>
                <Text color="#fff" fontSize="14px" fontWeight="regular">
                  @ 0.004500
                </Text>
              </Box>
              <Box>
                <Text fontSize="12px" lineHeight="0" color="gray.500">
                  &nbsp;
                </Text>
                <Text color="#fff" fontSize="14px" fontWeight="regular">
                  18:22:16
                </Text>
              </Box>
            </Flex>
            <Box>
              <Text
                color="rgba(255, 255, 255,0.25)"
                fontSize="12px"
                lineHeight="0"
              >
                Status
              </Text>
              <Text color="#68C18A" fontSize="14px" fontWeight="regular">
                Completed
              </Text>
            </Box>
          </Box>
        </Box>
      ) : (
          ''
        )}
    </div>
  );
};

export default ActiveOrder;
