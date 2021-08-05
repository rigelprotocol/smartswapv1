import Web3 from 'web3';
import tokenDetails from './default-token-details.json';

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

export const convertFromWei = (balance, decimals) => {
  const decimalValue = decimals || 18;
  const { unitMap } = Web3.utils;
  const unit = Object.keys(unitMap).find(
    unit => unitMap[unit] === Math.pow(10, decimalValue).toString(),
  );
  return Web3.utils.fromWei(balance.toString(), unit);
};
export const convertToWei = (balance, decimals) => {
  const decimalValue = decimals || 18;
  const { unitMap } = Web3.utils;
  const unit = Object.keys(unitMap).find(
    unit => unitMap[unit] === Math.pow(10, decimalValue).toString(),
  );
  return Web3.utils.toWei(balance.toString(), unit);
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
};

export const getDeadline = (deadlineInMinutes = 20) =>
  Math.floor(new Date().getTime() + Number(deadlineInMinutes) * 60);

export const clearInputInfo = (setInput, setButton = false, value) => {
  setInput('');
  if (setButton) {
    setButton(value);
  }
};

export const isValidJson = jsonObject => {
  jsonObject =
    typeof jsonObject !== 'string' ? JSON.stringify(jsonObject) : jsonObject;
  try {
    jsonObject = JSON.parse(jsonObject);
  } catch (e) {
    return false;
  }

  if (typeof jsonObject === 'object' && jsonObject !== null) {
    return (
      objectHasProperty(jsonObject, 'name') &&
      objectHasProperty(jsonObject, 'tokens') &&
      objectHasProperty(jsonObject, 'logoURI')
    );
  }

  return false;
};

export const objectHasProperty = (object, props) =>
  Object.prototype.hasOwnProperty.call(object, props);
console.log(tokenDetails);
export const getSelectedTokenDetails = symbol =>
  tokenDetails.length > 0 &&
  symbol !== null &&
  tokenDetails.filter(
    fields => fields.symbol.toUpperCase() === symbol.toUpperCase(),
  )[0];
