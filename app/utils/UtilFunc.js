import { ethers, BigNumber } from 'ethers';
import BN from 'bignumber.js'
export const isFunc = functionToCheck =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

export const formatBalance = balance => {
  if (balance.toString().includes('.')) {
    return `${balance.toString().split('.')[0]}.${balance
      .toString()
      .split('.')[1]
      .substr(0, 4)}`;
  }
  return parseFloat(balance)
    .toFixed(4)
    .toString();
};

export const isNotEmpty = objectToCheck =>
  objectToCheck &&
  Object.keys(objectToCheck).length === 0 &&
  objectToCheck.constructor === Object;

export const changeTransactionDeadline = val => {
  if (val === '' || val < 0) {
    const time = Math.floor(new Date().getTime() / 1000.0 + 1200);
    return time;
  }
}

export const getDeadline = (deadlineInMinutes = 20) => {
  return Math.floor((new Date()).getTime() + (Number(deadlineInMinutes) * 60))
}
// export const calculateSlippage = (amountIn,slippageValue) => {
//   let calculatedVal

//   let BNAmountIn = new BN(amountIn || 0)
//   let val = BNAmountIn.times(slippageValue).div('100')

//   if (slippageValue === "1") {
// calculatedVal = BNAmountIn.plus(val)
// console.log(calculatedVal,amountIn)
//   } else if (slippageValue === "0.1") {
//     calculatedVal = BNAmountIn.minus(val.toString())
//   } else if (slippageValue === "0.5") {
//     calculatedVal = new BN(amountIn)
//   }
//    return calculatedVal.toString()
// }
export const clearInputInfo = (setInput, setButton = false, value) => {
  setInput('')
  if (setButton) {
    setButton(value)
  }
}
