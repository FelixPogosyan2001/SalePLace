import {
    FIX_FOUND_PRODUCTS,
    ADD_NEW_PRODUCT,
    LIKE_PRODUCT,
    FIX_LIKES, 
    DELETE_LIKE,
    ADD_VIEW,
    TOGGLE_LOADER_PRODUCTS
} from '../actions/products';

const initialState = {
    data : [],
    totalCount : null,
    currentPage : 1,
    pageSize : null,
    loader : false
}

export default (state = initialState,action) => {
    switch(action.type){
        case FIX_FOUND_PRODUCTS :
            if (action.payload instanceof Array) {
                return {
                    ...state,
                    data : action.payload
                };
            } else {
                return {
                    ...state,
                    data : action.payload.data,
                    totalCount : action.payload.totalCount,
                    currentPage : action.payload.page,
                    pageSize : action.payload.pageSize
                };
            }
        case ADD_NEW_PRODUCT :
            const updatedProducts = [...state.data];
            updatedProducts.push(action.payload);

            return {
                ...state,
                data : updatedProducts
            };
        case LIKE_PRODUCT : 
            const rerenderProducts = state.data.map(item => {
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
                data : rerenderProducts
            };
        case DELETE_LIKE : 
            const index = state.data.findIndex(item => item._id == action.payload);
            const array = [...state.data];
            array[index].liked = false;
            array[index].likes -= 1;

            return {
                ...state,
                data : array
            };
        case FIX_LIKES : 
            const likes = action.payload.map(product => product._id);
            
            if (state.data.some(element => element['liked'] == true)) {
                return state;
            }

            const productsWithFixLikes = state.data.map(item => {
                if (likes.indexOf(item._id) != -1) {
                    item['liked'] = true;
                    return item;
                } else {
                    return item;
                }
            });

            return {
                ...state,
                data : productsWithFixLikes
            };
        case ADD_VIEW :
            const i= state.data.findIndex(product => product._id == action.payload);
            const productsWithNewViews = [...state.data];
            productsWithNewViews[i].views += 1;

            return {
                ...state,
                data : productsWithNewViews
            };
        case TOGGLE_LOADER_PRODUCTS : 
            return {
                ...state,
                loader : action.payload
            }
        default :
            return state;
    }
}