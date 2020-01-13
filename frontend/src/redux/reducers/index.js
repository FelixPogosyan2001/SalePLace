import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import products from './products';
import cart from './cart';
import favorites from './favorites';
import dialogs from './dialogs';
import recommendations from './recommendations'

export const reducer = combineReducers({
    auth,
    profile,
    dialogs,
    products,
    cart,
    favorites,
    recommendations
})