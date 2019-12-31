import {FIX_DATA_USER} from '../actions/user';
import {CHANGE_STATUS_CONNECTION} from '../actions/communication';
import {ADD_PRODUCTS,ADD_NEW_PRODUCT,LIKE_PRODUCT,FIX_LIKES, DELETE_LIKE,ADD_VIEW} from '../actions/products';

let initialState = {
    _id : '',
    email : '',
    password : '',
    name : '',
    lastname : '',
    avatar : '',
    gender : '',
    createdProducts : [],
    connection : false
}

export default (state = initialState,action) => {
    switch(action.type) {
        case FIX_DATA_USER :
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_STATUS_CONNECTION :
            return {
                ...state,
                connection : action.payload
            }
        case ADD_PRODUCTS : 
            return {
                ...state,
                createdProducts : action.payload
            }
        case ADD_NEW_PRODUCT :
            const updatedProducts = [...state.createdProducts];
            updatedProducts.push(action.payload);

            return {
                ...state,
                createdProducts : updatedProducts
            }
        case LIKE_PRODUCT : 
            const rerenderProducts = state.createdProducts.map(item => {
                if (item._id == action.payload) {
                    item.likes += 1;
                    item.liked = true;
                    return item;
                } else {
                    return item;
                }
            });

            return {
                ...state,
                createdProducts : rerenderProducts
            }
        case DELETE_LIKE : 
            if (!state.createdProducts) return state;
            const index = state.createdProducts.findIndex(item => item._id == action.payload);
            const array = [...state.createdProducts];
            array[index].liked = false;
            array[index].likes -= 1;

            return {
                ...state,
                createdProducts : array
            }
        case FIX_LIKES : 
            const likes = action.payload.map(product => product._id);
            const createdProductsWithFixLikes = state.createdProducts.map(item => {
                if (likes.indexOf(item._id) != -1) {
                    item['liked'] = true;
                    return item;
                } else {
                    return item;
                }
            });

            return {
                ...state,
                createdProducts : createdProductsWithFixLikes
            }
        case ADD_VIEW :
            const i= state.createdProducts.findIndex(product => product._id == action.payload);
            const createdProductsWithNewViews = [...state.createdProducts];
            createdProductsWithNewViews[i].views += 1;

            return {
                ...state,
                createdProducts : createdProductsWithNewViews
            }
        default :
            return state;
    }
}