import { ethers } from 'ethers';
import SwapConnect from './SwapConnect';

export default async function smartSwap() {
  // useEffect(() => {
  const contractBal = async () => {
    const {
      BUSD_CONTRACT,
      RigelToken_Contract,
      WETH9_Contract,
      SmartSwapRouter02_Contract,
      SmartSwapFactoryForSwap_Contract,
      SmartSwapFactory_Contract,
    } = await SwapConnect();
    if (signer && address) {
      setTokenaBalance(tokenBalance);
      // get rigel Balances of Account
      const rigelBal = await RigelToken_Contract.balanceOf(address.toString());
      const rigelBalance = ethers.utils.formatEther(rigelBal).toString();
      setTokenaBalance(rigelBalance);

      // get WETH9 Balances of Account
      // setWeth9(weth9);
      const WETH9Bal = await WETH9_Contract.balanceOf(address.toString());
      const WETHbalance = ethers.utils.formatEther(WETH9Bal).toString();
      // setWeth9(WETHbalance);

      // get BUSD Balances of Account
      // setbusd(busd);
      const BUSDBal = await BUSD_CONTRACT.balanceOf(address.toString());
      const BUSDbalance = ethers.utils.formatEther(BUSDBal).toString();
      // setbusd(BUSDbalance);
    }
  };
  // }
  // search by address
  const lcokUpAddress = async () => {
    // Will require storing the name in a state value, then user call from state
    // Also require to map all the token addresses
    // this accept users input of an address,

    // let web3 = await getWeb3();
    // accounts = await web3.eth.getAccounts();
    const ENSName = provider.lookupAddress('0x0');
    const addressENS = provider.resolver.address;
  };

  // search by ens Name
  const lcokUpName = async () => {
    // Will require storing the name in a state value, then user call from state
    // Also require to map all the token addresses
    // this accept users input of an address,

    // let web3 = await getWeb3(),
    // accounts = await web3.eth.getAccounts();
    const ENSName = provider.resolveName();
    const nameENS = provider.resolver.name;
  };

  // to swapExactTokensForTokens Func.
  const sExactTokensforTokens = async e => {
    const { SmartSwapRouter02_Contract } = await SwapConnect();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const amountIN = ethers.utils.formatEther().toString();
    const getAmountOut = ethers.utils.formatEther().toString();
    // const dLine = ethers.utils.formatEther().toString();

    const swapTforT = SmartSwapRouter02_Contract.swapExactTokensForTokens(
      amountIN,
      getAmountOut,
      '0x0',
      0,
      { from: accounts[0] },
    );
  };

  // The swapTokensForExactTokens func...
  const swapTForExactT = async e => {
    const { SmartSwapRouter02_Contract } = await SwapConnect();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const amountO = ethers.utils.formatEther().toString();
    const getAmountinM = ethers.utils.formatEther().toString();
    // const dLine = ethers.utils.formatEther().toString();

    const _swap = SmartSwapRouter02_Contract.swapTokensForExactTokens(
      amountO,
      getAmountinM,
      '0x0',
      '0x0',
      0,
      { from: accounts[0] },
    );
  };

  // The swapExactETHForTokens func...
  const swapEForTokens = async e => {
    const { SmartSwapRouter02_Contract } = await SwapConnect();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const amountOMin = ethers.utils.formatEther().toString();
    // const getAmountinM = ethers.utils.formatEther().toString();
    // const dLine = ethers.utils.formatEther().toString();

    const _swap = SmartSwapRouter02_Contract.swapExactETHForTokens(
      amountOMin,
      '0x0',
      '0x0',
      0,
      { from: accounts[0] },
    );
  };

  // The swapTokensForExactETH func...
  const swapTForExactEth = async e => {
    const { SmartSwapRouter02_Contract } = await SwapConnect();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const amountO = ethers.utils.formatEther().toString();
    const getAmountinM = ethers.utils.formatEther().toString();
    // const dLine = ethers.utils.formatEther().toString();

    const _swap = SmartSwapRouter02_Contract.swapTokensForExactETH(
      amountO,
      getAmountinM,
      '0x0',
      '0x0',
      0,
      { from: accounts[0] },
    );
  };

  const swapExactTForEth = async e => {
    const { SmartSwapRouter02_Contract } = await SwapConnect();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const amountI = ethers.utils.formatEther().toString();
    const getAmountOutM = ethers.utils.formatEther().toString();
    // const dLine = ethers.utils.formatEther().toString();

    const _swap = SmartSwapRouter02_Contract.swapExactTokensForETH(
      amountI,
      getAmountOutM,
      '0x0',
      '0x0',
      0,
      { from: accounts[0] },
    );
  };

  const swapEthforTok = async e => {
    const { SmartSwapRouter02_Contract } = await SwapConnect();
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();

    const amountOUT = ethers.utils.formatEther().toString();
    // const dLine = ethers.utils.formatEther().toString();

    const _swap = SmartSwapRouter02_Contract.swapETHForExactTokens(
      amountOUT,
      '0x0',
      '0x0',
      0,
      { from: accounts[0] },
    );
  };
}
