// @ts-nocheck
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import styles from '../../styles/navbar.css';
import ConnectWallet from './ConnectWallet';
import Wallet from './Wallet';
import SocialMedia from './SocialMedia';
import Trade from './Trade';
import { WalletContext } from '../../context';
import Logo from '../../assets/logo.svg';
import MobileLogo from '../../assets/mobile-logo.svg';
const Nav = props => {
  return (
    <WalletContext.Consumer>
      {({ connected }) => (
        <div className={styles.navbar}>
          <div className={styles.logo__container}>
            <>
              <Link to="/">
                <Logo className={styles.logo} />
                <MobileLogo className={styles.mobile__logo} />
              </Link>
            </>
          </div>
          <div className={styles.links__container}>
            <Trade />
            <Text
              cursor="pointer"
              // @ts-ignore
              color={
                window.location.pathname === '/farming' ? 'blue.300' : 'white'
              }
              _hover={{ color: 'blue.300' }}
              className={styles.nav__text}
            >
              <Link to="/farming">Farming</Link>
            </Text>
            <Text
              cursor="pointer"
              className={styles.nav__text}
              _hover={{ color: 'blue.300' }}
              color={
                // @ts-ignore
                window.location.pathname === '/margin-trading'
                  ? 'blue.300'
                  : 'white'
              }
            >
              <Link to="/margin-trading">Margin Trading</Link>
            </Text>
          </div>
          <div className={styles.wallet__container}>
            {connected ? <Wallet /> : <ConnectWallet />}
            <SocialMedia />
          </div>
        </div>
      )
      }
    </WalletContext.Consumer >
  );
};

export default Nav;
