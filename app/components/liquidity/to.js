/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import PropTypes from 'prop-types';
import CustomSelectInput from './customSelectInput';

const Manual = ({ selectingToken, selectedToken, toValue, selectedValue, toSelectedToken,
  setToSelectedToken, }) => {
  const [inputHeading1, setInputHeading1] = useState('To');
  const [inputHeading2, setInputHeading2] = useState(selectingToken.balance);
  useEffect(() => {
    if (selectedValue.id !== 0) {
      setInputHeading1('Input');
    } else {
      setInputHeading1('To');
    }
  }, [selectedValue]);
  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        mt="10px"
        h="100px"
        justifyContent="space-between"
        px={4}
        mx={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            {inputHeading1}
          </Text>
          {selectedValue.id !== 0 ? (
            <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
              Balance: {` `}{' '}
              {selectedValue.name == 'BNB'
                ? selectedValue.balance
                : selectedValue.name == 'ETH'
                  ? selectedValue.balance
                  : selectedValue.balance}
            </Text>
          ) : (
              <div />
            )}
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Input
            type="number"
            id="input__field"
            placeholder="0.0"
            value={toValue}
            border="1px solid rgba(255, 255, 255,0.25)"
            fontSize="lg"
            color="rgb(255, 255, 255)"
            disabled
            onChange={event => event.preventDefault()}
          />
          <Flex alignItems="center">
            <Menu>
              <CustomSelectInput
                selectingToken={selectingToken}
                defaultSelect={0}
                selectedToken={selectedToken}
                setSelectedToken={obj => setToSelectedToken(obj)}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

Manual.propTypes = {
  selectingToken: PropTypes.array.isRequired,
  toValue: PropTypes.number.isRequired,
  selectedToken: PropTypes.func.isRequired,
  selectedValue: PropTypes.object.isRequired,
  toSelectedToken: PropTypes.object.isRequired,
  setToSelectedToken: PropTypes.func.isRequired,

};
export default Manual;
