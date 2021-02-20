import {Box, Flex, Text} from "@chakra-ui/layout";
import Image from "next/dist/client/image";

const Market = ({ market }) => {
    return (
        <div>
            { market ? <Flex alignItems="center" rounded={100} bg="#" mt={5} cursor="pointer" >
                <Flex color="#fff"  alignItems="center" flexDirection="column" width="100%" justifyContent="space-between" rounded="md">
                    <Flex color="#fff" alignItems="center" px={2} rounded="md" bg="#29235E" h="50px" mb={4}>
                        <Flex px={3}>
                            <Text  fontSize="sm" color="gray.400" mr={2}>
                                1532.85 RGP
                            </Text>
                            <Image src="/arrow-right.svg" width={20}  height={15}/>
                            <Text fontSize="sm" color="gray.400" ml={2}>
                                2.32 BNB
                            </Text>
                        </Flex>
                        <Box >
                            <Text fontSize="sm" color="gray.400" lineHeight="0">@ 0.003521</Text>
                            <Text fontSize="9px" textAlign="right" color="gray.500" lineHeight="0">18.4h</Text>
                        </Box>
                    </Flex>

                    <Flex color="#fff" alignItems="center" px={2} rounded="md" bg="#29235E" h="50px">
                        <Flex px={3}>
                            <Text  fontSize="sm" color="gray.400" mr={2}>
                                1532.85 RGP
                            </Text>
                            <Image src="/arrow-right.svg" width={20}  height={15}/>
                            <Text fontSize="sm" color="gray.400" ml={2}>
                                2.32 BNB
                            </Text>
                        </Flex>
                        <Box >
                            <Text fontSize="sm" color="gray.400" lineHeight="0">@ 0.003521</Text>
                            <Text fontSize="9px" textAlign="right" color="gray.500" lineHeight="0">18.4h</Text>
                        </Box>
                    </Flex>
                </Flex>

            </Flex> : '' }
        </div>
    )
}

export default Market;