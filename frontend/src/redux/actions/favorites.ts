import productsAPI from '../../api/products';
import {toggleLoader} from './commonActions';
import {Dispatch} from 'redux';
import {AppActions} from '../../additional/actions';
import {Product} from '../../additional/interfaces';

export const FILL_FAVORITES = 'FILL_FAVORITES';
export const TOGGLE_LOADER_FAVORITES = 'LOADER_FAVORITES';
export const DELETE_FAVPRODUCT_FROM_FAVORITES = 'DELETE_FAVPRODUCT_FROM_FAVORITES';
export const ADD_NEW_VIEW_FAVPRODUCT = 'ADD_NEW_VIEW_FAVPRODUCT';

//action creator
const fillVoid = (data: Array<Product>): AppActions => ({type : FILL_FAVORITES,payload : data});
const deleting = (id: string): AppActions => ({type : DELETE_FAVPRODUCT_FROM_FAVORITES,payload : id});
const newView = (id: string): AppActions => ({type: ADD_NEW_VIEW_FAVPRODUCT,payload: id});

//thunk creator 
export const myFavorites = () => async (dispatch: Dispatch<AppActions>) => {
    dispatch(toggleLoader(true,TOGGLE_LOADER_FAVORITES));
    const likedProducts: Array<Product> = await productsAPI.myLikes();
    dispatch(toggleLoader(false,TOGGLE_LOADER_FAVORITES));
    dispatch(fillVoid(likedProducts));
}

export const addView = (id: string, view: number) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.newView(id, view);
    dispatch(newView(id));
}

export const deleteFavProduct = (id: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(toggleLoader(true,TOGGLE_LOADER_FAVORITES));
    await productsAPI.deleteLike(id);
    dispatch(deleting(id));
    dispatch(toggleLoader(false,TOGGLE_LOADER_FAVORITES));
}