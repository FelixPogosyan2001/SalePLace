import {GET_RECOMMENDATIONS} from '../actions/products';

export default (state = [],action) => {
    switch (action.type) {
        case GET_RECOMMENDATIONS:
            return action.payload;
        default:
            return state
    }
}