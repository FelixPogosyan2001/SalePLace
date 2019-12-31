import {TOGGLE_LOADER_SIGN_IN ,SIGN_IN,LOGOUT} from '../actions/user';

const initialState = {
    token : localStorage.getItem('token'),
    loader : false
};


export default (state = initialState,action) => {
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