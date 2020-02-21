import {TOGGLE_LOADER_SIGN_IN, SIGN_IN, LOGOUT} from '../actions/user';
import {Action} from '../../additional/interfaces';

type AuthState = typeof initialState
export type Actions = (
    | Action<typeof TOGGLE_LOADER_SIGN_IN, boolean>
    | Action<typeof SIGN_IN, string>
    | Action<typeof LOGOUT, null>
)

const initialState = {
    token : localStorage.getItem('token'),
    loader : false
};


export default (state = initialState, action: Actions): AuthState => {
    switch(action.type){
        case SIGN_IN:
            return {
                ...state,
                token : action.payload
            }
        case TOGGLE_LOADER_SIGN_IN :
            return {
                ...state,
                loader : action.payload
            }
        case LOGOUT : 
            localStorage.removeItem('token');

            return {
                ...state,
                token : null
            }
        default :
            return state;
    }
}