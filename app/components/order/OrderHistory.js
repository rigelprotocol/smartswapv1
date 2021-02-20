import { Box, Flex, Text } from '@chakra-ui/layout';
import Image from 'next/dist/client/image';

const OrderHistory = ({ history }) => {
  return (
    <Flex p={3}>
      {history ? (
        <div style={{ width: '100%' }}>
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
                <Image src="/rgp.svg" width={20} height={15} />
                <Text fontSize="sm" color="#fff" ml={2}>
                  20 RGP
                </Text>
              </Flex>
              <Image src="/arrow-right.svg" width={15} height={15} />
              <Flex ml={4}>
                <Image src="/bnb.svg" width={20} height={15} />
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
                <Text
                  fontSize="12px"
                  lineHeight="0"
                  color="rgba(255, 255, 255,0.25)"
                >
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

          <Box
            color="#fff"
            bg="#29235E"
            width="100%"
            mt={4}
            justifyContent="space-between"
            px={4}
            py={3}
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
                <Image src="/rgp.svg" width={20} height={15} />
                <Text fontSize="sm" color="#fff" ml={2}>
                  20 RGP
                </Text>
              </Flex>
              <Image src="/arrow-right.svg" width={15} height={15} />
              <Flex ml={4}>
                <Image src="/bnb.svg" width={20} height={15} />
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
                <Text
                  fontSize="12px"
                  lineHeight="0"
                  color="rgba(255, 255, 255,0.25)"
                >
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
        </div>
      ) : (
        ''
      )}
    </Flex>
  );
};

export default OrderHistory;
