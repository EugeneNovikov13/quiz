import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, questionReducer, testReducer, userReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	question: questionReducer,
	test: testReducer,
	user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
