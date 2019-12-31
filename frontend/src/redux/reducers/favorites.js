import {FILL_FAVORITES,TOGGLE_LOADER_FAVORITES,DELETE_FAVPRODUCT_FROM_FAVORITES} from '../actions/favorites';

const inititalState = {
    favProducts : [],
    loader : false
};

export default (state = inititalState,action) => {
    switch (action.type) {
        case FILL_FAVORITES:
            return {
                ...state,
                favProducts : action.payload
            }
        case TOGGLE_LOADER_FAVORITES :
            return {
                ...state,
                loader : action.payload
            }
        case DELETE_FAVPRODUCT_FROM_FAVORITES :
            let index = state.favProducts.findIndex(favProduct => favProduct._id == action.payload);
            const updatedFavProducts = [...state.favProducts];
            updatedFavProducts.splice(index,1);

            return {
                ...state,
                favProducts : updatedFavProducts
            }
        default:
            return state;
    }
}