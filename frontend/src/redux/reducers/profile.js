import {FIX_DATA_USER} from '../actions/user';
import {CHANGE_STATUS_CONNECTION} from '../actions/communication';

let initialState = {
    _id : '',
    email : '',
    password : '',
    name : '',
    lastname : '',
    avatar : '',
    gender : ''
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
        default :
            return state;
    }
}