import styles from '../../styles/footer.module.css';
import ConnectWallet from './ConnectWallet';
import Wallet from './Wallet';
import SocialMedia from './SocialMedia';
import { WalletContext } from '../../context';

const Footer = () => {
	return (
		<WalletContext.Consumer>
			{({ connected }) => (
				<div className={styles.footer}>
					{connected ? <Wallet /> : <ConnectWallet />}
					<SocialMedia />
				</div>
			)}
		</WalletContext.Consumer>
	);
};

export default Footer;
