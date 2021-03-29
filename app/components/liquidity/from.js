/* eslint-disable no-unused-vars */
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomSelectInput from './customSelectInput';
const LiquidityFromBox = ({
  selectingToken,
  fromValue,
  setFromValue,
  fromSelectedToken,
  setFromSelectedToken,
}) => {
  const [inputHeading1, setInputHeading1] = useState('From');
  const [inputHeading2, setInputHeading2] = useState(selectingToken.balance);
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
            {fromSelectedToken.name == 'BNB'
              ? fromSelectedToken.balance
              : fromSelectedToken.name == 'ETH'
                ? fromSelectedToken.balance
                : fromSelectedToken.balance}
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
                defaultSelect={3}
                selectedToken={() => '.'}
                setSelectedToken={obj => setFromSelectedToken(obj)}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
LiquidityFromBox.propTypes = {
  selectingToken: PropTypes.array.isRequired,
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  fromSelectedToken: PropTypes.object.isRequired,
  setFromSelectedToken: PropTypes.func.isRequired,
};

export default LiquidityFromBox;
