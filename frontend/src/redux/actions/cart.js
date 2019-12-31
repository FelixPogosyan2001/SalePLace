export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';

//action creator 
export const addInCart = (product) => ({type : ADD_PRODUCT_TO_CART,payload : product});
export const deleteFromCart = (id) => ({type : DELETE_PRODUCT_FROM_CART,payload : id})