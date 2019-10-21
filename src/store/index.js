import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import actionStringMiddleware from './middlewares/actionStringMiddleware';
import socketMiddleware from './middlewares/socketMiddleware';
const middlewares = [thunk, actionStringMiddleware, socketMiddleware];

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

export default store;
