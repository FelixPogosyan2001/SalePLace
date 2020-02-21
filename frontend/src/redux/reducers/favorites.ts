import {Product, Action} from '../../additional/interfaces';
import {
    FILL_FAVORITES,
    TOGGLE_LOADER_FAVORITES,
    DELETE_FAVPRODUCT_FROM_FAVORITES,
    ADD_NEW_VIEW_FAVPRODUCT
} from '../actions/favorites';

type FavState = typeof inititalState
export type Actions = (
    | Action<typeof FILL_FAVORITES, Array<Product>> 
    | Action<typeof TOGGLE_LOADER_FAVORITES, boolean> 
    | Action<typeof DELETE_FAVPRODUCT_FROM_FAVORITES, string>
    | Action<typeof ADD_NEW_VIEW_FAVPRODUCT, string>
)

const inititalState = {
    favProducts : [] as Array<Product>,
    loader : false
};

export default (state = inititalState, action: Actions): FavState => {
    switch (action.type) {
        case FILL_FAVORITES:
            return {
                ...state,
                favProducts : action.payload
            }
        case TOGGLE_LOADER_FAVORITES:
            return {
                ...state,
                loader : action.payload
            }
        case DELETE_FAVPRODUCT_FROM_FAVORITES:
            let index = state.favProducts.findIndex(favProduct => favProduct._id == action.payload);
            const updatedFavProducts = [...state.favProducts];

            updatedFavProducts.splice(index,1);

            return {
                ...state,
                favProducts : updatedFavProducts
            }
        case ADD_NEW_VIEW_FAVPRODUCT: 
            const someChanges = state.favProducts.map((el) => {
                if (el._id == action.payload) {
                    ++el.views;
                    return el;
                } else return el;
            });
            
            return {
                ...state,
                favProducts: someChanges
            }
        default:
            return state;
    }
}