import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, historyReducer, testReducer } from './reducers';
import { questionReducer } from './reducers/question-reducer';

const reducer = combineReducers({
	app: appReducer,
	history: historyReducer,
	question: questionReducer,
	test: testReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
