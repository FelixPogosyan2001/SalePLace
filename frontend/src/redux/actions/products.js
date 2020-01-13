import productsAPI from '../../api/products';
import {toggleLoader} from './commonActions';

export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const ADD_VIEW = 'ADD_VIEW';
export const LIKE_PRODUCT = 'LIKE_PRODUCT';
export const DELETE_LIKE = 'DELETE_LIKE';
export const FIX_LIKES = 'FIX_LIKES';
export const FIX_FOUND_PRODUCTS = 'FIX_FOUND_PRODUCTS';
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';
export const TOGGLE_LOADER_PRODUCTS = 'TOGGLE_LOADER_PRODUCTS';

//Action Creators 
const newProduct = (product) => ({type : ADD_NEW_PRODUCT,payload : product});
const like = (productId) => ({type : LIKE_PRODUCT,payload : productId});
const withoutLike = (productId) => ({type : DELETE_LIKE,payload : productId});
const setLikes = (likes) => ({type : FIX_LIKES,payload : likes})
const incrementView = (views) => ({type : ADD_VIEW,payload : views});
const setFoundProducts = (products) => ({type : FIX_FOUND_PRODUCTS,payload : products}) 
const implementRecommendations = (rec) => ({type : GET_RECOMMENDATIONS,payload : rec});

// Thunk Creators 
export const myProducts = () => async (dispatch) => {
    let products = await productsAPI.myProducts();
    dispatch(setFoundProducts(products));
}

export const addProduct = (info) => async (dispatch) => {
    let product = await productsAPI.addProduct(info)
    dispatch(newProduct(product));
}

export const likeProduct = (id) => async (dispatch) => {
    await productsAPI.likeProduct(id);
    dispatch(like(id));
}

export const deleteLike = (id) => async (dispatch) => {
    await productsAPI.deleteLike(id);
    dispatch(withoutLike(id));
}

export const myLikes = () => async (dispatch) => {
    const likes = await productsAPI.myLikes();
    dispatch(setLikes(likes));
}

export const addView = (id,view) => async (dispatch) => {
    await productsAPI.newView(id,view);
    dispatch(incrementView(id))
}

export const productsCatalog = (name,page,pageSize) => async (dispatch) => {
    dispatch(toggleLoader(true,TOGGLE_LOADER_PRODUCTS));
    const catalogItems = await productsAPI.getProductsCatalog(name,page,pageSize);
    dispatch(setFoundProducts(catalogItems));
    dispatch(toggleLoader(true,TOGGLE_LOADER_PRODUCTS));
}

export const search = (word) => async (dispatch) => {
    const resultSearch = await productsAPI.searchProduct(word);
    dispatch(setFoundProducts(resultSearch));
}

export const getProducts = (page,pageSize) => async (dispatch) => {
    if (page < 1) return false;
    dispatch(toggleLoader(true,TOGGLE_LOADER_PRODUCTS));
    dispatch(setFoundProducts(await productsAPI.getProducts(page,pageSize)));
    dispatch(toggleLoader(false,TOGGLE_LOADER_PRODUCTS));
}

export const recommendations = () => async (dispatch) => {
    const recommendatedProducts = await productsAPI.recommendations();
    dispatch(implementRecommendations(recommendatedProducts));
}