import {FIX_DATA_USER} from '../actions/user';
import {Action, Message, Dialog} from '../../additional/interfaces';
import {
    NEW_MESSAGE,
    SET_CURRENT_DIALOG, 
    UPDATE_DIALOGS
} from '../actions/communication';

type DialogsState = typeof initialState;
export type Actions = (
    | Action<typeof NEW_MESSAGE, Message> 
    | Action<typeof SET_CURRENT_DIALOG, Dialog> 
    | Action<typeof UPDATE_DIALOGS, Array<Dialog>> 
    | Action<typeof FIX_DATA_USER, { dialogs: Array<Dialog> }>
)

const initialState = {
    dialogs : [] as Array<Dialog>,
    currentDialog : null as (Dialog | null)
}

export default (state = initialState, action: Actions): DialogsState => {
    switch (action.type) {
        case FIX_DATA_USER :
            if (action.payload.dialogs) {
                return {
                    ...state,
                    dialogs : [...action.payload.dialogs]
                }
            } // remember about else
            
            break;
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