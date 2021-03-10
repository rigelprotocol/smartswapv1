// list all token input

export default async function tokenInput() {
   //will be moved to swap page
   const amountIn = ethers.utils.formatEther('1000').toString();
   const amountOut = ethers.utils.formatEther('1000').toString();
   const amountInMax = ethers.utils.formatEther('1000').toString();
   const amountOutMin = ethers.utils.formatEther('2000').toString();
   const path = ['0x80278a0cf536e568a76425b67fb3931dca21535c','0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4'];
   const addressTo = "0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E";
   const deadline = ethers.utils.formatUnits('1615333247').toString();

   // will be moved to liquidity page
   const token = "";
   const tokenA = "0x80278a0cf536e568a76425b67fb3931dca21535c";
   const tokenB = "0xD848eD7f625165D7fFa9e3B3b0661d6074902FD4";
   const amountofTokenDesired = ethers.utils.formatEther('1000').toString();
   const amountTokenMin = ethers.utils.formatEther('1000').toString();
   const amountETHmin = ethers.utils.formatEther('1000').toString();
   const amountADesired = ethers.utils.formatEther('1000').toString();
   const amountBDesired = ethers.utils.formatEther('1000').toString();
   const amountAMin = ethers.utils.formatEther('1000').toString();
   const amountBMin = ethers.utils.formatEther('1000').toString();
   const liquidity = ethers.utils.formatEther('1000').toString();
   const addTo = "0x2289Bc372bc6a46DD3eBC070FC5B7b7A49597A4E";
   const dline = ethers.utils.formatUnits('1615333247').toString();
}