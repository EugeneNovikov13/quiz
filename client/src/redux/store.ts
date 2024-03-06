import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer, questionReducer, testReducer } from './reducers';
import { useDispatch } from 'react-redux';

const reducer = combineReducers({
	app: appReducer,
	question: questionReducer,
	test: testReducer,
});

export const store = createStore(
	reducer,
	{},
	composeWithDevTools(applyMiddleware(thunk)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
