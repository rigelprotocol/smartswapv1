import React from 'react';
import { Link } from 'react-router-dom';
import { MenuButton, Button, Menu, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ROUTES } from '../../utils/constants';
import styles from '../../styles/navbar.css';
const TradeButton = () => {
  return (
    <Menu mr={4} isLazy>
      <MenuButton
        as={Button}
        className={styles.trade__button}
        transition="all 0.2s"
        colorScheme="#29235E"
        cursor="pointer"
        bg="#29235e"
        fontSize="16px"
        paddingRight="10px"
        _hover={{ background: '#29235E' }}
        _expanded={{ bg: '#29235E' }}
        _focus={{ outline: 0, background: '#29235E' }}
        rightIcon={<ChevronDownIcon />}
      >
        Trade
      </MenuButton>
      <MenuList
        className={styles.trade__button__list}
        color="white"
        bg="#120136"
        rounded="2xl"
        border=" 1px solid rgba(255, 255, 255,0.15) "
      >
        <MenuItem
          _hover={{ background: '#29235E' }}
          _focus={{ outline: 0, background: '#29235E' }}
          cursor="pointer"
          fontSize="14px"
          rounded="xl"
          h="40px"
          className={styles.trade__button__item}
        >
          <Link to={ROUTES.SMART_SWAPPING}> Smart Swapping </Link>
        </MenuItem>
        <MenuItem
          _hover={{ background: '#29235E' }}
          _focus={{ outline: 0, background: '#29235E' }}
          cursor="pointer"
          fontSize="14px"
          rounded="xl"
          h="40px"
          className={styles.trade__button__item}
        >
          <Link to={ROUTES.LIQUIDITY}> Liquidity </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TradeButton;
