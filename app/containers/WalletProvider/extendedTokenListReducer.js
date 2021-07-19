import produce from 'immer';
import { GET_ALL_TOKEN } from './constants';

export const initialState = {
  tokenList: [],
};

const ExtendedTokenList = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ALL_TOKEN:
        draft.tokenList = action.payload;
        break;
      default:
        return state;
    }
  });

export default ExtendedTokenList;
