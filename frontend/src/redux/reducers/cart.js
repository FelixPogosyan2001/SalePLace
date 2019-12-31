import {ADD_PRODUCT_TO_CART,DELETE_PRODUCT_FROM_CART} from '../actions/cart';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export default (state = initialState,action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART :
            const updatedCart = [...state];
            console.log('fe')
            updatedCart.push(action.payload);
            localStorage.setItem('cart',JSON.stringify(updatedCart));
            return updatedCart;
        case DELETE_PRODUCT_FROM_CART :
            const clearCart = [...state];
            let i = clearCart.findIndex(item => item._id == action.payload);
            clearCart.splice(i,1);
            localStorage.setItem('cart',JSON.stringify(clearCart));
            return clearCart;
        default:
            return state;
    }
}