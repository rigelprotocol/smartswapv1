import { Box, Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import Question from '../../assets/question.svg';
import Liquidities from './liquidities';
const Index = ({
  liquidities,
  addLiquidityPage,
  addLiquidity,
  removeLiquidity,
  removeALiquidity,
  liquidityLoading,
}) => (
  <>
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
          onClick={() => addLiquidityPage()}
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
      {liquidityLoading ? <Flex
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
          Loading...
          </Text>
      </Flex> :



        (liquidities.length === 0 ? (
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
        ) : (
          <Box>
            {liquidities.map((liquid, index) => (
              <Liquidities
                key={index + "key"}
                value={liquid}
                addLiquidity={addLiquidity}
                removeLiquidity={removeLiquidity}
                removeALiquidity={removeALiquidity}

              />
            ))}
          </Box>)
        )}

      {/* LIQUIDITY */}

      <Flex justifyContent="center" mx={5} mb={4}>
        <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
          Dont see a pool you joined?
        </Text>
        <Text fontSize="sm" color="blue.300" ml={3} cursor="pointer">
          Import it
        </Text>
      </Flex>
    </Box>
  </>
);
Index.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  liquidities: PropTypes.array,
  addLiquidityPage: PropTypes.func.isRequired,
  removeALiquidity: PropTypes.func.isRequired,
  removeLiquidity: PropTypes.func.isRequired,
  addLiquidity: PropTypes.func.isRequired,
};
export default Index;
