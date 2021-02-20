import { Text } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/navbar.module.css';
import ConnectWallet from './ConnectWallet';
import Wallet from './Wallet';
import SocialMedia from './SocialMedia';
import Trade from './Trade';
import { WalletContext } from '../../context';
import Logo from '../../assets/logo.svg';
import MobileLogo from '../../assets/mobile-logo.svg';

const Nav = () => {
  const router = useRouter();

  return (
    <WalletContext.Consumer>
      {({ connected }) => (
        <div className={styles.navbar}>
          <Link href="/">
            <div className={styles.logo__container}>
              <>
                <Logo className={styles.logo} />
                <MobileLogo className={styles.mobile__logo} />
              </>
            </div>
          </Link>
          <div className={styles.links__container}>
            <Trade />
            <Link href="/farming">
              <Text
                cursor="pointer"
                color={router.pathname === '/farming' ? 'blue.300' : 'white'}
                _hover={{ color: 'blue.300' }}
                className={styles.nav__text}
              >
                Farming
              </Text>
            </Link>
            <Link href="/margin-trading">
              <Text
                cursor="pointer"
                className={styles.nav__text}
                _hover={{ color: 'blue.300' }}
                color={
                  router.pathname === '/margin-trading' ? 'blue.300' : 'white'
                }
              >
                Margin Trading
              </Text>
            </Link>
          </div>
          <div className={styles.wallet__container}>
            {connected ? <Wallet /> : <ConnectWallet />}
            <SocialMedia />
          </div>
        </div>
      )}
    </WalletContext.Consumer>
  );
};

export default Nav;
