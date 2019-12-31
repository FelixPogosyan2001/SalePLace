import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {reducer} from './redux/reducers/index';
import './index.css';
import AppContainer from './components/AppContainer';


const store = createStore(reducer,applyMiddleware(thunkMiddleware));
window.store = store;
ReactDOM.render(<Provider store={store}>
                    <AppContainer />
                </Provider>, document.getElementById('root'));
