/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Flex, Text, Box, Circle } from '@chakra-ui/layout';
import { Menu } from '@chakra-ui/menu';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useMediaQuery, Image } from '@chakra-ui/react';
import { tokenList, tokenWhere } from '../../utils/constants';
import NullImage24 from '../../assets/Null-24.svg';

const InputSelector = ({
  max,
  value,
  onOpen,
  handleChange,
  selectedToken,
  selectedToToken,
}) => {
  const [isMobileDevice] = useMediaQuery('(min-width: 560px)');
  if (isMobileDevice) {
    return (
      <>
        <Flex justifyContent="space-between" mb={2}>
          <Input
            placeholder="0.0"
            fontSize="28px"
            color=" rgba(255,255,255)"
            value={value}
            isRequired
            width="40%"
            border={0}
            variant="unstyled"
            onChange={e => {
              handleChange(e);
            }}
            className={selectedToToken ? 'to__button' : 'from__button'}
          />
          <Flex
            cursor="pointer"
            justifyContent="space-between"
            alignItems="right"
          >
            {max ? (
              <Text
                bg="rgba(64, 186, 213,0.25)"
                p="5px 10px"
                rounded="lg"
                mt="10px"
                fontSize="xs"
                width="50%"
                textAlign="center"
                color="#72cfe4"
                _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
                onClick={e => {
                  handleChange(e, tokenWhere(selectedToken.symbol).balance);
                }}
              >
                MAX
              </Text>
            ) : (
              <></>
            )}
            <Box>
              <Menu>
                <Button
                  onClick={onOpen}
                  className={
                    selectedToToken
                      ? 'selectedTo__button'
                      : 'selectFrom__button'
                  }
                  border="0px"
                  pl={3}
                  fontWeight="regular"
                  fontSize="16px"
                  cursor="pointer"
                  bg={selectedToken ? 'none' : '#40BAD5'}
                  color="white"
                  _hover={{ background: '#72cfe4', color: '#29235E' }}
                  rightIcon={<ChevronDownIcon />}
                >
                  {typeof selectedToken.symbol !== 'undefined' && (
                    <>
                      <Circle size="40px" color="rgba(64, 186, 213,0.35)">
                        <Image src={selectedToken.logoURI} />
                      </Circle>

                      {selectedToken.imported === true && <NullImage24 />}
                      <Text
                        className={
                          selectedToToken
                            ? 'textTo__button'
                            : 'textFrom__button'
                        }
                        ml={2}
                      >
                        {selectedToken.symbol}
                      </Text>
                    </>
                  )}
                </Button>
              </Menu>
            </Box>
          </Flex>
        </Flex>
      </>
    );
  }
  return (
    <>
      <Flex justifyContent="space-between">
        <Input
          placeholder="0.1"
          className={selectedToToken ? 'to__button' : 'from__button'}
          fontSize="lg"
          color=" rgba(255, 255, 255,0.25)"
          value={value}
          isRequired
          type="number"
          onChange={e => {
            handleChange(e);
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
            onClick={e => {
              handleChange(e, tokenWhere(selectedToken.symbol).balance);
            }}
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
              {typeof selectedToken.symbol !== 'undefined' && (
                <>
                  <Image className="select__icon" src={selectedToken.img} />
                  <span
                    className={`icon icon-${selectedToken.symbol.toLowerCase()}`}
                  />
                  <Text
                    className={
                      selectedToToken ? 'textTo__button' : 'textFrom__button'
                    }
                    ml={4}
                  >
                    {selectedToken.symbol}
                  </Text>
                </>
              )}
            </Button>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};
export default InputSelector;
