import productsAPI from '../../api/products';
import {toggleLoader} from './commonActions';
import { DELETE_PRODUCT_FROM_CART } from './cart';

export const FILL_FAVORITES = 'FILL_FAVORITES';
export const TOGGLE_LOADER_FAVORITES = 'LOADER_FAVORITES';
export const DELETE_FAVPRODUCT_FROM_FAVORITES = 'DELETE_FAVPRODUCT_FROM_FAVORITES';

//action creator
const fillVoid = (data) => ({type : FILL_FAVORITES,payload : data});
const deleting = (id) => ({type : DELETE_FAVPRODUCT_FROM_FAVORITES,payload : id});

//thunk creator 
export const myFavorites = () => async (dispatch) => {
    dispatch(toggleLoader(true,TOGGLE_LOADER_FAVORITES));
    const likedProducts = await productsAPI.myLikes();
    dispatch(toggleLoader(false,TOGGLE_LOADER_FAVORITES));
    dispatch(fillVoid(likedProducts));
}

export const deleteFavProduct = (id) => async (dispatch) => {
    dispatch(toggleLoader(true,TOGGLE_LOADER_FAVORITES));
    await productsAPI.deleteLike(id);
    dispatch(deleting(id));
    dispatch(toggleLoader(false,TOGGLE_LOADER_FAVORITES));
}