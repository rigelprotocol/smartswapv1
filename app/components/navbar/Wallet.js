import { Flex } from '@chakra-ui/layout';
import Account from './Account';
import RGP from './RGP';

const Wallet = () => {
	return (
		<Flex alignItems='center'>
			<RGP />
			<Account />
		</Flex>
	);
};

export default Wallet;
