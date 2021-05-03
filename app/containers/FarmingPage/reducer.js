/*
 *
 * FarmingPage reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  SEND_ACTION,
  CHANGE_FARMING_CONTENT,
} from './constants';
import liquidityProviderTokensContract from '../../utils/abis/lPContractABI.json';

const LPmultiplyier = async () => {
  const liquidityProviderDetails = await liquidityProviderTokensContract();
  const getMultiplier = await liquidityProviderDetails.BONUS_MULTIPLIER();
  const getTotalAlloc = await liquidityProviderDetails.totalAllocPoint();
  const getrigelPerBlock = await liquidityProviderDetails.rigelPerBlock();
  const getStartBlock = await liquidityProviderDetails.startBlock();
  console.log(
    'multiplier',
    getMultiplier.toString(),
    'total Allocation',
    getTotalAlloc.toString(),
    'rigel token perBlock',
    getrigelPerBlock.toString(),
    'start Block',
    getStartBlock.toString(),
    '...................',
  );
};

const current_price = 1;
const Inflation_Per_Day = 3333.34;
const Total_Volume_per_Pool = 50000;
const daysPerYear = 365;

const APY =
  (current_price * Inflation_Per_Day * daysPerYear * 100) /
  Total_Volume_per_Pool;

const totalLiquidity = '3,200,000';
// const RGPBUSDLiquidity = action.payload.reserves1;

export const initialState = {
  contents: [
    {
      id: '1',
      img: 'rgp.svg',
      // deposit: 'RGP',
      deposit: "ONU-BUSD",
      earn: 'RGP',
      APY,
      totalLiquidity,
      tokensStaked: ['RGP-BNB', '0.0000'],
      RGPEarned: '0.0000',
      availableToken: '3.747948393',
    },
    {
      id: '2',
      img: 'rgp.svg',
      deposit: 'RGP-BNB',
      earn: 'RGP',
      APY,
      totalLiquidity,
      tokensStaked: ['RGP-BUSD', '0.0000'],
      RGPEarned: '3.0000',
      availableToken: '3.747948393',
    },
    {
      id: '3',
      img: 'busd.svg',
      //changed from
      // deposit: 'RGP-BUSD', to
      deposit: "BNB-RGP",
      earn: 'BUSD',
      APY,
      totalLiquidity,
      tokensStaked: ['BUSD-BNB', '7.0000'],
      RGPEarned: '0.0000',
      availableToken: '3.747948393',
    },
    {
      id: '4',
      img: 'busd.svg',
      //changed from
      // deposit: 'BNB-BUSD', to
      deposit: "BNB-BUSD",
      earn: 'BUSD',
      APY,
      totalLiquidity,
      tokensStaked: ['BUSD-BNB', '7.0000'],
      RGPEarned: '0.0000',
      availableToken: '3.747948393',
    },
  ],
  data: {},
};
// const user_Individual_Reward = (individualLiquidity / totalLiquidity) * reward
// Reward = (Multiplier x block diff x reward per block x allocation point ) / Total Allocation Point
// ARY of pool = (Current Price x Inflation Per Day x 365 x 100%) / Total Volume per Pool
// const blockPerDay = 4 * 60 * 24;
// const daysPerYear = 365;
/* eslint-disable default-case, no-param-reassign */

// let data = {
//   getTotalAlloc: getTotalAlloc.toString(),
//   multipler: getMultiplier.toString(),
//   getrigelPerBlock: getrigelPerBlock.toString(),
//   getStartBlock: getStartBlock.toString()
// }
const calculateData = data => {
  const allocationPoint = 20;
  const individualLiquidity = 40;
  const totalLiquidity = 20;
  const reward =
    (data.multipler * data.getrigelPerBlock * allocationPoint) /
    data.getTotalAlloc;
  const blockPerDay = 4 * 60 * 24;
  const daysPerYear = 365;
  const user_Individual_Reward =
    (individualLiquidity / totalLiquidity) * reward;
  return {
    reward,
    blockPerDay,
    daysPerYear,
    user_Individual_Reward,
  };
};
const farmingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_FARMING_CONTENT:
        let id = `${action.payload.symbol0}-${action.payload.symbol1}`
        console.log("ideolo: ", id)
        let current = draft.contents.findIndex(obj => obj.deposit === id)
        console.log("id current: ", current, typeof current)
        if (current >= 0) {
          draft.contents[current].totalLiquidity =
            parseInt(action.payload.reserves1) +
            parseInt(action.payload.reserves0);
        }
        break;
    }
  });

export default farmingPageReducer;
