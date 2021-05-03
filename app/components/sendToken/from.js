/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { connect } from 'react-redux';
import InputSelector from './InputSelector';
import { tokenWhere } from '../../utils/constants';
import TokenListBox from '../TokenListBox/index';

const From = ({
  fromAmount,
  handleChangeFromAmount,
  setPathArray,
  selectedToken,
  setSelectedToken,
  wallet,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setSelectedToken(tokenWhere('rgp'));
  }, [wallet]);
  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        h="100%"
        mb="10px"
        justifyContent="space-between"
        px={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            From
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {selectedToken.balance}
          </Text>
        </Flex>
        <InputSelector
          handleChange={handleChangeFromAmount}
          value={fromAmount}
          max
          onOpen={onOpen}
          selectedToken={selectedToken}
        />
      </Box>
      <TokenListBox
        setSelectedToken={setSelectedToken}
        setPathArray={setPathArray}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
const mapStateToProps = ({ wallet }) => ({ wallet });
export default connect(
  mapStateToProps,
  {},
)(From);
