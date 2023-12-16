import React from 'react';
import { Root } from './src/root';
import {Provider} from 'react-redux';
import configureStore from './src/redux/store/configure-store';

import profile from './src/redux/reducers/profile.js';

let ampInstance = null;

const AppWrapper = () => {
  const store = configureStore({
    reducer: {
      user: profile,
    },
  });

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};



export default AppWrapper;
