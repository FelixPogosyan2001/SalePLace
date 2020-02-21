import {Product, Action} from '../../additional/interfaces';
import {ADD_PRODUCT_TO_CART, DELETE_PRODUCT_FROM_CART} from '../actions/cart';

type CartState = Array<Partial<Product>>
export type Actions = (
    | Action<typeof ADD_PRODUCT_TO_CART, Partial<Product>>
    | Action<typeof DELETE_PRODUCT_FROM_CART, string>
)

const initialState: CartState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export default (state = initialState, action: Actions): CartState => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART :
            const updatedCart = [...state];

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