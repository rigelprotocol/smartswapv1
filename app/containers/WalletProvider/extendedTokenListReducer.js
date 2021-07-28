import produce from 'immer';
import {
  GET_ALL_TOKEN,
  SET_USER_TOKEN,
  DELETE_USER_TOKEN,
  ADD_NEW_TOKEN_LIST,
} from './constants';

export const initialState = {
  tokenList: [],
  userTokenList: [],
  allTokenList: [],
};
let userToken, filterList;
const ExtendedTokenList = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ALL_TOKEN:
        draft.tokenList = action.payload;
        break;
      case SET_USER_TOKEN:
        userToken = draft.userTokenList.filter(
          token => token.address !== action.payload.address,
        );
        userToken.push(action.payload);
        draft.userTokenList = userToken;
        break;
      case DELETE_USER_TOKEN:
        userToken = draft.userTokenList.filter(
          token => token.address !== action.payload,
        );
        draft.userTokenList = userToken;
        break;
      case ADD_NEW_TOKEN_LIST:
        filterList = draft.allTokenList.filter(
          data => data.name !== action.payload.name,
        );
        filterList.push(action.payload);
        draft.allTokenList = filterList;
        break;
      default:
        return state;
    }
  });

export default ExtendedTokenList;
