import {combineReducers} from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware,{ThunkMiddleware} from 'redux-thunk';
import {AppActions} from '../../additional/actions';
import auth from './auth';
import profile from './profile';
import products from './products';
import cart from './cart';
import favorites from './favorites';
import dialogs from './dialogs';
import recommendations from './recommendations';

export const reducer = combineReducers({
    auth,
    profile,
    dialogs,
    products,
    cart,
    favorites,
    recommendations
});

export type AppState = ReturnType<typeof reducer>

export const store = createStore(reducer, applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppActions>));
