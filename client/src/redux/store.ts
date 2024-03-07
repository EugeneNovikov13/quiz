import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { appReducer, questionReducer, testReducer } from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TestAction } from '../types';
import { AppAction } from '../types/app-reducer-types';
import { QuestionAction } from '../types/question-reducer-types';

const reducer = combineReducers({
	app: appReducer,
	question: questionReducer,
	test: testReducer,
});

export type RootState = ReturnType<typeof reducer>;

type AllAppAction = TestAction | AppAction | QuestionAction;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AllAppAction>;

export const store = createStore(
	reducer,
	{},
	composeWithDevTools(
		applyMiddleware<AppThunkDispatch, any>(
			thunk as ThunkMiddleware<RootState, AllAppAction, any>,
		),
	),
);
