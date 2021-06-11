export const isFunc = functionToCheck =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

export const formatBalance = balance => {
  if (
    parseFloat(balance) > 0 &&
    Number(balance) === balance &&
    balance % 1 !== 0
  ) {
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
    console.log(time);
    return time;
  }
  const time = Math.floor(new Date().getTime() / 1000.0 + val * 60);
  return time;
};
