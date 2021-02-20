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

const AutoTime = ({ autoTime }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Charts',
        backgroundColor: ['rgba(65, 186, 213, 0.5)'],
        borderColor: ['#40BAD5'],
        borderWidth: 1,
        data: [165, 59, 680, 381, 56, 95, 40],
      },
    ],
  };
  return (
    <div>
      {autoTime ? (
        <div>
          <Box bg="#120136" height="250px" rounded="md" pt={4} mt={4}>
            <Box color="gray.400" px={4}>
              <Text fontSize="sm">Chart graph</Text>

              <Line data={data} />
            </Box>
          </Box>
          <Box bg="#120136" mt={5} p={4} borderRadius="15px" minHeight="50vh">
            <Box>
              <Flex justifyContent="flex-end" mb={1}>
                <Text fontSize="sm" color="gray.500">
                  Balance: 2,632.34
                </Text>
              </Flex>
              <Flex
                justifyContent="space-between"
                bg="#29235E"
                h="60px"
                px={4}
                borderRadius="15px"
              >
                <Text fontSize="lg" color="gray.500">
                  0.0
                </Text>
                <Flex
                  w="55%"
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
                        RDP
                      </Button>
                    </Menu>
                  </Flex>
                </Flex>
              </Flex>
              <Box textAlign="center">
                <Image src="/arrow-down.svg" width={10} height={45} />
              </Box>

              <Box
                d="block"
                w="100%"
                onClick={onOpen}
                bg="transparent"
                border="1px"
                h="56px"
                borderRadius="15px"
                fontWeight="light"
                fontSize="13px"
                cursor="pointer"
                borderColor="#40BAD5"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex color="#fff" alignItems="center" px={4} mt={1} mb={4}>
                    <Image src="/bnb.svg" width={30} height={25} />
                    <Text ml={3} fontSize="sm" color="gray.400">
                      BNB
                    </Text>
                  </Flex>

                  <ChevronDownIcon color="#fff" mr={3} mb={3} />
                </Flex>
              </Box>
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

export default AutoTime;
