// state value for smartSwap
const [amountIn, setAmountIn] = useState('2');

useEffect(() => {
    const getBalance = async () => {
        if (wallet.signer !== 'signer') {
            const bnb = await BUSDToken();
            setRGPBalance(wallet_props[0] ? wallet_props[0].rgp : '0.0');
            setETHBalance(wallet ? wallet.balance : '0.0');
            setBUSDBalance(
                ethers.utils
                    .formatEther(await bnb.balanceOf(wallet.address))
                    .toString(),
            );
        }
    };
    getBalance();
}, [wallet]);

// onclick of Approve should be set to (approval) for busd
useEffect(() => {
    const busdApproval = async () => {
        if (wallet.signer !== 'signer') {
            const bnb = await BUSDToken();
            const walletBal = ethers.utils
                .parseUnits(await bnb.balanceOf(wallet.address))
                .toString();
            await bnb.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
                from: wallet.address,
            });
        }
    };
    busdApproval();
}, [wallet]);

// onclick of Approve should be set to (approval) for rgp
useEffect(() => {
    const rgpApproval = async () => {
        if (wallet.signer !== 'signer') {
            const rgp = await rigelToken();
            const walletBal = ethers.utils
                .parseUnits(await rgp.balanceOf(wallet.address))
                .toString();
            await rgp.approve(SMART_SWAP.SMART_SWAPPING, walletBal, {
                from: wallet.address,
            });
        }
    };
    rgpApproval();
}, [wallet]);

useEffect(() => {
    const getOutPutPrice = async () => {
        if (wallet.signer !== 'signer') {
            const rout = await router();
            setAmountIn(amountIn);
            const passOutPut = ethers.utils.parseUnits("100").toString();
            const rgp = ethers.utils.getAddress(TOKENS_CONTRACT.RGP);
            const bnb = ethers.utils.getAddress(TOKENS_CONTRACT.BNB);
            const outPut = await rout.getAmountsOut(passOutPut, [rgp, bnb])
            console.log('AmountOut', outPut)
        }
    };
    getOutPutPrice();
}, [wallet]);

// onclick of Enter an Amount should be set to (swapTokenForTokens)
useEffect(() => {
    const swapTokenForTokens = async () => {
        if (wallet.signer !== 'signer') {
            const rout = await router();
            setAmountIn(amountIn);
            const deadL = Math.floor(new Date().getTime() / 1000.0 + 300);
            const rgp = ethers.utils.getAddress(TOKENS_CONTRACT.RGP);
            const bnb = ethers.utils.getAddress(TOKENS_CONTRACT.BNB);
            const passOutPut = amountIn;
            await rout.swapExactTokensForTokens(
                amountIn,
                passOutPut,
                [bnb, rgp],
                wallet.address,
                deadL,
                {
                    from: wallet.address,
                    gasLimit: 150000,
                    gasPrice: ethers.utils.parseUnits('20', 'gwei'),
                },
            );
            console.log('Router', deadL);
        }
    };
    swapTokenForTokens();
}, [wallet]);
