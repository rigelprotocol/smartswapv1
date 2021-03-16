/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// @ts-nocheck
/**
 *
 * LiquidityPage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/react';
import Layout from 'components/layout/index';

import From from 'components/liquidity/from';
import To from 'components/liquidity/to';
import Question from '../../assets/question.svg';
import Plus from '../../assets/plus-c.svg';
import ArrowLeft from '../../assets/arrow-left.svg';

export function LiquidityPage() {
  const [liquidity, setLiquidity] = useState(true);

  return (
    <div>
      <Layout title="Liquidity Page">
        <Flex
          mx={5}
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
          rounded="lg"
          mb={4}
        >
          {liquidity ? (
            <Box
              bg="#120136"
              minHeight="50vh"
              w={['100%', '100%', '29.50%', '29.5%']}
              rounded="lg"
            >
              <Box mt={5} p={5}>
                <Button
                  d="block"
                  w="100%"
                  h="50px"
                  color="#40BAD5"
                  border="none"
                  fontWeight="regular"
                  fontSize="lg"
                  cursor="pointer"
                  rounded="2xl"
                  bg="rgba(64, 186, 213,0.25)"
                  borderColor="#40BAD5"
                  _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
                  _active={{ outline: '#29235E', background: '#29235E' }}
                  onClick={() => setLiquidity(false)}
                >
                  Add Liquidity
                </Button>
              </Box>

              <Flex
                mx={5}
                justifyContent="space-between"
                alignItems="center"
                rounded="lg"
                my={4}
              >
                <Text color="gray.200" fontSize="md">
                  Your liquidity
                </Text>
                <Question />
              </Flex>

              <Flex
                color="#fff"
                bg="#29235E"
                h="100px"
                mb="10px"
                justifyContent="center"
                alignItems="center"
                px={4}
                mx={5}
                rounded="2xl"
              >
                <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
                  No Liquidity Found.
                </Text>
              </Flex>

              <Flex justifyContent="center" mx={5} mb={4}>
                <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
                  Don't see a pool you joined?
                </Text>
                <Text fontSize="sm" color="blue.300" ml={3} cursor="pointer">
                  Import it
                </Text>
              </Flex>
            </Box>
          ) : (
            <Box
              bg="#120136"
              minHeight="50vh"
              w={['100%', '100%', '29.50%', '29.5%']}
              rounded="lg"
            >
              <Flex justifyContent="space-between" alignItems="center" px={4}>
                <ArrowLeft
                  onClick={() => setLiquidity(true)}
                  cursor="pointer"
                />
                <Text color="gray.200">Add Liquidity</Text>
                <Question />
              </Flex>

              <From />
              <Flex justifyContent="center" my={3}>
                <Plus />
              </Flex>
              <To />

              <Box
                color="#fff"
                bg="#29235E"
                mt="10px"
                justifyContent="space-between"
                py={1}
                px={4}
                mx={4}
                rounded="2xl"
              >
                <Text fontSize="sm" color="gray.200" my={3}>
                  Prices and pool share
                </Text>
                <Flex justifyContent="space-between" px={2}>
                  <Box>
                    <Text
                      fontSize="sm"
                      color="gray.200"
                      my={3}
                      textAlign="center"
                    >
                      497.209
                    </Text>
                    <Text fontSize="sm" color="gray.500" my={3}>
                      RGP per BNB
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="sm"
                      color="gray.200"
                      my={3}
                      textAlign="center"
                    >
                      0.00201078
                    </Text>
                    <Text fontSize="sm" color="gray.500" my={3}>
                      ETH per DAI
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="sm"
                      color="gray.200"
                      my={3}
                      textAlign="center"
                    >
                      0%
                    </Text>
                    <Text fontSize="sm" color="gray.500" my={3}>
                      Share of Pool
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box mt={5} p={5}>
                {/* <Button */}
                {/*    d="block" */}
                {/*    w="100%" */}
                {/*    h="50px" */}
                {/*    color="#BEBEBE" */}
                {/*    border="none" */}
                {/*    fontWeight="regular" */}
                {/*    fontSize="lg" */}
                {/*    cursor="pointer" */}
                {/*    rounded="2xl" */}
                {/*    bg="#444159" */}
                {/*    borderColor="#40BAD5" */}
                {/*    _hover={{ background: 'rgba(64, 186, 213,0.35)' }} */}
                {/*    _active={{ outline: '#29235E', background: '#29235E' }} */}
                {/* > */}
                {/*    Invalid Pair */}
                {/* </Button> */}
                <Button
                  d="block"
                  w="100%"
                  h="50px"
                  color="#BEBEBE"
                  border="none"
                  fontWeight="regular"
                  fontSize="lg"
                  cursor="pointer"
                  rounded="2xl"
                  bg="#444159"
                  borderColor="#40BAD5"
                  _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
                  _active={{ outline: '#29235E', background: '#29235E' }}
                >
                  Enter an amount
                </Button>
              </Box>
            </Box>
          )}
        </Flex>
      </Layout>
    </div>
  );
}

LiquidityPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  liquidityPage,
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LiquidityPage);
