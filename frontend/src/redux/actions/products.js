import productsAPI from '../../api/products';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT';
export const ADD_VIEW = 'ADD_VIEW';
export const LIKE_PRODUCT = 'LIKE_PRODUCT';
export const DELETE_LIKE = 'DELETE_LIKE';
export const FIX_LIKES = 'FIX_LIKES';
export const GET_PRODUCTS_CATEGORY = 'GET_PRODUCTS_CATEGORY';
export const FIX_FOUND_PRODUCTS = 'FIX_FOUND_PRODUCTS';
export const LIKE_PRODUCT_FROM_CATALOG = 'LIKE_PRODUCT_FROM_CATALOG';
export const DELETE_LIKE_FROM_CATALOG = 'DELETE_LIKE_FROM_CATALOG';
export const FIX_LIKES_FOR_CATALOG = 'FIX_LIKES_FOR_CATALOG';
export const ADD_VIEW_FOR_CATALOG = 'ADD_VIEW_FOR_CATALOG';


//Action Creators 
const addProducts = (products) => ({type : ADD_PRODUCTS, payload : products});
const newProduct = (product) => ({type : ADD_NEW_PRODUCT,payload : product});
const like = (productId) => ({type : LIKE_PRODUCT,payload : productId});
const withoutLike = (productId) => ({type : DELETE_LIKE,payload : productId});
const setLikes = (likes) => ({type : FIX_LIKES,payload : likes})
const incrementView = (views) => ({type : ADD_VIEW,payload : views});
const getProductsCategory = (products) => ({type : GET_PRODUCTS_CATEGORY,payload : products});
const setFoundProducts = (products) => ({type : FIX_FOUND_PRODUCTS,payload : products}) 

// Thunk Creators 
export const myProducts = () => async (dispatch) => {
    let products = await productsAPI.myProducts();
    dispatch(addProducts(products));
}

export const addProduct = (info) => async (dispatch) => {
    let product = await productsAPI.addProduct(info)
    dispatch(newProduct(product));
}

export const likeProduct = (id) => async (dispatch) => {
    await productsAPI.likeProduct(id);
    dispatch(like(id));
}

export const likeProductCatalog = (id) => async (dispatch) => {
    await productsAPI.likeProduct(id);
    dispatch({type : LIKE_PRODUCT_FROM_CATALOG,payload : id});
}

export const deleteLikeCatalog = (id) => async (dispatch) => {
    await productsAPI.deleteLike(id);
    dispatch({type : DELETE_LIKE_FROM_CATALOG,payload : id});
}

export const addViewCatalog = (id,view) => async (dispatch) => {
    await productsAPI.newView(id,view);
    dispatch({type : ADD_VIEW_FOR_CATALOG,payload : id})
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

export const productsCatalog = (name) => async (dispatch) => {
    const catalogItems = await productsAPI.getProductsCatalog(name);
    dispatch(getProductsCategory(catalogItems));
}

export const search = (word) => async (dispatch) => {
    const resultSearch = await productsAPI.searchProduct(word);
    dispatch(setFoundProducts(resultSearch));
}

export const getProducts = () => async (dispatch) => {
    dispatch(setFoundProducts(await productsAPI.getProducts()))
}