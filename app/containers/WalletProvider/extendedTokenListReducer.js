import produce from 'immer';
import {
  GET_ALL_TOKEN,
  SET_USER_TOKEN,
  DELETE_USER_TOKEN,
  ADD_NEW_TOKEN_LIST,
  UPDATE_TOKEN_LIST,
  TOGGLE_LIST_SHOW,
} from './constants';

export const initialState = {
  toggleDisplay: true,
  tokenList: [],
  allTokenList: [],
  userTokenList: [],
};
let userToken;
let filterList;
const ExtendedTokenList = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_ALL_TOKEN:
        draft.tokenList = action.payload;
        break;
      case UPDATE_TOKEN_LIST:
        draft.tokenList = action.payload;
        break;
      case SET_USER_TOKEN:
        userToken = draft.userTokenList.filter(
          token => token.address !== action.payload.address,
        );
        userToken.push(action.payload);
        draft.userTokenList = userToken;
        !draft.tokenList.includes(action.payload)
          ? draft.tokenList.push(action.payload)
          : null;
        break;
      case DELETE_USER_TOKEN:
        userToken = draft.userTokenList.filter(
          token => token.address !== action.payload,
        );
        draft.userTokenList = userToken;
        filterList = draft.tokenList.filter(
          token => token.address !== action.payload,
        );
        draft.tokenList = filterList;
        break;
      case ADD_NEW_TOKEN_LIST:
        filterList = draft.allTokenList.filter(
          data => data.name !== action.payload.name,
        );
        filterList.push(action.payload);
        draft.allTokenList = filterList;
        break;
      case TOGGLE_LIST_SHOW:
        draft.toggleDisplay = action.payload;
        break;
      default:
        return state;
    }
  });

export default ExtendedTokenList;
