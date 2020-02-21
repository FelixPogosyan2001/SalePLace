import {GET_RECOMMENDATIONS} from '../actions/products';
import {Action, Product} from '../../additional/interfaces';

export type Actions = (
    Action<typeof GET_RECOMMENDATIONS, Array<Product>>
)

export default (state: Array<Product> = [], action: Actions) => {
    switch (action.type) {
        case GET_RECOMMENDATIONS:
            return action.payload;
        default:
            return state
    }
}