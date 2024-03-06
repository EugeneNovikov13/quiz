import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkDispatch, ThunkMiddleware } from 'redux-thunk';
import { appReducer, questionReducer, testReducer } from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TestAction } from '../types';

const reducer = combineReducers({
	app: appReducer,
	question: questionReducer,
	test: testReducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

type AllAppAction = TestAction;
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
