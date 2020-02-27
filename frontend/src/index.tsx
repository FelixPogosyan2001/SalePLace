import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/AppContainer';
import { Provider } from 'react-redux';
import { store } from './redux/reducers/index';
import './index.css';
(window as any).store=store
ReactDOM.render(<Provider store={store}>
                    <AppContainer />
                </Provider>, document.getElementById('root'));
