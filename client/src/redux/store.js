import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, historyReducer, testReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	history: historyReducer,
	test: testReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
