import {NEW_MESSAGE,SET_CURRENT_DIALOG, UPDATE_DIALOGS} from '../actions/communication';
import {FIX_DATA_USER} from '../actions/user';

const initialState = {
    dialogs : [],
    currentDialog : null
}

export default (state = initialState,action) => {
    switch (action.type) {
        case FIX_DATA_USER :
            if (action.payload.dialogs) {
                return {
                    ...state,
                    dialogs : [...action.payload.dialogs]
                }
            }
        case UPDATE_DIALOGS:
            return {
                ...state,
                dialogs : action.payload
            }
        case SET_CURRENT_DIALOG :
            return {
                ...state,
                currentDialog : action.payload
            }
        case NEW_MESSAGE : 
           let array = [...state.currentDialog.messages];
           array.push(action.payload);
           
            return {
                ...state,
                currentDialog : {
                    ...state.currentDialog,
                    messages : array
                }
            }
        default:
            return state
    }
}