// @ts-nocheck
import React from 'react';
import { Text } from '@chakra-ui/layout';
import { Box, Flex, Button, Tooltip } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../../styles/navbar.css';
import ConnectWallet from './ConnectWallet';
import Wallet from './Wallet';
import SocialMedia from './SocialMedia';
import Trade from './Trade';
import Logo from '../../assets/logo.svg';
import MobileLogo from '../../assets/mobile-logo.svg';
const Nav = props => {
  const { connected } = props;
  return (
    <div className={styles.navbar}>
      <div className={styles.logo__container}>
        <div>
          <Link to="/">
            <Logo className={styles.logo} />
            <MobileLogo className={styles.mobile__logo} />
          </Link>
        </div>
      </div>
      <div className={styles.links__container}>
        <Trade />
        <Text
          cursor="pointer"
          // @ts-ignore
          color={window.location.pathname === '/farming' ? 'blue.300' : 'white'}
          _hover={{ color: 'blue.300' }}
          className={styles.nav__text}
        >
          <Link to="/farming">Farming</Link>
        </Text>
        <Tooltip label="Coming Soon" bg="#120136" aria-label="A tooltip">

          <Text
            cursor="not-allowed"
            className={styles.nav__text}
            _hover={{ color: 'blue.300' }}
            color={
              // @ts-ignore
              window.location.pathname === '/margin-trading'
                ? 'blue.300'
                : 'white'
            }
          >

            <Link
              // to="/margin-trading"
              cursor="not-allowed"
            >

              Margin Trading

            </Link>
          </Text>
        </Tooltip>

      </div>
      <div className={styles.wallet__container}>
        {connected ? <Wallet /> : <ConnectWallet />}
        <SocialMedia />
      </div>
    </div>
  );
};

const mapStateToProps = ({ wallet }) => {
  const { connected } = wallet;
  return {
    connected,
  };
};
export default connect(
  mapStateToProps,
  {},
)(Nav);
