/* eslint-disable no-unused-vars */
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input, Spinner } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAddressTokenBalance } from 'utils/wallet-wiget/connection';
import CustomSelectInput from './customSelectInput';

const LiquidityFromBox = ({
  wallet,
  selectingToken,
  fromValue,
  setFromValue,
  setFromAddress,
  fromSelectedToken,
  setFromSelectedToken,
}) => {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (typeof fromSelectedToken.abi !== 'undefined') {
        try {
          setLoading(true);
          setBalance(
            await getAddressTokenBalance(
              wallet.address,
              fromSelectedToken.address,
              fromSelectedToken.abi,
              wallet.signer,
            ),
          );
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      }
    })();
  }, [fromSelectedToken]);
  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        h="100px"
        mb="10px"
        justifyContent="space-between"
        px={4}
        mx={4}
        mt={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            From
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {` `}{' '}
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="sm"
              />
            ) : (
              balance
            )}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Input
            type="number"
            id="input__field"
            placeholder="0.0"
            value={fromValue}
            border="1px solid rgba(255, 255, 255,0.25)"
            fontSize="lg"
            color="rgb(255, 255, 255)"
            onChange={event => setFromValue(event.target.value)}
          />
          <Flex alignItems="center">
            <Menu>
              <CustomSelectInput
                selectingToken={selectingToken}
                defaultSelect={1}
                selectedToken={() => '.'}
                setSelectedToken={obj => {
                  setFromSelectedToken(obj);
                  setFromAddress(obj.address);
                }}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
LiquidityFromBox.propTypes = {
  wallet: PropTypes.object,
  selectingToken: PropTypes.array.isRequired,
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  fromSelectedToken: PropTypes.object.isRequired,
  setFromAddress: PropTypes.func.isRequired,
  setFromSelectedToken: PropTypes.func.isRequired,
};

export default LiquidityFromBox;
