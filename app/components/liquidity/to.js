/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input, Spinner } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import PropTypes from 'prop-types';
import { getAddressTokenBalance } from 'utils/wallet-wiget/connection';
import { ethers } from 'ethers';

import { showErrorMessage } from 'containers/NoticeProvider/actions';
import CustomSelectInput from './customSelectInput';

const Manual = ({
  wallet,
  toValue,
  setToAddress,
  selectedToken,
  selectedValue,
  selectingToken,
  toSelectedToken,
  setToSelectedToken,
}) => {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (typeof selectedValue.abi !== 'undefined') {
        try {
          setLoading(true);
          setBalance(
            await getAddressTokenBalance(
              wallet.address,
              selectedValue.address,
              selectedValue.abi,
              wallet.signer,
            ),
          );
          setLoading(false);
        } catch (e) {
          showErrorMessage(e);
          setLoading(false);
        }
      }
    })();
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
            TO:
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
                setSelectedToken={obj => {
                  setToSelectedToken(obj);
                  setToAddress(obj.address);
                }}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

Manual.propTypes = {
  wallet: PropTypes.object,
  toValue: PropTypes.number.isRequired,
  setToAddress: PropTypes.func.isRequired,
  selectedToken: PropTypes.func.isRequired,
  selectingToken: PropTypes.array.isRequired,
  selectedValue: PropTypes.object.isRequired,
  toSelectedToken: PropTypes.object.isRequired,
  setToSelectedToken: PropTypes.func.isRequired,
};
export default Manual;
