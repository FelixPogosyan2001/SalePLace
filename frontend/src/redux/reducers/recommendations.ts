import {Action, Product} from '../../additional/interfaces';
import {
    GET_RECOMMENDATIONS, 
    FIX_LIKES, 
    LIKE_PRODUCT_RECOMMENDATION, 
    DELETE_LIKE_RECOMMENDATION, 
    ADD_VIEW_IN_RECOMMENDATION
} from '../actions/products';

export type Actions = (
    | Action<typeof GET_RECOMMENDATIONS, Array<Product>>
    | Action<typeof FIX_LIKES, Array<Product>>
    | Action<typeof LIKE_PRODUCT_RECOMMENDATION, string>
    | Action<typeof DELETE_LIKE_RECOMMENDATION, string>
    | Action<typeof ADD_VIEW_IN_RECOMMENDATION, string>
)

export default (state: Array<Product> = [], action: Actions): Array<Product> => {
    switch (action.type) {
        case GET_RECOMMENDATIONS:
            return action.payload;
        case FIX_LIKES:
            const likes = action.payload.map(likedProduct => likedProduct._id);

            return state.map(item => {
                if (likes.indexOf(item._id) != -1) {
                    item['liked'] = true;
                    return item;
                } else {
                    item['liked'] = false;
                    return item;
                }
            });
        case LIKE_PRODUCT_RECOMMENDATION : 
            return state.map(item => {
                if (item._id == action.payload) {
                    item.likes += 1;
                    item.liked = true;
                    return item;
                } else {
                    return item;
                }
            });
        case DELETE_LIKE_RECOMMENDATION:
            return state.map(item => {
                if (item._id == action.payload) {
                    item.likes -= 1;
                    item.liked = false;
                    return item;
                } else {
                    return item;
                }
            });
        case ADD_VIEW_IN_RECOMMENDATION:
            return state.map(item => {
                if (item._id == action.payload) {
                    item.views += 1;
                    return item;
                } else {
                    return item;
                }
            });
        default:
            return state
    }
}