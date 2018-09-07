import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = tool;

/**
 * @returns {Function} createStore
 * @param {Function} thunk - lets the action creators invert control by
 *  dispatching functions.
 */
const configureStore = () => createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
export default configureStore;
