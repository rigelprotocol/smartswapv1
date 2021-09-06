/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text,Circle } from '@chakra-ui/layout';
import { Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import PropTypes from 'prop-types';

import { useDisclosure } from '@chakra-ui/hooks';
import { ChevronDownIcon } from '@chakra-ui/icons';
import TokenListBox from 'components/TokenListBox';
import NullImage24 from '../../assets/Null-24.svg';
import {
  NumberInput,
  NumberInputField,
  useMediaQuery,
  Image
} from "@chakra-ui/react"
const Manual = ({
  toValue,
  setToAddress,
  toSelectedToken,
  setToSelectedToken,
  label,
  checkIfLiquidityPairExist,
  setDetermineInputChange,
  setToInputMax,
  setToValue
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
  const [isMobileDevice] = useMediaQuery('(min-width: 560px)');
  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        mt="10px"
        paddingBottom="10px"
        justifyContent="space-between"
        px={isMobileDevice ? "4":"2"}
        mx={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="rgba(255, 255, 255, 0.5)">
            {label || 'TO'}
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {` `}
            {toSelectedToken.balance}
          </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <InputGroup>
          <NumberInput
             onChange={value => {
              setToValue(value);
              setDetermineInputChange("to")
            }}
            variant="unstyled"
            value={toValue}
          >
            <NumberInputField  
            padding="0"
            border="0"
            placeholder="0.0"
            fontSize="24px"
            paddingRight="40px"
            color="#FFFFFF"
            opacity="0.5"
           />
          </NumberInput>
             <InputRightElement marginRight="5px">
              <Text
              cursor="pointer" 
              color="rgba(64, 186, 213, 1)"
              onClick={()=>setToInputMax()}
              marginTop="2px"
              >
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
                bg={toSelectedToken.symbol !== "SELECT A TOKEN" ? 'none' : '#40BAD5'}
                marginBottom="5px"
                color={toSelectedToken.symbol !== "SELECT A TOKEN" ? 'white' : 'black'}
                _hover={{ background: '#72cfe4', color: '#29235E' }}
                rightIcon={<ChevronDownIcon />}
                px={toSelectedToken.symbol !== "SELECT A TOKEN" ? '3' : '1'}
              >
                 {(typeof toSelectedToken.symbol !== 'undefined' && toSelectedToken.symbol!=="SELECT A TOKEN" && !toSelectedToken.imported) &&  
                 <>
                 <Circle size="40px" color="rgba(64, 186, 213,0.35)">
                        <Image src={toSelectedToken.logoURI} />
                      </Circle>
                      </>
                      }
                {toSelectedToken.imported && 
                      <Box px="0">
                      <NullImage24 />
                      </Box>
                      }
                <Text ml={toSelectedToken.symbol !== "SELECT A TOKEN" ? '4' : '0'}>{toSelectedToken.symbol}</Text>
              </Button>
              <TokenListBox
                setSelectedToken={setToSelectedToken}
                setPathArray={setToAddress}
                isOpen={isOpen}
                onClose={onClose}
                isOpenModal={isOpenModal}
                checkIfLiquidityPairExist={checkIfLiquidityPairExist}
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

Manual.propTypes = {
  toValue: PropTypes.string.isRequired,
  setToAddress: PropTypes.func.isRequired,
  toSelectedToken: PropTypes.object.isRequired,
  setToSelectedToken: PropTypes.func.isRequired,
  checkIfLiquidityPairExist: PropTypes.func.isRequired,
  setToValue: PropTypes.func.isRequired,
  disableToSelectInputBox: PropTypes.bool.isRequired,
  label: PropTypes.string,
};
export default Manual;
