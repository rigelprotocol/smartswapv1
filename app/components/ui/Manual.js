import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Line } from 'react-chartjs-2';
import Image from 'next/dist/client/image';
import { Menu } from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Input } from '@chakra-ui/input';

const Manual = ({ manual }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Charts',
        backgroundColor: ['rgba(65, 186, 213, 0.5)'],
        borderColor: ['#40BAD5'],
        borderWidth: 1,
        data: [0, 10, 4, 14, -10, 20, 5, 11],
      },
    ],
  };
  return (
    <div>
      {manual ? (
        <div>
          <Box bg="#120136" height="300px" rounded="md" pt={4} mt={4}>
            <Box color="gray.400" px={4}>
              <Text fontSize="sm">Chart graph</Text>

              <Line data={data} />
            </Box>
          </Box>
          <Box bg="#120136" mt={5} p={4} rounded="md">
            <Box
              color="#fff"
              bg="#29235E"
              h="100px"
              justifyContent="space-between"
              px={4}
              rounded="md"
            >
              <Flex justifyContent="space-between" mb={1}>
                <Text fontSize="sm" color="#40BAD5">
                  From
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Balance: 2,632.34
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontSize="lg" color="gray.500">
                  0.0
                </Text>
                <Flex
                  w="60%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text fontSize="sm" color="#40BAD5">
                    MAX
                  </Text>
                  <Flex>
                    <Image src="/rgp.svg" width={30} height={15} />
                    <Menu>
                      <Button
                        onClick={onOpen}
                        border="0px"
                        h="30px"
                        fontWeight="light"
                        fontSize="13px"
                        cursor="pointer"
                        bg="#29235E"
                        color="#fff"
                        _hover={{ background: '#29235E' }}
                        _focus={{ outline: 'none', background: 'none' }}
                        rightIcon={<ChevronDownIcon />}
                      >
                        RDP
                      </Button>
                    </Menu>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
            <Box textAlign="center">
              <Image src="/arrow-down.svg" width={80} height={25} />
            </Box>
            <Box
              color="#fff"
              bg="#29235E"
              h="100px"
              justifyContent="space-between"
              px={4}
              rounded="md"
            >
              <Flex justifyContent="space-between" mb={1}>
                <Text fontSize="sm" color="#40BAD5">
                  To
                </Text>
                {/*<Text fontSize="sm" color="gray.500">Balance: 2,632.34</Text>*/}
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" color="gray.500">
                  0.0
                </Text>
                <Menu>
                  <Button
                    onClick={onOpen}
                    border="0px"
                    h="30px"
                    fontWeight="light"
                    fontSize="13px"
                    cursor="pointer"
                    bg="#29235E"
                    color="#fff"
                    _hover={{ background: '#29235E' }}
                    _focus={{ outline: '#29235E', background: '#29235E' }}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Token
                  </Button>
                </Menu>
              </Flex>
            </Box>
            <Box mt={14}>
              <Button
                d="block"
                w="100%"
                color="#40BAD5"
                border="1px"
                fontWeight="light"
                fontSize="sm"
                cursor="pointer"
                bg="#29235E"
                borderColor="#40BAD5"
                color="#40BAD5"
                _hover={{ background: '#29235E' }}
                _focus={{ outline: '#29235E', background: '#29235E' }}
              >
                Connect
              </Button>
            </Box>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose} isCentered="true">
            <ModalOverlay />
            <ModalContent
              bg="#120136"
              color="#fff"
              borderRadius="20px"
              w="30vw"
              minHeight="60vh"
            >
              <ModalCloseButton
                bg={'none'}
                border="0px"
                color={'#fff'}
                _focus={{ outline: 'none' }}
              />
              <ModalHeader fontWeight="light" fontSize="sm">
                Select a token
              </ModalHeader>
              <ModalBody mt={4}>
                <Input
                  placeholder="Search by name or paste address"
                  borderColor="#40BAD5"
                  color="gray.500"
                  rounded="lg"
                  fontSize="sm"
                />
                <Flex justifyContent="space-between" mt={2}>
                  <Text fontSize="sm" fontWeight="light" color="#fff">
                    Token
                  </Text>
                  <Image src="/social/arrow-down.svg" width={20} height={15} />
                </Flex>
                <Flex justifyContent="space-between" mt={3}>
                  <Flex alignItems="center">
                    <Image src="/bnb.svg" width={20} height={15} />
                    <Text fontSize="sm" fontWeight="light" color="#fff" ml={2}>
                      BNB
                    </Text>
                  </Flex>
                  <Text fontSize="sm" fontWeight="light" color="#fff">
                    0
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" mt={1}>
                  <Flex alignItems="center">
                    <Image src="/eth.svg" width={20} height={15} />
                    <Text fontSize="sm" fontWeight="light" color="#fff" ml={2}>
                      ETH
                    </Text>
                  </Flex>
                  <Text fontSize="sm" fontWeight="light" color="#fff">
                    0
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" mt={1}>
                  <Flex alignItems="center">
                    <Image src="/rgp.svg" width={20} height={15} />
                    <Text fontSize="sm" fontWeight="light" color="#fff" ml={2}>
                      RGP
                    </Text>
                  </Flex>
                  <Text fontSize="sm" fontWeight="light" color="#fff">
                    2,632.34
                  </Text>
                </Flex>
              </ModalBody>

              <ModalFooter>
                {/*<Button d="block" w="100%" fontWeight="light" cursor="pointer" border="0px" borderColor="#40BAD5" _hover={{ background: '#40BAD5', opacity:.9}} bg="#40BAD5" color="#fff" fontSize="md">Connect</Button>*/}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Manual;
