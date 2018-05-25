import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/';

const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = tool;

const configureStore = () => createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);
export default configureStore;
