/*
 *
 * FarmingPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
  contents: [
    {
      id: '1',
      img: 'rgp.svg',
      deposit: 'RGP-BUSD',
      earn: 'RGP',
      APY: '300.60%',
      totalLiquidity: '$1,365,320',
      tokensStaked: ['RGP-BNB', '0.0000'],
      RGPEarned: '0.0000',
      availableToken: '3.747948393',
    },
    {
      id: '2',
      img: 'rgp.svg',
      deposit: 'RGP-BNB',
      earn: 'BNB',
      APY: '330.60%',
      totalLiquidity: '$1,365,320',
      tokensStaked: ['RGP-BUSD', '0.0000'],
      RGPEarned: '3.0000',
      availableToken: '3.747948393',
    },
    {
      id: '3',
      img: 'rgp.svg',
      deposit: 'BNB-BUSD',
      earn: 'BUSD',
      APY: '30.60%',
      totalLiquidity: '$136,530',
      tokensStaked: ['BUSD-BNB', '7.0000'],
      RGPEarned: '0.0000',
      availableToken: '3.747948393',
    },
  ],
  loggedIn: false
};

/* eslint-disable default-case, no-param-reassign */
const farmingPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default farmingPageReducer;
