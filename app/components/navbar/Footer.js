import React from 'react';
import { connect } from 'react-redux';
import ConnectWallet from './ConnectWallet';
import Wallet from './Wallet';
import SocialMedia from './SocialMedia';
import styles from '../../styles/footer.css';

const Footer = props => {
  const { connected } = props.state.wallet;
  return (
    <div className={styles.footer}>
      {connected ? <Wallet /> : <ConnectWallet />}
      <SocialMedia />
    </div>
  );
};
const mapStateToProps = state => ({ state });
export default connect(
  mapStateToProps,
  null,
)(Footer);
