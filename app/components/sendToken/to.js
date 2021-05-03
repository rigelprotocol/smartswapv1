/* eslint-disable react/prop-types */
import { useDisclosure } from '@chakra-ui/hooks';
import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import TokenListBox from 'components/TokenListBox';
import { tokenWhere } from 'utils/constants';
import { connect } from 'react-redux';
import InputSelector from './InputSelector';

const SendTo = props => {
  const {
    amountIn,
    handleChangeToAmount,
    setPathToArray,
    selectedToToken,
    setSelectedToToken,
    wallet,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setSelectedToToken(tokenWhere('SELECT A TOKEN'));
  }, [wallet]);
  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        mt="10px"
        h="100%"
        justifyContent="space-between"
        px={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            To
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {selectedToToken.balance}
          </Text>
        </Flex>
        <InputSelector
          max={false}
          handleChange={handleChangeToAmount}
          value={amountIn}
          selectedToken={selectedToToken}
          onOpen={onOpen}
        />
      </Box>
      <TokenListBox
        setSelectedToToken={setSelectedToToken}
        setPathToArray={setPathToArray}
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
)(SendTo);
