import { createStore } from 'redux';
import profileReducer from '../reducers/profile';

export default function configureStore(initialState) {
	const store = createStore(profileReducer, initialState);

	return store;
}
