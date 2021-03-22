import {Box, Flex, Text} from "@chakra-ui/layout";
import {Line} from "react-chartjs-2";
import Image from "next/dist/client/image";
import {Menu} from "@chakra-ui/menu";
import {Button} from "@chakra-ui/button";
import {ChevronDownIcon} from "@chakra-ui/icons";

const SetTime = ({ setTime }) => {
    const data = {
        labels: ['Jan','Feb','Mar','Apr'],
        datasets: [
            {
                label: 'Charts',
                backgroundColor: [
                    'rgba(65, 186, 213, 0.5)',
                ],
                borderColor: [
                    '#40BAD5',
                ],
                borderWidth: 1,
                data: [165, 59, 680, 381, 56, 95, 40]
            }
        ]
    };
    return (
        <div>
            { setTime ? <div>
                <Box bg="#120136" height="250px" rounded="md" pt={4} mt={4}>
                    <Box color="gray.400" px={4}>
                        <Text fontSize="sm">Chart graph</Text>

                        <Line
                            data={data}
                        />
                    </Box>
                </Box>
                <Box bg="#120136" mt={5} p={4} borderRadius="15px" minHeight="50vh">
                    <Box>
                        <Flex justifyContent="flex-end" mb={1}>
                            <Text fontSize="sm" color="gray.500">Balance: 2,632.34</Text>
                        </Flex>
                        <Flex  justifyContent="space-between" bg="#29235E" h="60px" px={4} borderRadius="15px">
                            <Text fontSize="lg" color="gray.500">12</Text>
                            <Flex w="55%" justifyContent="space-between" alignItems="center">
                                <Text fontSize="sm" color="#40BAD5">MAX</Text>
                                <Flex>
                                    <Image src="/rgp.svg" width={30} height={15} />
                                    <Menu>
                                        <Button border="0px" h="30px" fontWeight="light" fontSize="13px" cursor="pointer" bg="#29235E"  color="#fff" _hover={{background: '#29235E'}} _focus={{ outline:'#29235E',background: '#29235E'}} rightIcon={<ChevronDownIcon />}>
                                            RDP
                                        </Button>
                                    </Menu>
                                </Flex>
                            </Flex>

                        </Flex>
                        <Box textAlign="center">
                            <Image src="/arrow-down.svg" width={10} height={45} />
                        </Box>

                        <Flex justifyContent="flex-end" >
                            <Text fontSize="sm" color="gray.500">Balance: 0</Text>
                        </Flex>
                        <Flex  justifyContent="space-between" bg="#29235E" h="60px" px={4} borderRadius="15px">
                            <Text fontSize="lg" color="gray.500">33.45</Text>
                            <Flex justifyContent="space-between" alignItems="center">
                                <Flex>
                                    <Image src="/bnb.svg" width={30} height={15} />
                                    <Menu>
                                        <Button border="0px" h="30px" fontWeight="light" fontSize="13px" cursor="pointer" bg="#29235E"  color="#fff" _hover={{background: '#29235E'}} _focus={{ outline:'#29235E',background: '#29235E'}} rightIcon={<ChevronDownIcon />}>
                                            BNB
                                        </Button>
                                    </Menu>
                                </Flex>
                            </Flex>

                        </Flex>
                        <Box>
                            <Text  fontSize="13px" color="gray.500" >
                                Set price:
                            </Text>
                            <Text w="25%" fontSize="13px" bg="#29235E" color="#fff" p={3} rounded="md" >
                                0.0045
                            </Text>
                        </Box>
                        <Flex alignItems="center">
                            <Text color="gray.400" fontSize="13px" mr={3}>Current price: 0.003512  RGB per  BNB</Text>
                            <Image src="/forward.svg" width={14} height={10}/>
                        </Flex>
                        <Box mt={8}>
                            <Button d="block" w="100%" color="#40BAD5" border="1px" fontWeight="light" fontSize="sm" cursor="pointer" bg="#29235E" borderColor="#40BAD5" color="#40BAD5" _hover={{background: '#29235E'}} _focus={{ outline:'#29235E',background: '#29235E'}}>Set Swap</Button>
                        </Box>
                    </Box>
                </Box>
            </div> : ''}
        </div>
    )
}

export default SetTime;