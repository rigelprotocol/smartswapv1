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
