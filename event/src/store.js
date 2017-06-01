import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
  compose
} from 'redux';
import rootReducer from './reducers';

export default function configureStore() {
  let middleware = [
    thunk
  ];

  let enhancers = [
    applyMiddleware(...middleware)
  ];

  return createStore(
    rootReducer,
    compose(...enhancers)
  );
};
