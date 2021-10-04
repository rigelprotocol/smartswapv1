import { Box, Text, Flex, Link } from '@chakra-ui/layout';
import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/spinner/spinner';
import rightArrow from '../../assets/right-arrow.png';

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { createURLNetwork } from 'utils/UtilFunc';

import Empty from './EmptyHistory';

function MarketHisory({ data, loading, dataIsEmpty }) {

    const {
        token1Icon,
        token2Icon,
        token1,
        token2,
        amountIn,
        amountOut,
        time,
        hash,
    } = data;

    return (

        <>
            {loading && <Spinner />}
            {dataIsEmpty && <Empty />}

            <Flex p={3}>
                <Box
                    color="#fff"
                    bg="#29235E"
                    width="100%"
                    justifyContent="space-between"
                    px={4}
                    py={2}
                    rounded="2xl"
                    key={time}
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
                            <img src={token1Icon} width={25} height={25} alt="logo" />
                            <Text fontSize="sm" color="#fff" ml={2}>
                                {amountIn} <span>{token1.symbol}</span>
                            </Text>
                        </Flex>
                        <img src={rightArrow} width={15} height={15} alt="-" />
                        <Flex ml={4}>
                            <img src={token2Icon} width={25} height={25} alt="logo" />
                            <Text fontSize="sm" color="#fff" ml={2}>
                                {amountOut} <span>{token2.symbol}</span>
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
                                Transaction
                            </Text>
                            <Link color="#fff" fontSize="14px" fontWeight="regular" href={hash} isExternal>
                                View <ExternalLinkIcon mx="2px" />
                            </Link>


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
                                {time}
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


MarketHisory.propTypes = {
    data: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};


export default MarketHisory;
