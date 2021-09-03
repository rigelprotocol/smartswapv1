/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import PropTypes from 'prop-types';
import { useDisclosure } from '@chakra-ui/hooks';
import { ChevronDownIcon } from '@chakra-ui/icons';
import TokenListBox from 'components/TokenListBox';

const LiquidityFromBox = ({
  fromValue,
  setFromValue,
  setFromAddress,
  setDetermineInputChange,
  checkIfLiquidityPairExist,
  fromSelectedToken,
  setFromSelectedToken,
  setFromInputMax,
  label,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
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
            {label || 'From'}
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {` `}
            {fromSelectedToken.balance}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
        <InputGroup>
          <Input
            type="number"
            id="input__field"
            placeholder="0.0"
            value={fromValue}
            border="1px solid rgba(255, 255, 255,0.25)"
            fontSize="lg"
            color="rgb(255, 255, 255)"
            onChange={event => {
              setFromValue(event.target.value);
              setDetermineInputChange("from")
            }}
          />
             <InputRightElement marginRight="5px">
              <Text
              cursor="pointer" 
              color="rgba(64, 186, 213, 1)"
              onClick={()=>setFromInputMax()}>
                max
              </Text>
          </InputRightElement>
          </InputGroup>
          <Flex alignItems="center">
            <Menu>
              <Button
                onClick={onOpen}
                border="0px"
                h="30px"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                bg={fromSelectedToken.name ? 'none' : '#40BAD5'}
                marginBottom="5px"
                color="white"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
                rightIcon={<ChevronDownIcon />}
              >
                <span
                  className={`icon icon-${fromSelectedToken.symbol.toLowerCase()}`}
                />
                <Text ml={4}>{fromSelectedToken.symbol}</Text>
              </Button>
              <TokenListBox
                setSelectedToken={setFromSelectedToken}
                setPathArray={setFromAddress}
                isOpen={isOpen}                
                checkIfLiquidityPairExist={checkIfLiquidityPairExist}
                onClose={onClose}
                isOpenModal={isOpenModal}
                onOpenModal={onOpenModal}
                onCloseModal={onCloseModal}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
LiquidityFromBox.propTypes = {
  fromValue: PropTypes.string.isRequired,
  setFromValue: PropTypes.func.isRequired,
  fromSelectedToken: PropTypes.object.isRequired,
  setFromAddress: PropTypes.func.isRequired,
  setFromSelectedToken: PropTypes.func.isRequired,
  checkIfLiquidityPairExist: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default LiquidityFromBox;
