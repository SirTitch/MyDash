import * as ActionTypes from '../action-type';

const initialState = {
	userLoggedIn: false,
  userProfile: undefined,
  topSellers: [],
  outOfStock: [],
  allItems: [],

}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.USERLOGGEDIN:
      return {...state, userLoggedIn: action.payload.userLoggedIn};
    case ActionTypes.USERPROFILE:
      return {...state, userProfile: action.payload.userProfile};
    case ActionTypes.TOPSELLERS:
      return {...state, topSellers: action.payload.topSellers};
    case ActionTypes.OUTOFSTOCK:
      return {...state, outOfStock: action.payload.outOfStock};
    case ActionTypes.ALLITEMS:
      return {...state, allItems: action.payload.allItems};
    default:
      return state;
  }
}
