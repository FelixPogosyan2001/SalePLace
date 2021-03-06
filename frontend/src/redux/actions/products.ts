import productsAPI from '../../api/products';
import {toggleLoader,TLike,like, TDel, withoutLike, TView, incrementView} from './commonActions';
import {Product, Like, Pag} from '../../additional/interfaces';
import {AppActions} from '../../additional/actions';
import {Dispatch} from 'redux';

export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const ADD_VIEW = 'ADD_VIEW';
export const LIKE_PRODUCT = 'LIKE_PRODUCT';
export const DELETE_LIKE = 'DELETE_LIKE';
export const ADD_VIEW_IN_RECOMMENDATION = 'ADD_VIEW_IN_RECOMMENDATION';
export const LIKE_PRODUCT_RECOMMENDATION = 'LIKE_PRODUCT_RECOMMENDATION';
export const DELETE_LIKE_RECOMMENDATION = 'DELETE_LIKE_RECOMMENDATION';
export const FIX_LIKES = 'FIX_LIKES';
export const FIX_FOUND_PRODUCTS = 'FIX_FOUND_PRODUCTS';
export const GET_RECOMMENDATIONS = 'GET_RECOMMENDATIONS';
export const TOGGLE_LOADER_PRODUCTS = 'TOGGLE_LOADER_PRODUCTS';

//Action Creators 
const newProduct = (product: Product): AppActions => ({type : ADD_NEW_PRODUCT,payload : product});
//const like = (productId: string): AppActions => ({type : LIKE_PRODUCT,payload : productId});
//const withoutLike = (productId: string): AppActions => ({type : DELETE_LIKE,payload : productId});
const setLikes = (likes: Array<Product>): AppActions => ({type : FIX_LIKES,payload : likes})
//const incrementView = (views: string): AppActions => ({type : ADD_VIEW,payload : views});
const setFoundProducts = (products: Array<Product> | Pag): AppActions => ({type : FIX_FOUND_PRODUCTS,payload : products}) 
const implementRecommendations = (rec: Array<Product>): AppActions => ({type : GET_RECOMMENDATIONS,payload : rec});

// Thunk Creators 
export const myProducts = () => async (dispatch: Dispatch<AppActions>) => {
    let products: Array<Product> = await productsAPI.myProducts();
    dispatch(setFoundProducts(products));
}

export const addProduct = (info: Partial<Product>) => async (dispatch: Dispatch<AppActions>) => {
    let product: Product = await productsAPI.addProduct(info)
    dispatch(newProduct(product));
}

export const likeProduct = (id: string) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.likeProduct(id);
    dispatch(like(id));
}

export const likeProductRec = (id: string) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.likeProduct(id);
    dispatch(like(id, LIKE_PRODUCT_RECOMMENDATION));
}

export const deleteLikeFromRec = (id: string) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.deleteLike(id);
    dispatch(withoutLike(id, DELETE_LIKE_RECOMMENDATION));
}

export const addViewInRec = (id: string, view: number) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.newView(id,view);
    dispatch(incrementView(id, ADD_VIEW_IN_RECOMMENDATION))
}

export const deleteLike = (id: string) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.deleteLike(id);
    dispatch(withoutLike(id));
}

export const myLikes = () => async (dispatch: Dispatch<AppActions>) => {
    const likes: Array<Product> = await productsAPI.myLikes();
    dispatch(setLikes(likes));
}

export const addView = (id: string, view: number) => async (dispatch: Dispatch<AppActions>) => {
    await productsAPI.newView(id,view);
    dispatch(incrementView(id))
}

export const productsCatalog = (name: string, page: number, pageSize: number) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(toggleLoader(true,TOGGLE_LOADER_PRODUCTS));
    dispatch(setFoundProducts(await productsAPI.getProductsCatalog(name, page, pageSize) as Pag));
    dispatch(toggleLoader(false, TOGGLE_LOADER_PRODUCTS));
}

export const search = (word: string) => async (dispatch: Dispatch<AppActions>) => {
    const resultSearch: Array<Product | null> = await productsAPI.searchProduct(word);
    dispatch(setFoundProducts(resultSearch));
}

export const getProducts = (page: number, pageSize: number | undefined) => async (dispatch: Dispatch<AppActions>) => {
    if (page < 1) {
        return false;
    }

    dispatch(toggleLoader(true,TOGGLE_LOADER_PRODUCTS));
    dispatch(setFoundProducts(await productsAPI.getProducts(page,pageSize)));
    dispatch(toggleLoader(false,TOGGLE_LOADER_PRODUCTS));
}

export const recommendations = () => async (dispatch: Dispatch<AppActions>) => {
    const recommendatedProducts: Array<Product> = await productsAPI.recommendations();
    dispatch(implementRecommendations(recommendatedProducts));
}