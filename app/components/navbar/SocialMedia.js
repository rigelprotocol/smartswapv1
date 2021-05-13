import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { Menu, MenuButton, MenuList, Button, Link } from '@chakra-ui/react';
import Telegram from '../../assets/social/telegram.svg';
import Twitter from '../../assets/social/twitter.svg';
import Facebook from '../../assets/social/facebook.svg';
import LinkedIn from '../../assets/social/linkedin.svg';
import Github from '../../assets/social/github.svg';
import Medium from '../../assets/social/medium.svg';

const Nav = () => {
  const [show, setShow] = useState(false);
  return (
    <Box ml={4}>
      <Menu>
        <MenuButton
          as={Button}
          border="0px"
          bg="#120136"
          rounded="xl"
          cursor="pointer"
          color="#fff"
          _active={{ outline: 'none', background: '#120136', border: 'none' }}
          onClick={() => setShow(!show)}
          _hover={{ background: '#120136', border: 'none' }}
        >
          ...
        </MenuButton>
        {show && (
          <MenuList
            bg="#120136"
            w="40px"
            color="#fff"
            border="0px"
            rounded="2xl"
            border=" 1px solid rgba(255, 255, 255,0.15) "
            py={2}
            px={2}
          >
            <Flex
              _hover={{ background: '#29235E' }}
              _focus={{ outline: 0, background: '#29235E' }}
              cursor="pointer"
              fontSize="14px"
              rounded="xl"
              h="60px"
              p="0px 10px"
              alignItems="center"
              mb={2}
              cursor="pointer"
            >
              <Telegram />
              <Text ml={4}>
                <Link href="https://www.t.me/rigelprotocol" isExternal>
                  Telegram
                </Link>
              </Text>
            </Flex>
            <Flex
              _hover={{ background: '#29235E' }}
              _focus={{ outline: 0, background: '#29235E' }}
              cursor="pointer"
              fontSize="14px"
              rounded="xl"
              h="60px"
              p="0px 10px"
              alignItems="center"
              mb={2}
              cursor="pointer"
              alignItems="center"
              mb={2}
              cursor="pointer"
            >
              <Twitter />
              <Text ml={4}>
                <Link href="https://twitter.com/rigelprotocol" isExternal>
                  Twitter
                </Link>
              </Text>
            </Flex>

            <Flex
              _hover={{ background: '#29235E' }}
              _focus={{ outline: 0, background: '#29235E' }}
              cursor="pointer"
              fontSize="14px"
              rounded="xl"
              h="60px"
              p="0px 10px"
              alignItems="center"
              mb={2}
              cursor="pointer"
              alignItems="center"
              mb={2}
              cursor="pointer"
            >
              <LinkedIn />
              <Text ml={4}>
                <Link href="https://www.linkedin.com/company/rigelprotocol/about/" isExternal>
                  LinkedIn
                </Link>
              </Text>
            </Flex>
            <Flex
              _hover={{ background: '#29235E' }}
              _focus={{ outline: 0, background: '#29235E' }}
              cursor="pointer"
              fontSize="14px"
              rounded="xl"
              h="60px"
              p="0px 10px"
              alignItems="center"
              mb={2}
              cursor="pointer"
              alignItems="center"
              mb={2}
              cursor="pointer"
            >
              <Github />
              <Text ml={4}>
                <Link href="https://github.com/rigelprotocol" isExternal>
                  Github
                </Link>
              </Text>
            </Flex>
            <Flex
              _hover={{ background: '#29235E' }}
              _focus={{ outline: 0, background: '#29235E' }}
              cursor="pointer"
              fontSize="14px"
              rounded="xl"
              h="60px"
              p="0px 10px"
              alignItems="center"
              mb={2}
              cursor="pointer"
              alignItems="center"
              mb={2}
              cursor="pointer"
            >
              <Medium />
              <Text ml={4}>
                <Link href="https://medium.com/rigelprotocol" isExternal>
                  Medium
                </Link>
              </Text>
            </Flex>
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};

export default Nav;
