import produce from 'immer';
import { GET_ALL_TOKEN, SET_USER_TOKEN } from './constants';

export const initialState = {
  tokenList: [],
  userTokenList: [],
};

const ExtendedTokenList = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ALL_TOKEN:
        draft.tokenList = action.payload;
        break;
      case SET_USER_TOKEN:
        draft.userTokenList
          .filter(token => token.address !== action.payload.address)
          .push(action.payload);
        break;
      default:
        return state;
    }
  });

export default ExtendedTokenList;
