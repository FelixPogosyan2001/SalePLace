import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import products from './products';
import cart from './cart';
import favorites from './favorites';
import dialogs from './dialogs';

export const reducer = combineReducers({
    auth,
    profile,
    dialogs,
    products,
    cart,
    favorites
})