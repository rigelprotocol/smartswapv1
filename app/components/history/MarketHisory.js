import { Box, Text, Flex } from '@chakra-ui/layout';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/spinner/spinner';
import rightArrow from '../../assets/right-arrow.png';

import Empty from './EmptyHistory';

function MarketHisory() {


    return (
        <>

            <Flex p={3}>
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
                            <img width={25} height={25} alt="logo" />
                            <Text fontSize="sm" color="#fff" ml={2}>
                                {32} <span>{"BID"}</span>
                            </Text>
                        </Flex>
                        <img src={rightArrow} width={15} height={15} alt="-" />
                        <Flex ml={4}>
                            <img width={25} height={25} alt="logo" />
                            <Text fontSize="sm" color="#fff" ml={2}>
                                {23} <span>{"BnB"}</span>
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
                                Fee
                            </Text>
                            <Text color="#fff" fontSize="14px" fontWeight="regular">
                                5
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                fontSize="12px"
                                lineHeight="0"
                                color="rgba(255, 255, 255,0.25)"
                            >
                                Time &nbsp;
                            </Text>
                            <Text color="#fff" fontSize="14px" fontWeight="regular">
                                122
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

            </Flex>
        </>
    );
}


export default MarketHisory;
