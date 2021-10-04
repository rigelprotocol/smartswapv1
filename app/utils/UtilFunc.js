import Web3 from 'web3';
import tokenDetails from './default-token-details.json';
import { networkURLS } from './constants';

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
export const getSelectedTokenDetails = symbol =>
  tokenDetails.length > 0 &&
  symbol !== null &&
  tokenDetails.filter(
    fields => fields.symbol.toUpperCase() === symbol.toUpperCase(),
  )[0];

export function mergeArrays(arrays) {
  let jointArray = [];
  arrays.forEach(array => {
    jointArray = [...jointArray, ...array];
  });
  let updatedArray = jointArray.filter(
    (thing, index, self) =>
      index === self.findIndex(t => t.symbol === thing.symbol),
  );
  updatedArray = updatedArray.map((token, id) => {
    const balance = null;
    const available = true;
    const imported = !!token.imported;
    return { ...token, id, balance, available, imported };
  });
  return updatedArray.filter(token => token.symbol !== 'SELECT A TOKEN');
}

export const getOutPutDataFromEvent = async (tokenAddress, eventsArray) => {
  const duplicateArray = [];
  eventsArray.map(event => {
    if (event.address.toLowerCase() == tokenAddress.toLowerCase()) {
      duplicateArray.push(event);
    }
  });

  if (duplicateArray.length != 0) {
    const convertedInput = (
      parseInt(duplicateArray[0].data, 16) /
      10 ** 18
    ).toFixed(7);
    return convertedInput;
  }
};

export const getInPutDataFromEvent = (
  tokenAddress,
  eventsArray,
  fromAmount,
) => {
  const duplicateArray = [];
  eventsArray.map(event => {
    if (event.address.toLowerCase() == tokenAddress.toLowerCase()) {
      duplicateArray.push(event);
    }
  });

  if (duplicateArray.length != 0) {
    const convertedInput = parseInt(duplicateArray[0].data, 16) / 10 ** 18;

    if (parseFloat(convertedInput) != parseFloat(fromAmount)) {
      return convertedInput.toFixed(7);
    }
    return fromAmount;
  }
};

export const createURLNetwork = (hash, url) =>
  `https://${networkURLS}/${url}/${hash}`;
