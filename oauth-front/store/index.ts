import {applyMiddleware, createStore} from 'redux'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return reducers(state, action);
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
}

export const wrapper = createWrapper(initStore);