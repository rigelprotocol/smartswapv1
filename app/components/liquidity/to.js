/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Input, Button } from '@chakra-ui/react';
import { Menu } from '@chakra-ui/menu';
import PropTypes from 'prop-types';

import { useDisclosure } from '@chakra-ui/hooks';
import { ChevronDownIcon } from '@chakra-ui/icons';
import TokenListBox from 'components/TokenListBox';

const Manual = ({
  toValue,
  setToAddress,
  toSelectedToken,
  setToSelectedToken,
  label,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            {label || 'TO:'}
          </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: {` `}
            {toSelectedToken.balance}
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
              <Button
                onClick={onOpen}
                border="0px"
                h="30px"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                bg={toSelectedToken.name ? 'none' : '#40BAD5'}
                marginBottom="5px"
                color="white"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
                rightIcon={<ChevronDownIcon />}
              >
                <span
                  className={`icon icon-${toSelectedToken.symbol.toLowerCase()}`}
                />
                <Text ml={4}>{toSelectedToken.symbol}</Text>
              </Button>
              <TokenListBox
                setSelectedToken={setToSelectedToken}
                setPathArray={setToAddress}
                isOpen={isOpen}
                onClose={onClose}
              />
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

Manual.propTypes = {
  toValue: PropTypes.number.isRequired,
  setToAddress: PropTypes.func.isRequired,
  toSelectedToken: PropTypes.object.isRequired,
  setToSelectedToken: PropTypes.func.isRequired,
  label: PropTypes.string,
};
export default Manual;
