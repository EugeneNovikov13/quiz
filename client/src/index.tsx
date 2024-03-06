import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Quiz } from './quiz';
import './index.css';

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<Quiz />
		</Provider>
	</BrowserRouter>,
);
