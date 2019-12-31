import {GET_PRODUCTS_CATEGORY,FIX_FOUND_PRODUCTS,LIKE_PRODUCT_FROM_CATALOG,FIX_LIKES_FOR_CATALOG, DELETE_LIKE_FROM_CATALOG,ADD_VIEW_FOR_CATALOG} from '../actions/products';

export default (state = [],action) => {
    switch(action.type){
        case GET_PRODUCTS_CATEGORY:
            return [ ...action.payload ];
        case FIX_FOUND_PRODUCTS :
            return [...action.payload]
        case LIKE_PRODUCT_FROM_CATALOG :
            const rerenderProducts = state.map(item => {
                if (item._id == action.payload) {
                    item.likes += 1;
                    item.liked = true;
                    return item;
                } else {
                    return item;
                }
            });

            return rerenderProducts
        case DELETE_LIKE_FROM_CATALOG : 
            const index = state.findIndex(item => item._id == action.payload);
            const array = [...state];
            array[index].liked = false;
            array[index].likes -= 1;

            return array;
        case FIX_LIKES_FOR_CATALOG : 
            const likes = action.payload.map(product => product._id);
            const createdProductsWithFixLikes = state.map(item => {
                if (likes.indexOf(item._id) != -1) {
                    item['liked'] = true;
                    return item;
                } else {
                    return item;
                }
            });

            return createdProductsWithFixLikes;
        case ADD_VIEW_FOR_CATALOG :
            const i= state.findIndex(product => product._id == action.payload);
            const createdProductsWithNewViews = [...state];
            createdProductsWithNewViews[i].views += 1;

            return createdProductsWithNewViews;
        default :
            return state;
    }
}