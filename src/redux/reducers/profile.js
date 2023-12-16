import * as ActionTypes from '../action-type';

const initialState = {
	password: '',
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.PASSWORD:
      return {...state, password: action.payload.password};
    default:
      return state;
  }
}
