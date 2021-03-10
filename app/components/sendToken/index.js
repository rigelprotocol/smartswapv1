// @ts-nocheck
<<<<<<< HEAD
import { ethers } from 'ethers';
=======
import React from 'react';
>>>>>>> a4c3343f6512eaf74fd87c7cd1f2530650795d6e
import { Box } from '@chakra-ui/layout';
import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
  Text,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
=======
import { Input } from '@chakra-ui/input';
>>>>>>> a4c3343f6512eaf74fd87c7cd1f2530650795d6e
import ArrowDownImage from '../../assets/arrow-down.svg';
import From from './from';
import To from './to';
import swapConnect, {provider, signer} from '../../utils/swapConnect';
import SmartSwapRouter02 from '../../utils/abis/SmartSwapRouter02.json';

<<<<<<< HEAD
const Manual = () => {
 
  return (
    <div>
      <Box
        boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
        bg="#120136"
        mt={3}
        p={5}
        rounded="2xl"
      >
        <From />
        <Box textAlign="center">
          <ArrowDownImage />
        </Box>
        <To />
        <Box mt={14}>
          <Button
            d="block"
            w="100%"
            h="50px"
            color="#40BAD5"
            border="none"
            fontWeight="regular"
            fontSize="lg"
            cursor="pointer"
            rounded="2xl"
            bg="rgba(64, 186, 213,0.25)"
            borderColor="#40BAD5"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
            _active={{ outline: '#29235E', background: '#29235E' }}
            onClick={() => {
              console.log('Hellooo.....')
=======
const Manual = () => (
  <div>
    <Box
      boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
      bg="#120136"
      mt={3}
      p={5}
      rounded="2xl"
    >
      <Flex
        style={{
          right: '0px',
          position: 'relative',
          left: '86%',
        }}
      >
        <Popover>
          <PopoverTrigger>
            <SettingsIcon
              color="#fff"
              m={4}
              style={{
                fontSize: '1.4rem',
                float: 'right',
                boxShadow: 'rgb(74, 74, 74) 0px 0px 3px 2px',
                cursor: 'pointer',
                borderRadius: '100%',
              }}
            />
          </PopoverTrigger>
          <PopoverContent
            style={{
              backgroundColor: 'rgb(41, 35, 94)',
              color: 'white',
>>>>>>> a4c3343f6512eaf74fd87c7cd1f2530650795d6e
            }}
          >
            <PopoverHeader fontWeight="semibold">
              Transaction Settings
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Text>
                Slippage tolerance{' '}
                <Tooltip
                  label="Your transactions will revert if "
                  aria-label="A tooltip"
                >
                  &#x1F6C8;
                </Tooltip>
              </Text>
              <Flex>
                <Input
                  placeholder="0.0"
                  fontSize="lg"
                  color=" rgba(255, 255, 255,0.25)"
                  isRequired
                  type="number"
                  size="sm"
                  width="30%"
                />
              </Flex>
            </PopoverBody>
            <PopoverFooter d="flex" justifyContent="flex-end" />
          </PopoverContent>
        </Popover>
      </Flex>
      <From />
      <Box textAlign="center">
        <ArrowDownImage />
      </Box>
      <To />
      <Box mt={14}>
        <Button
          d="block"
          w="100%"
          h="50px"
          color="#40BAD5"
          border="none"
          fontWeight="regular"
          fontSize="lg"
          cursor="pointer"
          rounded="2xl"
          bg="rgba(64, 186, 213,0.25)"
          borderColor="#40BAD5"
          _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
          _active={{ outline: '#29235E', background: '#29235E' }}
          onClick={() => {
            console.log(props);
          }}
        >
          Enter an Amount
        </Button>
      </Box>
    </Box>
  </div>
);

export default Manual;
