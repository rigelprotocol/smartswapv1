import React from 'react';
import { Flex, Text } from '@chakra-ui/layout';
import { Menu } from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useMediaQuery } from '@chakra-ui/react';
import RGPImage from '../../assets/rgp.svg';
import BNBImage from '../../assets/bnb.svg';
import ETHImage from '../../assets/eth.svg';
import { tokenList, TOKENS } from '../../utils/constants';

const InputSelector = props => {
  const {
    handleChange,
    value,
    selectedToken,
    max,
    onOpen,
    getToAmount,
  } = props;
  tokenList.map((tokens, index) => {
    console.log(tokens);
  });
  const [isMobileDevice] = useMediaQuery('(min-width: 560px)');
  if (isMobileDevice) {
    return (
      <>
        <img src={tokenList[0].icon} alt="" />
        <Flex justifyContent="space-between">
          <Input
            placeholder="0.0"
            fontSize="lg"
            color=" rgba(255, 255, 255,0.25)"
            value={value}
            isRequired
            width="38%"
            onChange={e => {
              handleChange(e);
            }}
          />
          <Flex
            cursor="pointer"
            justifyContent="space-between"
            alignItems="center"
          >
            {max ? (
              <Text
                bg="rgba(64, 186, 213,0.25)"
                p="5px 10px"
                rounded="lg"
                mt="10px"
                mr="15px"
                fontSize="sm"
                color="#72cfe4"
                _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
              >
                MAX
              </Text>
            ) : (
              <></>
            )}
            <Flex>
              <Menu>
                <Button
                  onClick={onOpen}
                  border="0px"
                  h="30px"
                  fontWeight="regular"
                  fontSize="16px"
                  cursor="pointer"
                  bg={selectedToken ? 'none' : '#40BAD5'}
                  marginBottom="5px"
                  color="white"
                  _hover={{ background: '#72cfe4', color: '#29235E' }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {selectedToken === TOKENS.BNB && <BNBImage />}
                  {selectedToken === TOKENS.ETH && <ETHImage />}
                  {selectedToken === TOKENS.RGP && <RGPImage />}
                  <Text ml={4}>{selectedToken}</Text>
                </Button>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
  return (
    <>
      <Flex justifyContent="space-between">
        <Input
          placeholder="0.0"
          fontSize="lg"
          color=" rgba(255, 255, 255,0.25)"
          value={value}
          isRequired
          type="number"
          onChange={e => {
            handleChange(e);
            getToAmount(e.target.value);
          }}
        />
      </Flex>
      <Flex cursor="pointer" justifyContent="space-between" alignItems="center">
        {max ? (
          <Text
            bg="rgba(64, 186, 213,0.25)"
            p="5px 10px"
            rounded="lg"
            mt="10px"
            mr="15px"
            fontSize="sm"
            color="#72cfe4"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
          >
            MAX
          </Text>
        ) : (
          <></>
        )}
        <Flex>
          <Menu>
            <Button
              onClick={onOpen}
              border="0px"
              h="30px"
              fontWeight="regular"
              fontSize="16px"
              cursor="pointer"
              bg={selectedToken ? 'none' : '#40BAD5'}
              marginBottom="5px"
              color="white"
              _hover={{ background: '#72cfe4', color: '#29235E' }}
              rightIcon={<ChevronDownIcon />}
            >
              {selectedToken === TOKENS.BNB && <BNBImage />}
              {selectedToken === TOKENS.ETH && <ETHImage />}
              {selectedToken === TOKENS.RGP && <RGPImage />}
              <Text ml={4}>{selectedToken}</Text>
            </Button>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};
export default InputSelector;
