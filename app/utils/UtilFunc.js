import { ethers,BigNumber } from 'ethers';
import BN from 'bignumber.js'
export const isFunc = functionToCheck =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

export const formatBalance = balance =>
  parseFloat(balance)
    .toFixed(4)
    .toString();

export const isNotEmpty = objectToCheck =>
  objectToCheck &&
  Object.keys(objectToCheck).length === 0 &&
  objectToCheck.constructor === Object;
  

export const changeTransactionDeadline = (val) => {
  if (val === '' || val < 0) {
    let time = Math.floor(new Date().getTime() / 1000.0 + 1200)
    console.log(time)
    return time
  } else {
    let time = Math.floor(new Date().getTime() / 1000.0 + (val * 60))
    return time
  }
}
export const calculateSlippage = (amountIn,slippageValue) => {
  let calculatedVal
  
  let BNAmountIn = new BN(amountIn || 0)
  console.log(BNAmountIn.toString())
  let val = BNAmountIn.times(slippageValue).div('100')
console.log(val.toString())

  if (slippageValue === "1") {
calculatedVal = BNAmountIn.plus(val)
console.log(calculatedVal,amountIn)
  } else if (slippageValue === "0.1") {
    calculatedVal = BNAmountIn.minus(val.toString())
  } else if (slippageValue === "0.5") {
    calculatedVal = new BN(amountIn)
    console.log(calculatedVal,amountIn)
  }
  console.log({calculatedVal:calculatedVal.toString(),BNAmountIn:BNAmountIn.toString(),amountIn,calculedVal:calculatedVal.toNumber()})
   return calculatedVal.toString()
}
export const clearInputInfo = (setInput,setButton = false,value) =>{
setInput('')
if(setButton){
  setButton(value)
}
}