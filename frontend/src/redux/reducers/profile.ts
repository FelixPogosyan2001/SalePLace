import {FIX_DATA_USER} from '../actions/user';
import {CHANGE_STATUS_CONNECTION} from '../actions/communication';
import {Action} from '../../additional/interfaces';

type ProfileState = typeof initialState
export type Actions = (
  | Action<typeof FIX_DATA_USER, typeof initialState> 
  | Action<typeof CHANGE_STATUS_CONNECTION, boolean>
)

let initialState = {
    _id : '',
    email : '',
    password : '',
    name : '',
    lastname : '',
    avatar : '',
    gender : '',
    connection: null as (boolean | string)
}

export default (state = initialState, action: Actions): ProfileState => {
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